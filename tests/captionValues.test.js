import test from 'node:test';
import assert from 'node:assert/strict';
import { captionValues, captionValue, createCaptionCopy } from '../src/localization/captionValues.js';
import { captions } from '../src/localization/captions.js';

test('shared invitation captions have both languages and are available to the main translator', () => {
  for (const [key, values] of Object.entries(captionValues)) {
    for (const language of ['en', 'ka']) {
      assert.equal(typeof values[language], 'string', `${key}: ${language}`);
      assert.equal(captions[language][key], values[language], `${key}: ${language}`);
    }
  }
});

test('caption-key trees preserve arrays, quiz answer indices and selected language', () => {
  const key = Object.keys(captionValues)[0];
  const copy = createCaptionCopy({ title: key, questions: [{ options: [key], answer: 0 }] });
  for (const language of ['en', 'ka']) {
    assert.equal(copy[language].title, captionValues[key][language]);
    assert.deepEqual(copy[language].questions, [{ options: [captionValues[key][language]], answer: 0 }]);
  }
  assert.equal(captionValue('missing.caption'), 'missing.caption');
});

test('application source keeps bilingual display text in localization files', async () => {
  const { readdir, readFile } = await import('node:fs/promises');
  const { parse } = await import('@babel/parser');
  const traverse = (await import('@babel/traverse')).default.default;
  async function inspect(directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const path = `${directory}/${item.name}`;
      if (item.isDirectory()) {
        if (path !== 'src/localization') await inspect(path);
        continue;
      }
      if (!/\.jsx?$/.test(item.name)) continue;
      const source = await readFile(path, 'utf8');
      traverse(parse(source, { sourceType: 'module', plugins: ['jsx'] }), {
        StringLiteral({ node }) {
          // These are words recognized in user-entered names, not rendered copy.
          if (path.endsWith('/EmbossedWaxSeal.jsx')) return;
          assert.equal(/[ა-ჰ]/.test(node.value), false, `${path}: move display text to a caption key`);
        },
        ArrowFunctionExpression({ node }) {
          assert.equal(node.params[0]?.name === 'en' && ['ka', 'ge'].includes(node.params[1]?.name), false,
            `${path}: use caption keys instead of a bilingual text helper`);
        },
      });
    }
  }
  await inspect('src');
});

export const weddingPartyRoles = [
  { id: 'bridesmaid', en: 'Bridesmaid', ka: 'პატარძლის მეჯვარე' },
  { id: 'maidOfHonour', en: 'Maid of honour', ka: 'პატარძლის მთავარი მეჯვარე' },
  { id: 'manOfHonour', en: 'Man of honour', ka: 'პატარძლის მეჯვარე (კაცი)' },
  { id: 'bestMan', en: 'Best man', ka: 'სიძის მთავარი მეჯვარე' },
  { id: 'groomsman', en: 'Groomsman', ka: 'სიძის მეჯვარე' },
];
export function normalizeWeddingParty(value) {
  return (Array.isArray(value) ? value : []).slice(0,20).filter(p => p && typeof p === 'object').map((p,index) => ({
    id: typeof p.id === 'string' ? p.id : `party-${index}`,
    role: weddingPartyRoles.some(r => r.id === p.role) ? p.role : 'bridesmaid',
    name: typeof p.name === 'string' ? p.name.slice(0,120) : '',
  }));
}
export function weddingPartyRoleLabel(role, language) {
  const match = weddingPartyRoles.find(item => item.id === role) ?? weddingPartyRoles[0];
  return match[language] ?? match.en;
}

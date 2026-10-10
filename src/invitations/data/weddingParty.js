import { createCaptionCopy } from "../../localization/captionValues.js";
export const weddingPartyRoles = [
  { id: 'bridesmaid', ...createCaptionCopy("invitations.data.weddingParty.extraCopy1") },
  { id: 'maidOfHonour', ...createCaptionCopy("invitations.data.weddingParty.extraCopy2") },
  { id: 'manOfHonour', ...createCaptionCopy("invitations.data.weddingParty.extraCopy3") },
  { id: 'bestMan', ...createCaptionCopy("invitations.data.weddingParty.extraCopy4") },
  { id: 'groomsman', ...createCaptionCopy("invitations.data.weddingParty.extraCopy5") },
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

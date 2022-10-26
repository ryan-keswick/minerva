export const tokenisePrompt = (prompt: string) => {
  return prompt.trim().replace(/\s/g, '-');
};

export const detokenisePrompt = (prompt: string) => {
  return prompt.replace(/-/g, ' ');
};

export const createKey = (prompt: string, userId?: string) => {
  return userId ? `v2/${userId}/${prompt}.png` : `v2/${prompt}.png`;
};

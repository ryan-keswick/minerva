export const tokenisePrompt = (prompt: string) => {
  return prompt.trim().replace(/\s/g, '-');
};

export const detokenisePrompt = (prompt: string) => {
  return prompt.replace('-', ' ');
};

export const generateAvatar = (seed?: string) => {
  if (seed) return seed;
  return Math.floor(Math.random() * 100 + 1).toString();
};

export const getAvatarUrl = (seed: string) => {
  // Background color is applied via CSS to avoid API rate limiting
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`;
};

export const AVATAR_OPTIONS = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

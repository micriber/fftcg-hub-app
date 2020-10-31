type lang = 'fr' | 'eg' | 'de';

export const getCardImageUrl = (
  code: string,
  type = 'full',
  lang: lang = 'fr',
) => {
  const cleanCode = code.split('/')[0];
  return `https://fftcg.cdn.sewest.net/images/cards/${type}/${cleanCode}_${lang}.jpg`;
};

type lang = 'fr' | 'eg' | 'de';

export const getCardImageUrl = (
  code: string,
  type = 'full',
  lang: lang = 'fr',
) => `https://fftcg.cdn.sewest.net/images/cards/${type}/${code}_${lang}.jpg`;

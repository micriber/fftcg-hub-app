import {getCardImageUrl} from '../image';

describe('[Utils] GetCardImageUrl', () => {
  it('should return a valid image url', () => {
    const code = '1-049C';
    const url = getCardImageUrl(code);
    expect(url).toBe(
      `https://fftcg.cdn.sewest.net/images/cards/full/${code}_fr.jpg`,
    );
  });

  it('should return a valid image url with size', () => {
    const code = '1-049C';
    const url1 = getCardImageUrl(code, 'full');
    const url2 = getCardImageUrl(code, 'thumb');
    expect(url1).toBe(
      `https://fftcg.cdn.sewest.net/images/cards/full/${code}_fr.jpg`,
    );
    expect(url2).toBe(
      `https://fftcg.cdn.sewest.net/images/cards/thumb/${code}_fr.jpg`,
    );
  });

  it('should return a valid image url with size and lang', () => {
    const code = '1-049C';
    const url1 = getCardImageUrl(code, 'full', 'eg');
    const url2 = getCardImageUrl(code, 'thumb', 'de');
    expect(url1).toBe(
      `https://fftcg.cdn.sewest.net/images/cards/full/${code}_eg.jpg`,
    );
    expect(url2).toBe(
      `https://fftcg.cdn.sewest.net/images/cards/thumb/${code}_de.jpg`,
    );
  });
});

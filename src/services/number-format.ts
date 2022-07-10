import BigNumber from 'bignumber.js';

class NumberFormatService {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    BigNumber.config({
      FORMAT: {
        decimalSeparator: '.',
        groupSeparator: "'",
        groupSize: 3,
      },
    });
  }

  public formatNumber = (num: number | string, decimalPlaces = 0): string => {
    if (!num) return new BigNumber(0).toFormat(decimalPlaces);

    return new BigNumber(num).toFormat(decimalPlaces);
  };
}

export const numberFormatService = new NumberFormatService();

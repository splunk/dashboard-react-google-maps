import { convertHexToRgb } from './convertHexToRgb';

const validInput = [
  '000000',
  'ffFFff',
  'ff0000',
  '#00ff00',
  '0000ff',
  'fc41ef'
];

const validOutput = [
  [0, 0, 0],
  [255, 255, 255],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [252, 65, 239]
];

const invalidInput = [
  '0000003',
  'ffff',
  'zz0000',
  'qq0oid'
];

describe('convertHexToRgb', () => {
  it('should return correct rgb for hex', () => {
    validInput.map((input, key) => {
      expect(convertHexToRgb(input)).toStrictEqual(validOutput[key]);
    });
  });

  it('should throw an error when input is not valid', () => {
    invalidInput.map(input => {
      try {
        convertHexToRgb(input);
      } catch (e) {
        expect(e.message).toBe('Input not valid Hex');
      }
    });
  });
});

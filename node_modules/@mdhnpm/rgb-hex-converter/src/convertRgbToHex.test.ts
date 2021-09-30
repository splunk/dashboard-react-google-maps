import { convertRgbToHex } from './convertRgbToHex';

const validInput = [
  [0, 0, 0],
  [255, 255, 255],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [252, 65, 239]
];

const validOutput = [
  '000000',
  'ffffff',
  'ff0000',
  '00ff00',
  '0000ff',
  'fc41ef'
];

const invalidInput = [
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
  [270, 0, 0],
  [0, 270, 0],
  [0, 0, 270]
];

describe('convertRgbTohex', () => {
  it('should return correct hex for Rgb', () => {
    validInput.map((input, key) => {
      expect(convertRgbToHex(input[0], input[1], input[2])).toBe(validOutput[key]);
    });
  });
  it('should throw an error when input is not valid', () => {
    invalidInput.map(input => {
      try {
        convertRgbToHex(input[0], input[1], input[2]);
      } catch (e) {
        expect(e.message).toBe('Input is not valid RGB');
      }
    });
  });
});

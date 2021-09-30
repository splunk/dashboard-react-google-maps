
export const convertRgbToHex = (red: number, green: number, blue: number) => {
  if (isValidRgb(red, green, blue)) {
    return returnHex(red) + returnHex(green) + returnHex(blue);
  } else {
    throw new Error('Input is not valid RGB');
  }
};

const isValidRgb = (red: number, green: number, blue: number): boolean => {
  if (!isValidNumber(red) || !isValidNumber(green) || !isValidNumber(blue)) {
    return false;
  }
  return true;
};

const isValidNumber = (value: number) => {
  if (value > 255 || value < 0) {
    return false;
  }
  return true;
};

const returnHex = (value: number) => {
  if (value < 10) {
    return '0' + value.toString(16);
  } else {
    return value.toString(16);
  }
};

# rgb-hex-converter

Node module to convert RGV to Hexadecimal and vice versa.

Hexadecimal is a base 16 system (meaning each place value in the number is some power of 16). We use Hex codes to simplify binary representation. A Hex code can be any of these 16 digits: `0 1 2 3 4 5 6 7 8 9 A B C D E F`. To represent color, we use the format `#RRGGBB`. Each 2 digits will correspond to RGB color values.

The RGB model uses a value between `0` and `255` for each color for red, green and blue. Each RGB color value there is an equivalent Hex value.

For example, the color black is represented as `(255, 255, 255)` with RGB and `#FFFFFF` with Hex.

## When do you want to use it?

Whenever you need to convert RGV to Hexadecimal or vice versa.
## Examples

There are two functions: `convertRgbToHex` & `convertHexToRgb`.

```js
import { convertRgbToHex, convertHexToRgb } from '@mdhnpm/rgb-hex-converter';

```

`convertRgbToHex` will take three RGB values as input and returns string of Hex.

```js
convertRgbToHex(0, 255, 0); // returns '00ff00'
```

`convertHexToRgb` takes a string value of Hex (prefixed with or without #) and returns an array of RGB.

```js
convertHexToRgb('#00ff00'); // returns [0, 255, 0]

convertHexToRgb('fc41ef'); // returns [252, 65, 239]
```

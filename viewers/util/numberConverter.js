/* global BigInt */
export const numToHex = nStr => {
  let positive = true;
  let bigNum = BigInt(nStr);

  if (bigNum < 0) {
    positive = false;
    bigNum = twosCompliment(bigNum);
  }

  // Pad an uneven number of bits with 0 for parsability
  let hex = bigNum.toString(16);
  if (hex.length % 2) {
    hex = '0' + hex;
  }

  // Pad an extra byte to avoid ambiguity if positive and first bit is set
  let hiByte = parseInt(hex.slice(0, 2), 16);
  let hiBit = (0x80 & hiByte);
  if (positive && hiBit) {
    hex = '00' + hex;
  }

  return '0x' + hex;
}

// Perform Two's Compliment to get opposite signed hex value
const twosCompliment = bigNum => {
  bigNum = -bigNum;
  let binary = (bigNum).toString(2)
  let prefix = '';
  while (binary.length % 8) {
    binary = '0' + binary;
  }
  if ('1' === binary[0] && -1 !== binary.slice(1).indexOf('1')) {
    prefix = '11111111';
  }
  binary = binary.split('').map(i => ('0' === i ? '1' : '0')).join('');
  return BigInt('0b' + prefix + binary) + BigInt(1);
}
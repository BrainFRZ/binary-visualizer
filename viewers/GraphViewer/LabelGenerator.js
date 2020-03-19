import { AUTO_HEX_DIGITS, INSTR_WIDTH } from 'globals/view';
import { LABEL_COLOR, TEXT_COLOR, NUM_COLOR, CODE_BACKGROUND, GUTTER_BACKGROUND } from 'globals/palette';
import { numToHex } from 'viewers/util/numberConverter';

export const generateHTMLTag = tag => {
  const width = tag.length * 10 + 8;
  const height = 20;
  const backgroundColor = LABEL_COLOR; // match color of labels in CodeViewer
  const style = `font-family:Courier;font-weight:bold;background-color:${backgroundColor};color:#FFFFFF`;
  return ({
    label: (`<div style="${style}">
        ${tag}
      </div>`),
    width, height, backgroundColor,
  });
}

const SIDE_PAD = 10;  // Side padding of labels
export const generateHTMLBlock = block => {
  const blockCode = [], backgroundColor = CODE_BACKGROUND;
  const gutterWidth = getGutterWidth(block);
  let width = 0, lineWidth = 0, code = '', height = 0;
  block.forEach(instr => {
    if (instr.label)
      [code, lineWidth] = generateHTMLLabelLine(instr.label);
    else
      [code, lineWidth] = generateHTMLInstrLine(instr.mnemonic, instr.args);
    code = generateGutterSpan(instr.addr, gutterWidth) + code;
    blockCode.push(code);
    width = Math.max(width, lineWidth);
    console.log(`currwidth: ${width}`);
    height += 18;
  });
  width += 10 + gutterWidth;
  console.log(`width: ${width}`);
  return ({
    label: (`<div style="font-family:Courier;font-weight:bold;background-color:${backgroundColor};color:${TEXT_COLOR}">
        ${blockCode.join('<br />')}
      </div>`),
    width, height, backgroundColor,
  });
}

const generateHTMLLabelLine = label => [`<span style="color:${LABEL_COLOR};margin:0px 0px 0px 5px">${label}:</span>`, label.length*10+SIDE_PAD];
const generateHTMLInstrLine = (mnemonic, args) => {
  let code = `<span style="display:inline-block;width:${INSTR_WIDTH}px;margin:0px 0px 0px 5px">${mnemonic}</span>`;
  let argsStr = args.join(', ');
  let groups = argsStr.match(/\d+|\D+/g); // split arg on digits
  let width = INSTR_WIDTH+SIDE_PAD+5;
  let groupWidth = 0, groupCode = '';
  if (groups) {
    groups.forEach(group => {
      [groupCode, groupWidth] = (/^\d+$/.test(group)) ? generateHTMLNumSpan(group) : [group, group.length*10];
      code += groupCode;
      width += groupWidth;
    });
  }
  return [code, width];
};
const generateHTMLNumSpan = numStr => {
  if (numStr.length > AUTO_HEX_DIGITS)
    numStr = numToHex(numStr);
  return [`<font color="${NUM_COLOR}">${numStr}</font>`, numStr.length*10];
}
const generateGutterSpan = (addr, width) => {
  const backgroundColor = GUTTER_BACKGROUND;
  return `<span style="width:${width}px;background-color:${backgroundColor};color:#000000;font-weight:normal;margin:0px 0px 0px -5px">`+
          `${addr}</span>`;
}

const getGutterWidth = block => {
  const lastAddr = block.slice(-1);  // Addrs are in increasing order, so last one will be the widest
  return lastAddr.length * 10 + 10;
}

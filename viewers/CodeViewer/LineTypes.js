import React from 'react';
import { makeStyles } from '@material-ui/core';
import { LABEL_COLOR, TEXT_COLOR, NUM_COLOR } from 'globals/palette';
import { INSTR_MARGIN, INSTR_WIDTH, AUTO_HEX_DIGITS } from 'globals/view';


const useStyles = makeStyles({
  style: props => ({
    fontFamily: '"Roboto Mono", "Courier New", Courier, monospace',
    fontWeight: 'bold',
    display: 'inline-block',
    color: (props.color || TEXT_COLOR),
    padding: 0,
    margin: 0,
    whitespace: 'pre',
  }),
  instr: props => ({
    fontFamily: '"Roboto Mono", "Courier New", Courier, monospace',
    fontWeight: 'bold',
    display: 'inline-block',
    color: (props.color || TEXT_COLOR),
    padding: 0,
    whitespace: 'pre',
    margin: INSTR_MARGIN,
    minWidth: INSTR_WIDTH,
  })
}); 

// TODO labels will be double-clickable to snap SymTable to this procedure
export function LabelLine(props) {
  const style = useStyles({color: LABEL_COLOR, indent: '0px'}).style;
  return (<div className={style}>{props.label}:</div>);
}

export function InstrLine(props) {
  const { mnemonic, args, addr } = props;
  let spans = [<MnemonicSpan key={`line${addr}-instr`} code={mnemonic} />];
  args.forEach((arg, argID) => {
    spans = parseArg(arg, argID, addr, spans);
    if (argID < args.length-1)
      spans.push(<TextSpan key={`line${addr}sep${argID}`} code=', ' />);
  });
  if (args && args.length != 0) {
    spans.slice(-1); // remove separator
  }
  return (
    <div style={{display:'inline-block'}} key={`line${addr}-root`} id={`line${addr}-root`}>
      {spans}
    </div>
  );
}

const parseArg = (arg, argID, addr, lst=[]) => {
  const groups = arg.match(/\d+|\D+/g); // split arg on digits
  const textStyle = useStyles({color: TEXT_COLOR}).style;
  const numStyle = useStyles({color: NUM_COLOR}).style;
  groups.forEach((group, index) => {
    if (/^\d+$/.test(group))
      lst.push(<NumSpan key={`line${addr}-${argID}-${index}`} style={numStyle} code={group} />);
    else
      lst.push(<TextSpan key={`line${addr}-${argID}-${index}`} style={textStyle} code={group} />);
  });
  return lst;
}

function MnemonicSpan(props) {
  const opts = {color: TEXT_COLOR};
  const style = useStyles(opts).instr;
  return (<span className={style}>{props.code}</span>);
}

function TextSpan(props) {
  const opts = {color: TEXT_COLOR};
  const style = (props.style || useStyles(opts).style);
  return (<span className={style}>{props.code}</span>);
}

// TODO Numbers should be double-clickable to toggle between hex and decimal
function NumSpan(props) {
  const opts = {color: NUM_COLOR};
  const style = (props.style || useStyles(opts).style);
  let nStr = props.code;
  if (nStr.length > AUTO_HEX_DIGITS) {
    nStr = numToHex(nStr);
  }
  return (<span className={style}>{nStr}</span>);
}

const numToHex = nStr => {
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
function twosCompliment(bigNum) {
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
import React from 'react';
import { makeStyles } from '@material-ui/core';

const INSTR_MARGIN = '0px 0px 0px 40px';
const INSTR_WIDTH = '150px';

const labelColor = '#0016b5'        // Dark blue
const textColor = '#00a5e7'         // Dark cyan
const numColor = '#e67800'          // Dark orange
const useStyles = makeStyles({
  style: props => ({
    fontFamily: '"Roboto Mono", "Courier New", Courier, monospace',
    fontWeight: 'bold',
    display: 'block-inline',
    color: (props.color || textColor),
    padding: 0,
    margin: 0,
    whitespace: 'pre',
  }),
  instr: props => ({
    fontFamily: '"Roboto Mono", "Courier New", Courier, monospace',
    fontWeight: 'bold',
    display: 'block-inline',
    color: (props.color || textColor),
    padding: 0,
    whitespace: 'pre',
    margin: INSTR_MARGIN,
    minWidth: INSTR_WIDTH,
  })
}); 

// TODO labels will be double-clickable to snap SymTable to this procedure
export function LabelLine(props) {
  const style = useStyles({color: labelColor, indent: '0px'}).style;
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
    <div key={`line${addr}-root`} id={`line${addr}-root`}>
      {spans}
    </div>
  );
}

const parseArg = (arg, argID, addr, lst=[]) => {
  const groups = arg.match(/\d+|\D+/g); // split arg on digits
  const textStyle = useStyles({color: textColor}).style;
  const numStyle = useStyles({color: numColor}).style;
  groups.forEach((group, index) => {
    if (/^\d+$/.test(group))
      lst.push(<NumSpan key={`line${addr}-${argID}-${index}`} style={numStyle} code={group} />);
    else
      lst.push(<TextSpan key={`line${addr}-${argID}-${index}`} style={textStyle} code={group} />);
  });
  return lst;
}

function MnemonicSpan(props) {
  const opts = {color: textColor};
  const style = useStyles(opts).instr;
  return (<span className={style}>{props.code}</span>);
}

function TextSpan(props) {
  const opts = {color: textColor};
  const style = (props.style || useStyles(opts).style);
  return (<span className={style}>{props.code}</span>);
}

// TODO Numbers longer than AUTO_HEX_DIGITS digits should be automatically converted to hex
// TODO Numbers should be double-clickable to toggle between hex and decimal
function NumSpan(props) {
  const opts = {color: numColor};
  const style = (props.style || useStyles(opts).style);
  return (<span className={style}>{props.code}</span>);
}
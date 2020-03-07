import React, { useState, useEffect } from 'react';
import { getProjectAnalysisOutput } from 'store/selectors';
import Context from './Context';
import Line from './Line';
import { useSelector } from 'react-redux';

export default function CodeViewer() {
  const { code } = useSelector(getProjectAnalysisOutput);
  const [gutterWidth, setGutterWidth] = useState('auto');
  const [openedCode, setOpenedCode] = useState({});

  useEffect(() => {
    const openedCode = {};
    Object.keys(code).forEach(blockAddr => {
      code[blockAddr].forEach(instr => {
        openedCode[instr.addr] = instr;
      });
    });
    setOpenedCode(openedCode);
  }, [code]);

  const lastIndex = Object.keys(openedCode).length-1;
  const codeElem = Object.keys(openedCode).map((instr, index) => {
    instr = openedCode[instr];
    return (<Line
      key={ `codeline${instr.addr}` }
      lineAddr={ instr.addr }
      label={ instr.label }
      mnemonic={ instr.mnemonic }
      args={ instr.args }
      funcAddr={ instr.procedure }
      blockAddr={ instr.block }
      isLastLine={ index === lastIndex }
    />);
  });

  return (
    <Context.Provider
      value={{
        gutterWidth,
        setGutterWidth
      }}>
      <div style={{ whiteSpace: 'pre', overflow: 'auto' }}>{ codeElem }</div>
    </Context.Provider>);
}
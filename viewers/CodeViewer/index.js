import React, { useState, useEffect } from 'react';
import { getProjectItems } from 'store/selectors';
import Context from './Context';
import Line from './Line';
import { useSelector } from 'react-redux';

export default function CodeViewer() {
  const { code } = useSelector(getProjectItems);
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

  const codeElem = Object.keys(openedCode).map(instr => {
    instr = openedCode[instr];
    return (<Line
      key={ `codeline${instr.addr}` }
      lineAddr={ instr.addr }
      code={ instr.code }
      funcAddr={ instr.procedure }
      blockAddr={ instr.block }
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
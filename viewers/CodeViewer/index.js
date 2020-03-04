import React, { useState, useEffect } from 'react';
import Context from './Context';
import Line from './Line';

const hardcodedCode = { code: ["Elves eat cookies while", "making toy codes and", "singing PL songs!"] };

export default function CodeViewer() {
  const { code } = hardcodedCode;
  const [gutterWidth, setGutterWidth] = useState('auto');
  const [openedCode, setOpenedCode] = useState({});

  useEffect(() => {
    const openedIR = {};
    code.forEach((line, lineAddr) => {
      openedIR[999+lineAddr*4] = line;
    });
    setOpenedCode(openedIR);
  }, [code]);

  const codeElem = Object.keys(openedCode).map(lineAddr => {
    return (<Line
      key={ `codeline${lineAddr}` }
      lineAddr={ lineAddr }
    />);
  });

  return (
    <Context.Provider
      value={{
        code: openedCode,
        gutterWidth,
        setGutterWidth
      }}>
      <div style={{ whiteSpace: 'pre' }}>{ codeElem }</div>
    </Context.Provider>);
}
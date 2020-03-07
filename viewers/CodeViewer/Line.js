import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import Context from './Context';
import { LabelLine, InstrLine } from './LineTypes';

export default function Line(props) {
  const { lineAddr, label, mnemonic, args, funcAddr, blockAddr, isLastLine } = props;
  const { gutterWidth, setGutterWidth } = useContext(Context);

  if (label) {
    return (
      <div key={`line${lineAddr}div`}>
        <Gutter
            lineAddr={ lineAddr }
            lastLine={ isLastLine }
            width={ gutterWidth }
            onSet={ setGutterWidth } />
          <LabelLine key={`line${lineAddr}`} style={{display: 'inline-block'}} label={`${label}`} />
      </div>
    );
  }
  return (
    <div key={`line${lineAddr}div`}>
      <Gutter
        lineAddr={ lineAddr }
        lastLine={ isLastLine }
        width={ gutterWidth }
        onSet={ setGutterWidth } />
      <InstrLine style={{display: 'inline-block'}} key={`line${lineAddr}`} addr={lineAddr} mnemonic={mnemonic} args={args} />
    </div>
  );
}

function Gutter(props) {
  const { lineAddr, lastLine, width, theme, onSet } = props;

  function set(ref) {
    if (ref && lastLine) {
      const bounds = ref.getBoundingClientRect();
      const currWidth = bounds.width;
      if (width !== currWidth) onSet(currWidth);
    }
  }

  return (
    <div
      style={{
        display: 'inline-block',
        width,
        fontFamily: 'Roboto Mono, Courier New, Courier, monospace',
        backgroundColor: theme.palette.grey['200'],
        textAlign: 'right',
        padding: '0 5px'
      }}>
      <Typography
        variant='body2'
        ref={ set }
        color='textSecondary'>
        { lineAddr }
      </Typography>
    </div>);
}
Gutter = withTheme(Gutter);
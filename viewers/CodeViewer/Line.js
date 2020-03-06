import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import Context from './Context';

export default function Line(props) {
  const { lineAddr, code, funcAddr, blockAddr } = props;
  const { gutterWidth, setGutterWidth } = useContext(Context);

  return (
    <div key={ `line${lineAddr}` }>
      <Gutter
        lineAddr={ lineAddr }
        lastLine={ lineAddr === Object.keys(code).length - 1 }
        width={ gutterWidth }
        onSet={ setGutterWidth } />
      <Typography
        variant='body2'
        style={{
          display: 'inline-block',
          verticalAlign: 'bottom',
          fontFamily: '"Roboto Mono", "Courier New", Courier, monospace'
        }}>
        { code[lineAddr].code }
      </Typography>
    </div>);
}

function Gutter(props) {
  const { lineAddr, lastLine, width, theme, onSet } = props;

  function set(ref) {
    if (lastLine) {
      const bounds = ref.getBoundingClientRect();
      const currWidth = bounds.width;
      if (width !== currWidth) setGutterWidth(currWidth);
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

import React from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Spacer } from 'library/base';

/**
 * GraphLabel component
 * @param {Object} props 
 * @param {String} props.graphId graph id
 */
export default function GraphLabel(props) {
  const { graphId } = props;
  const theme = useTheme();

  return (
    <Toolbar
      variant='dense'
      style={{
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.text.primary,
        minHeight: 'unset'
      }}>
      <Spacer
        childrenStyle={{ marginRight: '1em' }}
        noDiv >
        <Typography>{ graphId }</Typography>
      </Spacer>
    </Toolbar>);
}

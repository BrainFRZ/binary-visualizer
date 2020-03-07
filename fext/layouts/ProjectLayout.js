import React from 'react';
import { CodeViewer, FunctionGraph, BlockGraph } from 'viewers';
import { Pane, SplitPane } from 'library/base';

export default function ProjectLayout() {
  return (
    <SplitPane vertical>
      <Pane width='64%' overflow='auto'>
        <SplitPane horizontal>
          <Pane height='48%'><FunctionGraph /></Pane>
          <Pane><BlockGraph /></Pane>
        </SplitPane>
      </Pane>
      <Pane style={{backgroundColor: '#F5EABA'}}><CodeViewer /></Pane>
    </SplitPane>);
}

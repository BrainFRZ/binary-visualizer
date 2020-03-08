import React from 'react';
import { CodeViewer, FunctionGraph, BlockGraph } from 'viewers';
import { Pane, SplitPane } from 'library/base';

export default function ProjectLayout() {
  return (
    <SplitPane vertical>
      <Pane width='64%' overflow='auto'>
        <FunctionGraph />
      </Pane>
      <Pane style={{backgroundColor: '#F5EABA'}}>
        <CodeViewer />
      </Pane>
    </SplitPane>);
}

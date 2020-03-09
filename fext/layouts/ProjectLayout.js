import React from 'react';
import { CodeViewer, GraphViewer } from 'viewers';
import { Pane, SplitPane } from 'library/base';

export default function ProjectLayout() {
  return (
    <SplitPane vertical>
      <Pane width='64%' overflow='auto'>
        <GraphViewer />
      </Pane>
      <Pane>
        <CodeViewer />
      </Pane>
    </SplitPane>);
}

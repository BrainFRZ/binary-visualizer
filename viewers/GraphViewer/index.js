import React from 'react';
import { useSelector } from 'react-redux';
import { Pane, SplitPane } from 'library/base';
import { Graph } from 'library/connected';
import { getProcsGraphId, getBlocksGraphId } from 'fext/store/selectors';
import GraphLabel from './GraphLabel';
import BlockGraph from './BlockGraph';
import { mainConfig } from './configs/index';

export default function GraphViewer() {
  const procsGraphId = useSelector(getProcsGraphId);
  const blocksGraphId = useSelector(getBlocksGraphId);
  return (
    <SplitPane horizontal>
      <Pane height='50%'>
        <GraphLabel graphId={ procsGraphId } />
        <Graph graphId={ procsGraphId } config={ mainConfig } />
      </Pane>
      <Pane height='50%'>
        <BlockGraph graphId={ blocksGraphId } />
      </Pane>
    </SplitPane>);
}

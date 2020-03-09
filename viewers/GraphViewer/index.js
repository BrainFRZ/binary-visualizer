import React from 'react';
import { useSelector } from 'react-redux';
import { Pane, SplitPane } from 'library/base';
import { Graph } from 'library/connected';
import { getMainGraphId } from 'store/selectors';
import { getBlocksGraphId } from 'fext/store/selectors';
import GraphLabel from './GraphLabel';
import { mainConfig } from './configs/index';
import BlockGraph from './BlockGraph';

export default function GraphViewer() {
  const mainGraphId = useSelector(getMainGraphId);
  const blocksGraphId = useSelector(getBlocksGraphId);

  return  (
    <SplitPane horizontal>
      <Pane height='50%'>
        <GraphLabel graphId={ mainGraphId } />
        <Graph graphId={ mainGraphId } config={ mainConfig } />
      </Pane>
      <Pane height='50%'>
        <BlockGraph graphId={ blocksGraphId } />
      </Pane>
    </SplitPane>);
}

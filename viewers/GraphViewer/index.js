import React, { createRef, useState } from 'react';
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
  const { code } = useSelector(getProjectAnalysisOutput);
  const [processedLabelQueue, setLabelQueueStatus] = useState(true);
  const [labelStore, updateLabelStore] = useState({});

  const [graph, setGraph] = useState(<Loading status='Building graph'/>);
  useEffect(() => {
    if (blocksGraphId !== 'blocks' && code)
      setGraph(<BlockGraph graphId={ blocksGraphId } labelStore={ labelStore } />)
  }, [code, blocksGraphId, processedLabelQueue]);


  return (
    <SplitPane horizontal>
      <Pane height='50%'>
        <GraphLabel graphId={ mainGraphId } />
        <Graph graphId={ mainGraphId } config={ mainConfig } />
      </Pane>
      <Pane height='50%'>
        { graph }
      </Pane>
    </SplitPane>);
}

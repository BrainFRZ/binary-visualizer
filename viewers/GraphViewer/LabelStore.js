import React from 'react';
import { useSelector } from 'react-redux';
import { Pane, SplitPane } from 'library/base';
import { Graph } from 'library/connected';
import { mainConfig, blocksConfig } from './configs/index';

export default function LabelStoreGraph(props) {
  const { graphId } = props;
  const { labels, updateLabels } = useState({});
  const addNewLabel = (newLabel) => updateLabels({...labels, newLabel});
  const { code } = useSelector(getProjectAnalysisOutput);
  const [graph, setGraph] = useState(<Loading status='Building graph'/>);

  useEffect(() => {
    if (code)
      setGraph(<Graph graphId={graphId} config={blocksConfig(this, code)} />);
  }, [code]);

  return graph;
}
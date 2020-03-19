import React from 'react';
import GraphLabel from './GraphLabel';
import { Graph } from 'library/connected';
import { blocksConfig, htmlLabelConfig } from './configs/index';

export default function BlockGraph(props) {
  const { graphId, config=blocksConfig, htmlLabels=htmlLabelConfig } = props;
  return (
    <>
      <GraphLabel graphId={graphId} />
      <Graph graphId={graphId} config={config} htmlLabels={htmlLabels} />
    </>
  );
}
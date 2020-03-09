import React from 'react';
import GraphLabel from './GraphLabel';
import { Graph } from 'library/connected';
import { blocksConfig } from './configs/BlocksConfig';

export default function BlockGraph(props) {
  const { graphId, config=blocksConfig } = props;
  return (
    <>
      <GraphLabel graphId={graphId} />
      <Graph graphId={graphId} config={config} />
    </>
  );
}
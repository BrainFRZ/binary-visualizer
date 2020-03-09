import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from 'library/base';
import GraphLabel from './GraphLabel';
import LabelStoreGraph from './configs/BlocksConfig';

export default function BlockGraph(props) {
  const { graphId } = props;
  const { code } = useSelector(getProjectAnalysisOutput);

  return (
    <>
      <GraphLabel graphId={graphId} />
      <LabelStoreGraph graphId={graphId} code={code} />
    </>
  );
}
import React from 'react';
import { Graph } from 'library/connected';

const procNames = ['eat', 'make', 'sing'];

const buildConfig = () => {
  return ({
    style: procNames.map(name =>
      ({
        selector: 'node',
        style: {
          'background-color': '#6783F3',
          'label': 'data(label)',
          'height': 'label',
          'width': 'label',
          'text-wrap': 'wrap',
          'font-family': 'Roboto Mono',
          'font-color': '#E93251',
        }
      })),
  });
}

export default function FunctionGraph() {
  return  (
    <div>
      <Graph
        graphId='procs'
        config={ buildConfig() }/>
    </div>);
}
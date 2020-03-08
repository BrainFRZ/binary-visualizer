import React from 'react';
import { useSelector } from 'react-redux';
import { Pane, SplitPane } from 'library/base';
import { Graph } from 'library/connected';
import { getMainGraphId, getSubGraphId } from 'store/selectors';
import GraphLabel from './GraphLabel';

export default function FunctionGraph() {
  const mainGraphId = useSelector(getMainGraphId);
  const subGraphId = useSelector(getSubGraphId);

  return  (
    <SplitPane horizontal>
      <Pane height='50%'>
        <GraphLabel graphId={ mainGraphId } />
        <Graph graphId={ mainGraphId } config={ mainConfig } />
      </Pane>
      <Pane height='50%'>
        <GraphLabel graphId={ subGraphId } />
        <Graph graphId={ subGraphId } config={ mainConfig } />
      </Pane>
    </SplitPane>);
}

const mainConfig = {
  style: [{
      selector: 'node',
      style: {
        'background-color': '#0016b5', // dark blue
        'label': 'data(label)',
        'text-valign': 'center',
        'height': '42px',
        'width': calcWidth(),
        'text-wrap': 'wrap',
        'font-family': 'Roboto Mono',
        'color': '#FFFFFF', // white
        'border-width': '1px',
        'border-color': '#000000',
        'font-weight': 'bold'
      }
    }, {
      selector: 'edge',
      style: {
        'label': 'data(label)',
        'curve-style': 'bezier',
        'line-color': getStyle('line-color', '#6783F3'), // default dark blue
        'line-style': getStyle('line-style', 'solid'),
        'target-arrow-shape': 'triangle',
        'target-arrow-color': getStyle('target-arrow-color', '#6783F3')
      }
    },
  ],
  headless: true
};
function getStyle(prop, defaultStyle) {
  return element => {
    const style = element.data('style');
    if (style && style[prop])
      return style[prop];
    else
      return defaultStyle;
  }
}
function calcWidth() {
  return element => {
    const label = element.data('label');
    return label.length*14;
  }
}
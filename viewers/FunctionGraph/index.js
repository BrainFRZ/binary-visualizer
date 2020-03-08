import React from 'react';
import { useSelector } from 'react-redux';
import { Pane, SplitPane } from 'library/base';
import { Graph } from 'library/connected';
import { getMainGraphId } from 'store/selectors';
import GraphLabel from './GraphLabel';

export default function FunctionGraph() {
  const mainGraphId = useSelector(getMainGraphId);

  return  (
    <SplitPane horizontal>
      <Pane height='50%'>
        <GraphLabel graphId={ mainGraphId } />
        <Graph graphId={ mainGraphId } config={ mainConfig } />
      </Pane>
      <Pane height='50%'>
        <GraphLabel graphId='Blocks Graph' />
        <div>Graph of selected function's blocks goes here</div>
      </Pane>
    </SplitPane>);
}

const mainConfig = {
  style: [{
      selector: 'node',
      style: {
        'background-color': '#6783F3',
        'label': 'data(label)',
        'text-valign': 'center',
        'height': '42px',
        'width': calcWidth(),
        'text-wrap': 'wrap',
        'font-family': 'Roboto Mono',
        'color': '#E93251',
        'border-width': '2px',
        'border-color': '#0017a6',
        'font-weight': 'bold',
      }
    }, {
      selector: 'edge',
      style: {
        'label': 'data(label)',
        'curve-style': 'bezier',
        'line-color': getStyle('line-color', '#0017a6'), // default dark blue
        'line-style': getStyle('line-style', 'solid'),
        'target-arrow-shape': 'triangle',
        'target-arrow-color': getStyle('target-arrow-color', '#0017a6')
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
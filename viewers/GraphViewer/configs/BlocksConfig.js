import getStyle from './index';
import { generateHTMLTag, generateHTMLBlock } from '../LabelGenerator';
import { inspect } from 'util';

const EDGE_COLOR = '#6783F3'; // Dark cyan

export const blocksConfig = {
  style: [{
      selector: 'node',
      style: {
        'background-color': node => getCytoLabel(node).backgroundColor,
        'height': node => getCytoLabel(node).height,
        'width': node => getCytoLabel(node).width,
        'shape': 'rectangle',
        'text-wrap': 'wrap',
        'border-width': '1px',
        'border-color': '#000000',
      }
    }, {
      selector: 'edge',
      style: {
        'label': 'data(label)',
        'curve-style': 'bezier',
        'line-color': getStyle('line-color', EDGE_COLOR),
        'line-style': getStyle('line-style', 'solid'),
        'target-arrow-shape': 'triangle',
        'target-arrow-color': getStyle('target-arrow-color', EDGE_COLOR)
      }
    },
  ],
  headless: true
};

export const htmlLabelConfig = ([
  {
    query: 'node',
    valign: 'center',
    valignBox: 'center',
    tpl: getHTMLTemplate,
  }
]);

function getCytoLabel(node) {
  console.log(node);
  if (node.data('block') === undefined)
    return console.log(`GET_LABEL ERROR`);
  if (node.data('block') === null)
    return generateHTMLTag(node.data('label'));
  return generateHTMLBlock(node.data('block'));
}

function getHTMLTemplate(node) {
  if (node.block === undefined)
    return console.log(`GET_LABEL ERROR`);
  if (node.block === null)
    return generateHTMLTag(node.label).label;
  return generateHTMLBlock(node.block).label;
}

import getStyle from './index';
import { generateHTMLTag, generateHTMLBlock } from '../LabelGenerator';

const EDGE_COLOR = '#6783F3'; // Dark cyan

const getCytoLabel = getLabelFactory(getCytoProp);
const getHTMLLabel = getLabelFactory(getHTMLProp);

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
    tpl: data => getHTMLLabel(data).label,
  }
]);

function getLabelFactory(propCallback) {
  return function(dataSrc) {
    if (propCallback(dataSrc, 'block') === undefined)
      console.error('GET_LABEL ERROR: node ', propCallback(dataSrc, 'id'));
    else if (propCallback(dataSrc, 'block') === null)
      return generateHTMLTag(propCallback(dataSrc, 'label'));
    else
      return generateHTMLBlock(propCallback(dataSrc, 'block'));
  }
}
function getCytoProp(node, prop) { return node.data(prop); }
function getHTMLProp(data, prop) { return data[prop]; }
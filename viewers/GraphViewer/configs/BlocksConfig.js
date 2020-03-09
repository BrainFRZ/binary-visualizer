import getStyle from './index';
import mainConfig from './index';

const blocksConfig = (labelStore, code) => ({
  style: [{
      selector: 'node',
      style: {
        'background-image': getLabel(labelStore),
        'background-fit': 'contain',
        'background-color': getBackgroundColor(code),
        'text-valign': 'center',
        'shape': 'roundrectangle',
        'height': getHeight(labelStore),
        'width': getWidth(labelStore),
      }
    }, {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'line-color': getStyle('line-color', '#6783F3'), // default dark blue
        'line-style': getStyle('line-style', 'solid'),
        'target-arrow-shape': 'triangle',
        'target-arrow-color': getStyle('target-arrow-color', '#6783F3')
      }
    },
  ],
  headless: true
});
export default blocksConfig;

function getLabel(labelStore) {
  return element => {
    const label = element.data('label');
    return label.length*10;
  }
}
function getHeight(labelStore) {
  return element => {
    const label = element.data('label');
    return label.length*10;
  }
}
function getWidth(labelStore) {
  return element => {
    const label = element.data('label');
    return label.length*10;
  }
}
function getBackgroundColor(code) {
  return element => {
    const addr = element.data('label');
    return (addr in code) ? '#F5EABA' : '#0016b5';
  }
}
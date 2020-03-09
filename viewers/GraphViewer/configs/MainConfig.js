import getStyle from './index';

export const mainConfig = {
  style: [{
      selector: 'node',
      style: {
        'background-color': '#0016b5', // dark blue
        'label': 'data(label)',
        'text-valign': 'center',
        'shape': 'rectangle',
        'height': '25px',
        'width': calcLabelWidth(),
        'text-wrap': 'wrap',
        'font-family': 'Courier New',
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
function calcLabelWidth() {
  return element => {
    const label = element.data('label');
    return label.length*10;
  }
}
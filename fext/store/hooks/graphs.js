import store from 'store';
import { getProjectAnalysisOutput } from 'store/selectors';


/**
 * @param {String} graphId graph id
 * @returns {Function} node data to append on cytoscape data import
 */
export function cyNodeDataHook(graphId) {
  const state = store.getState();
  const { code } = getProjectAnalysisOutput(state);

  /**
   * @param {String} nodeId node id
   * @returns {Object} node data to append to data imported into cytoscape
   */
  return function (nodeId) {
    let block = null;
    if (nodeId in code) {
      block = code[nodeId];
    }
    return { block };
  };
}

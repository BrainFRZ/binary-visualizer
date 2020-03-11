import { createSelector } from 'reselect';
import { getProjectAnalysisOutput, getMainGraphId, getSelectedNodes } from 'store/selectors';

export const getProcsGraphId = createSelector((selectedNodes, analOut) => 'funcs');

export const getBlocksGraphId = createSelector(
  state => getSelectedNodes(state, getMainGraphId(state)),
  state => getProjectAnalysisOutput(state),
  (selectedNodes, analOut) => {
    let blocksGraphId = 'blocks';
    if (selectedNodes.length > 0) {
      blocksGraphId = selectedNodes[0];
      // Convert to name if given an addr, unless that is its name
      blocksGraphId = /^\d+$/.test(blocksGraphId) ? (analOut.funcLookup[blocksGraphId] || blocksGraphId+'') : blocksGraphId+'';
    }
    return blocksGraphId;
  }
);
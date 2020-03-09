import { SELECT_FUNC } from '../actionTypes';

export const selectFunc = (projectId, funcName='') => ({
  type: SELECT_FUNC,
  payload: {projectId, funcName},
});
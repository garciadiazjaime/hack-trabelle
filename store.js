import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  selectedMarker: {},
};

export const actionTypes = {
  SET_MARKER: 'SET_MARKER',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MARKER:
      return Object.assign({}, state, {
        selectedMarker: action.selectedMarker,
      });
    default:
      return state;
  }
};

// ACTIONS

export const setMarker = marker => dispatch => dispatch({ type: actionTypes.SET_MARKER, selectedMarker: marker });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

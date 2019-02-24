import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  selectedMarker: {},
  places: [],
};

export const actionTypes = {
  SET_MARKER: 'SET_MARKER',
  ADD_PLACE: 'ADD_PLACE',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MARKER:
      return Object.assign({}, state, {
        selectedMarker: action.selectedMarker,
      });
    case actionTypes.ADD_PLACE:
      state.places.push(action.place);
      return Object.assign({}, state);
    default:
      return state;
  }
};

// ACTIONS

export const setMarker = marker => dispatch => dispatch({ type: actionTypes.SET_MARKER, selectedMarker: marker });

export const addPlace = place => dispatch => dispatch({ type: actionTypes.ADD_PLACE, place });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  selectedMarker: '',
  places: [],
  points: [],
  userPlaces: {},
};

export const actionTypes = {
  SET_PLACES: 'SET_PLACES',
  SET_MARKER: 'SET_MARKER',
  ADD_USER_PLACE: 'ADD_USER_PLACE',
  REMOVE_USER_PLACE: 'REMOVE_USER_PLACE',
  REMOVE_MARKER: 'REMOVE_MARKER',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLACES:
      return {
        ...state,
        places: action.places,
      };
    case actionTypes.SET_MARKER:
      return {
        ...state,
        selectedMarker: action.selectedMarker,
      };
    case actionTypes.REMOVE_MARKER:
      return {
        ...state,
        selectedMarker: '',
      };
    case actionTypes.ADD_USER_PLACE:
      return {
        ...state,
        userPlaces: { ...state.userPlaces, [action.placeId]: true },
      };
    case actionTypes.REMOVE_USER_PLACE:
      return {
        ...state,
        userPlaces: { ...state.userPlaces, [action.placeId]: false },
      };
    default:
      return state;
  }
};

// ACTIONS

export const setPlaces = places => dispatch => dispatch({ type: actionTypes.SET_PLACES, places });
export const setMarker = marker => dispatch => dispatch({ type: actionTypes.SET_MARKER, selectedMarker: marker });
export const removeMarker = () => dispatch => dispatch({ type: actionTypes.REMOVE_MARKER });
export const addUserPlace = placeId => dispatch => dispatch({ type: actionTypes.ADD_USER_PLACE, placeId });
export const removeUserPlace = placeId => dispatch => dispatch({ type: actionTypes.REMOVE_USER_PLACE, placeId });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

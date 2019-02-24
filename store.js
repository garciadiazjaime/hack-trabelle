import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  selectedMarker: '',
  places: [],
  points: [],
  userPlaces: {},
  images: [],

  photographers: [],
  photographer: false,
};

export const actionTypes = {
  SET_PLACES: 'SET_PLACES',
  SET_MARKER: 'SET_MARKER',
  ADD_USER_PLACE: 'ADD_USER_PLACE',
  REMOVE_USER_PLACE: 'REMOVE_USER_PLACE',
  REMOVE_MARKER: 'REMOVE_MARKER',

  SET_PHOGRAPHERS: 'SET_PHOGRAPHERS',
  SET_PHOTOGRAPHER: 'SET_PHOTOGRAPHER',
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
        images: action.images,
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
      const userPlaces = { ...state.userPlaces };
      delete userPlaces[action.placeId];
      return {
        ...state,
        userPlaces,
      };

    case actionTypes.SET_PHOGRAPHERS:
      return {
        ...state,
        photographers: state.photographers.concat(action.photographers),
      };
    case actionTypes.SET_PHOTOGRAPHER:
      return {
        ...state,
        photographer: action.photographer,
      };
    default:
      return state;
  }
};

// ACTIONS

// users

export const setPlaces = places => dispatch => dispatch({ type: actionTypes.SET_PLACES, places });
export const setMarker = (marker, images) => dispatch => dispatch({ type: actionTypes.SET_MARKER, selectedMarker: marker, images });
export const removeMarker = () => dispatch => dispatch({ type: actionTypes.REMOVE_MARKER });
export const addUserPlace = placeId => dispatch => dispatch({ type: actionTypes.ADD_USER_PLACE, placeId });
export const removeUserPlace = placeId => dispatch => dispatch({ type: actionTypes.REMOVE_USER_PLACE, placeId });

// photographers

export const setPhotographers = photographers => dispatch => dispatch({ type: actionTypes.SET_PHOGRAPHERS, photographers });
export const setPhotographer = photographer => dispatch => dispatch({ type: actionTypes.SET_PHOTOGRAPHER, photographer });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

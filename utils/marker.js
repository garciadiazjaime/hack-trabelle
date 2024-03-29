import axios from 'axios';

import { setMarker, removeUserPlace, removeMarker } from '../store';

function changeOpacity(evt) {
  evt.target.style.opacity = 0.6;
}

function changeOpacityToOne(evt) {
  evt.target.style.opacity = 1;
}

async function getImages(place) {
  const results = await axios.get(place.href);
  if (results.status === 200) {
    return results.data.media.images.items.slice(0, 5).map(item => item.src);
  }
  return [];
}

function getIconElement(state) {
  const outerElement = document.createElement('div');
  const imageElement = document.createElement('img');
  imageElement.src = '/static/pin.png';
  imageElement.style.width = '30px';

  outerElement.style.userSelect = 'none';
  outerElement.style.webkitUserSelect = 'none';
  outerElement.style.msUserSelect = 'none';
  outerElement.style.mozUserSelect = 'none';
  outerElement.style.cursor = 'default';

  if (state === 1) {
    imageElement.style.border = '3px solid gray';
  } else if (state === 2) {
    imageElement.style.border = '3px solid green';
  }

  // outerElement.appendChild(innerElement);
  outerElement.appendChild(imageElement);

  return outerElement;
}

async function onClickHandler({
  dispatch, place, userPlaces, selectedMarker, showImages,
}) {
  if (userPlaces && userPlaces[place.id]) {
    dispatch(removeUserPlace(place.id));
  } else if (place && place.id === selectedMarker) {
    dispatch(removeMarker());
  } else {
    let images = [];
    if (showImages) {
      images = await getImages(place);
    }
    dispatch(setMarker(place.id, images));
  }
}

function getDomMarker({
  place, dispatch, markerState, userPlaces, selectedMarker, showImages,
}) {
  const [lat, lng] = place.position;
  if (lat && lng) {
    const pos = { lat, lng };
    const iconElement = getIconElement(markerState);

    const icon = new H.map.DomIcon(iconElement, {
      onAttach(clonedElement) {
        clonedElement.addEventListener('mouseover', changeOpacity);
        clonedElement.addEventListener('mouseout', changeOpacityToOne);
        clonedElement.addEventListener('mouseup', () => onClickHandler({
          dispatch, place, userPlaces, selectedMarker, showImages,
        }));
      },
      onDetach(clonedElement) {
        clonedElement.removeEventListener('mouseover', changeOpacity);
        clonedElement.removeEventListener('mouseout', changeOpacityToOne);
        clonedElement.removeEventListener('mouseup', onClickHandler);
      },
    });

    const marker = new H.map.DomMarker(pos, {
      icon,
    });
    return marker;
  }
}

function getMarkerState({ place, selectedMarker, userPlaces }) {
  if (userPlaces && userPlaces[place.id]) {
    return 2;
  }
  if (place && place.id === selectedMarker) {
    return 1;
  }
  return 0;
}

export {
  getDomMarker,
  getMarkerState,
};

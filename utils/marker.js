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
  const innerElement = document.createElement('div');

  outerElement.style.userSelect = 'none';
  outerElement.style.webkitUserSelect = 'none';
  outerElement.style.msUserSelect = 'none';
  outerElement.style.mozUserSelect = 'none';
  outerElement.style.cursor = 'default';

  innerElement.style.color = 'red';
  innerElement.style.backgroundColor = 'blue';
  if (state === 1) {
    innerElement.style.border = '3px solid gray';
  } else if (state === 2) {
    innerElement.style.border = '3px solid green';
  }
  innerElement.style.font = 'normal 12px arial';
  innerElement.style.lineHeight = '12px';

  innerElement.style.paddingTop = '2px';
  innerElement.style.paddingLeft = '4px';
  innerElement.style.width = '20px';
  innerElement.style.height = '20px';

  // add negative margin to inner element
  // to move the anchor to center of the div
  innerElement.style.marginTop = '-10px';
  innerElement.style.marginLeft = '-10px';

  outerElement.appendChild(innerElement);

  // Add text to the DOM element
  innerElement.innerHTML = 'C';

  return outerElement;
}

async function onClickHandler({
  dispatch, place, userPlaces, selectedMarker,
}) {
  if (userPlaces[place.id]) {
    dispatch(removeUserPlace(place.id));
  } else if (place.id === selectedMarker) {
    dispatch(removeMarker());
  } else {
    const images = await getImages(place);
    dispatch(setMarker(place.id, images));
  }
}

function getDomMarker({
  place, dispatch, markerState, userPlaces, selectedMarker,
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
          dispatch, place, userPlaces, selectedMarker,
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
  if (userPlaces[place.id]) {
    return 2;
  }
  if (place.id === selectedMarker) {
    return 1;
  }
  return 0;
}

export {
  getDomMarker,
  getMarkerState,
};

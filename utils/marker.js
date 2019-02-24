import { setMarker } from '../store';

function changeOpacity(evt) {
  evt.target.style.opacity = 0.6;
}

function changeOpacityToOne(evt) {
  evt.target.style.opacity = 1;
}


function onClickHandler(evt, placeData, selectedPlaces, dispatch) {
  dispatch(setMarker(placeData));
  if (!selectedPlaces[placeData.id]) {
    selectedPlaces[placeData.id] = placeData;
    evt.target.style.border = '3px solid';
  } else {
    delete selectedPlaces[placeData.id];
    evt.target.style.border = 'none';
  }
}

function getIconElement() {
  const outerElement = document.createElement('div');
  const innerElement = document.createElement('div');

  outerElement.style.userSelect = 'none';
  outerElement.style.webkitUserSelect = 'none';
  outerElement.style.msUserSelect = 'none';
  outerElement.style.mozUserSelect = 'none';
  outerElement.style.cursor = 'default';

  innerElement.style.color = 'red';
  innerElement.style.backgroundColor = 'blue';
  // innerElement.style.border = '2px solid black';
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

function addDomMarker(map, place, selectedPlaces, markers, dispatch) {
  const [lat, lng] = place.position;
  if (lat && lng) {
    const pos = { lat, lng };
    const iconElement = getIconElement();

    const icon = new H.map.DomIcon(iconElement, {
      onAttach(clonedElement) {
        clonedElement.addEventListener('mouseover', changeOpacity);
        clonedElement.addEventListener('mouseout', changeOpacityToOne);
        clonedElement.addEventListener('mouseup', evt => onClickHandler(evt, place, selectedPlaces, dispatch));
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
    map.addObject(marker);
    markers.push(marker);
  }
}

function addMarkersToMap(map, places, selectedPlaces, markers, dispatch) {
  if (places && places.length) {
    places.forEach(place => addDomMarker(map, place, selectedPlaces, markers, dispatch));
  }
}


export {
  addMarkersToMap,
};

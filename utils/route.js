let routeInstructionsContainer;
let map;

Number.prototype.toMMSS = function () {
  return `${Math.floor(this / 60)} minutes ${this % 60} seconds.`;
};

function addSummaryToPanel(summary) {
  const summaryDiv = document.createElement('div');

  let content = '';
  content += `<b>Total distance</b>: ${summary.distance}m. <br/>`;
  content += `<b>Travel Time</b>: ${summary.travelTime.toMMSS()} (in current traffic)`;

  summaryDiv.style.fontSize = 'small';
  summaryDiv.style.marginLeft = '5%';
  summaryDiv.style.marginRight = '5%';
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
}

function addManueversToPanel(route) {
  const nodeOL = document.createElement('ol');

  let i;
  let j;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft = '5%';
  nodeOL.style.marginRight = '5%';
  nodeOL.className = 'directions';

  // Add a marker for each maneuver
  for (i = 0; i < route.leg.length; i += 1) {
    for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
      // Get the next maneuver.
      const maneuver = route.leg[i].maneuver[j];
      const li = document.createElement('li');
      const spanArrow = document.createElement('span');
      const spanInstruction = document.createElement('span');

      spanArrow.className = `arrow ${maneuver.action}`;
      spanInstruction.innerHTML = maneuver.instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
    }
  }

  routeInstructionsContainer.appendChild(nodeOL);
}


function addWaypointsToPanel(waypoints) {
  const nodeH3 = document.createElement('h3');
  const waypointLabels = [];

  let i;
  for (i = 0; i < waypoints.length; i += 1) {
    waypointLabels.push(waypoints[i].label);
  }

  nodeH3.textContent = waypointLabels.join(' - ');
  routeInstructionsContainer.innerHTML = '';
  routeInstructionsContainer.appendChild(nodeH3);
}


function addRouteShapeToMap(route) {
  const lineString = new H.geo.LineString();
  const routeShape = route.shape;

  routeShape.forEach((point) => {
    const parts = point.split(',');
    lineString.pushLatLngAlt(parts[0], parts[1]);
  });

  const polyline = new H.map.Polyline(lineString, {
    style: {
      lineWidth: 4,
      strokeColor: 'rgba(0, 128, 255, 0.7)',
    },
  });
  // Add the polyline to the map
  map.addObject(polyline);
  // And zoom to its bounding rectangle
  map.setViewBounds(polyline.getBounds(), true);
}

let bubble;

function openBubble(position, text) {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      { content: text },
    );
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

function addManueversToMap(route) {
  const svgMarkup = '<svg width="18" height="18" '
    + 'xmlns="http://www.w3.org/2000/svg">'
    + '<circle cx="8" cy="8" r="8" '
      + 'fill="#1b468d" stroke="white" stroke-width="1"  />'
    + '</svg>';
  const dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } });
  const group = new H.map.Group();

  let i;
  let j;
  // Add a marker for each maneuver
  for (i = 0; i < route.leg.length; i += 1) {
    for (j = 0; j < route.leg[i].maneuver.length; j += 1) {
      // Get the next maneuver.
      const maneuver = route.leg[i].maneuver[j];
      // Add a marker to the maneuvers group
      const marker = new H.map.Marker({
        lat: maneuver.position.latitude,
        lng: maneuver.position.longitude,
      },
      { icon: dotIcon });
      marker.instruction = maneuver.instruction;
      group.addObject(marker);
    }
  }

  group.addEventListener('tap', (evt) => {
    map.setCenter(evt.target.getPosition());
    openBubble(
      evt.target.getPosition(), evt.target.instruction,
    );
  }, false);

  // Add the maneuvers group to the map
  map.addObject(group);
}

function onError(error) {
  alert('Ooops!');
}

function onSuccess(result) {
  const route = result.response.route[0];
  /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addRouteShapeToMap(route);
  addManueversToMap(route);

  addWaypointsToPanel(route.waypoint);
  addManueversToPanel(route);
  addSummaryToPanel(route.summary);
}

function getPoints(places) {
  return places.reduce((accumulator, place, index) => {
    accumulator[`waypoint${index}`] = `${place.position[0]},${place.position[1]}`;
    return accumulator;
  }, {});
}

function calculateRouteFromAtoB(platform, mapShallow, places) {
  map = mapShallow;
  routeInstructionsContainer = document.getElementById('panel');

  const router = platform.getRoutingService();

  const points = getPoints(places);
  const routeRequestParams = {
    mode: 'shortest;pedestrian',
    representation: 'display',
    ...points,
    routeattributes: 'waypoints,summary,shape,legs',
    maneuverattributes: 'direction,action',
  };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError,
  );
}

export {
  calculateRouteFromAtoB,
};

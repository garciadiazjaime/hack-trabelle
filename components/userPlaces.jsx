import { connect } from 'react-redux';

function userPlaces({ places, userPlaces }) {
  return (
    <div>
      <h2>Your selections</h2>
      <ul>
        {
        Object.keys(userPlaces).map((placeId) => {
          const place = places.find(p => p.id === placeId);
          return (<li key={place.id}>{place.title}</li>);
        })
        }
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  const { userPlaces, places } = state;
  return { userPlaces, places };
}

export default connect(mapStateToProps)(userPlaces);

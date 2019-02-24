import { Component } from 'react';
import { connect } from 'react-redux';


class Images extends Component {
  render() {
    return (
      <div>
        Images
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('state', state);
  const { count } = state;
  return { count };
}

export default connect(mapStateToProps)(Images);

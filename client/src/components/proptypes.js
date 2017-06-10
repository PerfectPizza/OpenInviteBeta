import PropTypes from 'prop-types';

const event = PropTypes.shape({
  title: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    picture: PropTypes.string,
  }),
  _id: PropTypes.string,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  attendees: PropTypes.array,
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
});

const events = PropTypes.arrayOf(event);

const user = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
});

const userLocation = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});

const history = PropTypes.shape({
  match: PropTypes.object.isRequired,
});

// This app also uses the Location library
const map = PropTypes.shape({
  Map: PropTypes.func.isRequired,
  Marker: PropTypes.func,
});

export default {
  event,
  events,
  user,
  userLocation,
  history,
  map,
};

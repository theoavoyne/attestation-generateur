import PropTypes from 'prop-types';

export default PropTypes.exact({
  address: PropTypes.string,
  birthDate: PropTypes.string,
  birthPlace: PropTypes.string,
  date: PropTypes.string,
  city: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  motive: PropTypes.oneOf([
    'community',
    'family',
    'health',
    'judicial',
    'shopping',
    'work',
    'workout',
  ]),
  postalCode: PropTypes.string,
  time: PropTypes.string,
});

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
    'missions',
    'famille',
    'sante',
    'judiciaire',
    'courses',
    'travail',
    'sport',
    null,
  ]),
  postalCode: PropTypes.string,
  time: PropTypes.string,
});

import moment from 'moment-timezone';

export default (content) => {
  const now = moment().subtract(20, 'minutes').tz('Europe/Paris');

  return {
    ...content,
    date: now.format('DD/MM/YYYY'),
    time: now.format('HH:mm'),
  };
};

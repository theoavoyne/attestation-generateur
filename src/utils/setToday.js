import moment from 'moment-timezone';

export default (content) => {
  const now = moment().tz('Europe/Paris');

  return {
    ...content,
    date: now.format('DD/MM/YYYY'),
    time: now.format('HH:mm'),
  };
};

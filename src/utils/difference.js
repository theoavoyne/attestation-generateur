const isObject = require('lodash.isobject');

const difference = (obj1, obj2, currentPath = '') => {
  const paths = [];

  if (isObject(obj1)) {
    Object.keys(obj1).forEach((key) => {
      paths.push(...difference(obj1[key], obj2[key], `${currentPath}.${key}`));
    });
  } else if (obj1 !== obj2) { paths.push(currentPath); }

  return paths;
};

export default difference;

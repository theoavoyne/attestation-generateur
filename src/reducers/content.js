export default (state, action) => {
  switch (action.type) {
    case 'EDIT_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };

    default:
      return state;
  }
};

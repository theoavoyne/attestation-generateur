export const editField = (event) => {
  const { value } = event.target;
  const { field } = event.target.dataset;

  return {
    field,
    type: 'EDIT_FIELD',
    value,
  };
};

export const editMotive = (value) => ({
  field: 'motive',
  type: 'EDIT_FIELD',
  value,
});

const updateContacts = (list, item, newItem = undefined) => {
  const idx = findIndex(list, item.id);

  if (idx === -1) {
    return [...list, item];
  }

  if (!newItem) {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  }

  return [...list.slice(0, idx), newItem, ...list.slice(idx + 1)];
};

const findIndex = (list, itemId) => {
  return list.findIndex((el) => {
    return el.id === itemId;
  });
};

const updateData = (state, action) => {
  if (!state) {
    return {
      isFetching: false,
      isSucceded: undefined,
      isFailed: false,
      items: [],
      filter: '',
    };
  }

  switch (action.type) {
    case 'FETCH_CONTACTS_REQUEST':
      return {
        ...state.data,
        isFetching: true,
      };
    case 'FETCH_CONTACTS_SUCCESS':
      return {
        ...state.data,
        isFetching: false,
        isSucceded: true,
        items: action.payload,
      };
    case 'FETCH_CONTACTS_FAILED':
      return {
        ...state.data,
        isFetching: false,
        isFailed: true,
      };
    case 'FILTER_CONTACTS_HANDLE':
      return {
        ...state.data,
        filter: action.payload,
      };
    case 'UPDATE_CONTACTS':
      return {
        ...state.data,
        items: updateContacts(state.data.items, action.payload),
      };
    case 'EDIT_CONTACT':
      return {
        ...state.data,
        items: updateContacts(
          state.data.items,
          action.payload.old,
          action.payload.newOne
        ),
      };
    default:
      return state.data;
  }
};

export default updateData;

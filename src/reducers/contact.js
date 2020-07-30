const updateContact = (state, action) => {
  if (!state) {
    return {
      isFetching: false,
      isSucceded: undefined,
      isFailed: false,
      addContact: [],
      removeContact: null,
      editContact: null,
    };
  }

  switch (action.type) {
    case 'ADD_CONTACT_REQUEST':
      return {
        ...state.contact,
        isFetching: true,
        addContact: action.payload,
      };
    case 'ADD_CONTACT_SUCCESS':
      return {
        ...state.contact,
        isFetching: false,
        isSucceded: true,
        addContact: [],
      };
    case 'ADD_CONTACT_FAILED':
      return {
        ...state.contact,
        isSucceded: false,
        isFetching: false,
        addContact: [],
      };
    case 'DELETE_CONTACT_REQUEST':
      return {
        ...state.contact,
        isFetching: true,
        isSucceded: undefined,
        removedContact: action.payload,
      };
    case 'DELETE_CONTACT_SUCCESS':
      return {
        ...state.contact,
        isFetching: false,
      };
    case 'DELETE_CONTACT_FAILED':
      return {
        ...state.contact,
        isFetching: false,
        isSucceded: false,
        removeContact: null,
      };
    case 'EDIT_CONTACT_HANDLE':
      return {
        ...state.contact,
        editContact: action.payload,
      };
    case 'EDIT_CONTACT_CANCELED':
      return {
        ...state.contact,
        editContact: null,
      };
    case 'EDIT_CONTACT_IS_FETCHING':
      return {
        ...state.contact,
        isFetching: true,
      };
    case 'EDIT_CONTACT_SUCCESS':
      return {
        ...state.contact,
        editContact: null,
        isFetching: false,
      };
    default:
      return state.contact;
  }
};

export default updateContact;

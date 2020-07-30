const saveUsername = (username) => ({
  type: 'SAVE_USERNAME',
  payload: username,
});

const fetchUserAuthRequest = () => ({
  type: 'FETCH_USER_AUTH_REQUEST',
});

const fetchUserAuthSuccess = () => ({
  type: 'FETCH_USER_AUTH_SUCCESS',
});

const fetchUserAuthFailed = () => ({
  type: 'FETCH_USER_AUTH_FAILED',
});

const fetchUserAuthInvalid = () => ({
  type: 'FETCH_USER_AUTH_INVALID',
});

const fetchUserAuth = (creds, authService) => {
  return (dispatch) => {
    const { username, password } = creds;
    dispatch(saveUsername(username));
    dispatch(fetchUserAuthRequest());
    authService
      .userAuthRequest(username, password)
      .then((data) => {
        if (data) {
          dispatch(fetchUserAuthSuccess());
        } else {
          dispatch(fetchUserAuthFailed());
        }
      })
      .catch(() => {
        dispatch(fetchUserAuthInvalid());
      });
  };
};

const fetchContactsRequest = () => ({
  type: 'FETCH_CONTACTS_REQUEST',
});

const fetchContactsFailed = () => ({
  type: 'FETCH_CONTACTS_FAILED',
});

const fetchContactsSuccess = (data) => ({
  type: 'FETCH_CONTACTS_SUCCESS',
  payload: data,
});

const fetchContacts = (contactsService) => {
  return (dispatch, getState) => {
    const {
      authInfo: { username },
    } = getState();
    dispatch(fetchContactsRequest());
    contactsService
      .contactsRequest(username)
      .then((data) => {
        dispatch(fetchContactsSuccess(data));
      })
      .catch(() => {
        dispatch(fetchContactsFailed());
      });
  };
};

const userLogoutHandle = () => ({
  type: 'USER_LOGOUT_HANDLE',
});

const addContactRequest = (data) => ({
  type: 'ADD_CONTACT_REQUEST',
  payload: data,
});

const addContactSuccess = () => ({
  type: 'ADD_CONTACT_SUCCESS',
});

const addContactFailed = () => ({
  type: 'ADD_CONTACT_FAILED',
});

const addContactHandle = (contact, contactsService) => {
  return (dispatch, getState) => {
    const owner = getState().authInfo.username;
    contact.owner = owner;
    dispatch(addContactRequest(contact));
    contactsService
      .addContact(contact)
      .then((data) => {
        dispatch(addContactSuccess());
        dispatch(updateContacts(data));
      })
      .catch(() => {
        dispatch(addContactFailed());
      });
  };
};

const deleteContactRequest = (id) => ({
  type: 'DELETE_CONTACT_REQUEST',
  payload: id,
});

const deleteContactSuccess = () => ({
  type: 'DELETE_CONTACT_SUCCESS',
});

const deleteContactFailed = () => ({
  type: 'DELETE_CONTACT_FAILED',
});

const deleteContactHandle = (contact, contactsService) => {
  return (dispatch) => {
    dispatch(deleteContactRequest(contact));
    contactsService.removeContact(contact.id).then((answer) => {
      if (answer) {
        dispatch(deleteContactSuccess());
        dispatch(updateContacts(contact));
      } else {
        dispatch(deleteContactFailed());
      }
    });
  };
};

const filterContactsHandle = (string) => ({
  type: 'FILTER_CONTACTS_HANDLE',
  payload: string,
});

const editContactHandle = (contact) => ({
  type: 'EDIT_CONTACT_HANDLE',
  payload: contact,
});

const editContactSuccess = () => ({
  type: 'EDIT_CONTACT_SUCCESS',
});

const editContactIsFetching = () => ({
  type: 'EDIT_CONTACT_IS_FETCHING',
});

const fetchEditContactRequest = (contact, contactsService) => {
  return (dispatch, getState) => {
    const oldContact = getState().contact.editContact;
    dispatch(editContactIsFetching());
    contactsService.editContact(contact).then((res) => {
      if (res) {
        dispatch(editContactSuccess());
        dispatch(editContact({ old: oldContact, newOne: contact }));
      }
    });
  };
};

const editContactCanceled = () => ({
  type: 'EDIT_CONTACT_CANCELED',
});

const updateContacts = (data) => ({
  type: 'UPDATE_CONTACTS',
  payload: data,
});

const editContact = ({ old, newOne }) => ({
  type: 'EDIT_CONTACT',
  payload: {
    old,
    newOne,
  },
});

export {
  saveUsername,
  fetchUserAuth,
  userLogoutHandle,
  fetchContacts,
  addContactHandle,
  deleteContactHandle,
  filterContactsHandle,
  fetchEditContactRequest,
  editContactHandle,
  editContactCanceled,
};

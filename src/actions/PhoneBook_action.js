import { ADD_CONTACT_BE_FAILED, ADD_CONTACT_BE_SUCCESS, ADD_CONTACT_FE, DELETE_CONTACT_FAILED, DELETE_CONTACT_SUCCESS, LOAD_CONTACT_FAILED, LOAD_CONTACT_REQUEST, LOAD_CONTACT_SUCCESS, LOAD_MORE_FAILED, LOAD_MORE_SUCCESS, RESEND_CONTACT_FAILED, RESEND_CONTACT_SUCCESS, SEARCH_CONTACT_RESET_QUERY, SEARCH_CONTACT_SUCCESS, UPDATE_CONTACT_FAILED, UPDATE_CONTACT_SUCCESS } from "./actionType";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3039/",
  timout: 1000,
  headers: { Authorization: "token" },
});

// LOAD CONTACT
const loadContactRequest = () => ({
  type: LOAD_CONTACT_REQUEST,
});

const loadContactSuccess = (data, query) => ({
  type: LOAD_CONTACT_SUCCESS,
  data,
  query
});

const loadContactFailed = (error) => ({
  type: LOAD_CONTACT_FAILED,
  data: error,
});

export const loadContact = (query = {}) => async (dispatch, getState) => {
  // console.log(`OP:${LOAD_CONTACT} getState`, getState());
  const state = getState(); //.phoneBook;
  try {
    dispatch(loadContactRequest());
    const fetching = await request.get("/api/phonebooks", {
      params: state.params,
    });
    const response = fetching.data;
    // console.log(`OP:${LOAD_CONTACT} response`, response);
    dispatch(loadContactSuccess(response, query));
  } catch (error) {
    dispatch(loadContactFailed(error));
  }
};

const loadMoreSuccess = () => ({
  type: LOAD_MORE_SUCCESS,
});

const loadMoreFailed = (err) => ({
  type: LOAD_MORE_FAILED,
  err
});

export const loadMore = () => async (dispatch, getState) => {
  const state = getState(); //.phoneBook;
  try {
    if (state.params.page < state.params.pages) {
      await dispatch(loadMoreSuccess());
      dispatch(loadContact());
    }
  } catch (error) {
    dispatch(loadMoreFailed(error));
  }
};

/* BREAD */
//. Add Actions
const addContactFE = (data) => ({
  type: ADD_CONTACT_FE,
  data,
});

const addContactBESuccess = ({ contact, data }) => ({
  type: ADD_CONTACT_BE_SUCCESS,
  data: contact,
  updated: data,
});

const addContactBEFailed = (data, error) => ({
  type: ADD_CONTACT_BE_FAILED,
  data,
  error,
});

export const addContact = (name, phone) => async (dispatch, getState) => {
  const state = getState()
  const id = Date.now();
  const newContact = {
    id,
    name,
    phone,
    sent: true,
  };
  try {
    if (!state.params.name && !state.params.phone) {
      await dispatch(addContactFE(newContact));
    }

    const fetching = await request.post("/api/phonebooks", {
      name,
      phone,
    });
    const response = fetching.data;
    if (response.success && (!state.params.name && !state.params.phone)) {
      dispatch(addContactBESuccess({ contact: newContact, data: response.data }));
    }
  } catch (error) {
    dispatch(addContactBEFailed(newContact, error));
  }
};

//. Resend Actions

const resendContactSuccess = (data, id) => ({
  type: RESEND_CONTACT_SUCCESS,
  data,
  id,
});

const resendContactFailed = (error) => ({
  type: RESEND_CONTACT_FAILED,
  error,
});

export const resendContact =
  ({ id, name, phone }) =>
  async (dispatch) => {
    try {
      const fetching = await request.post("/api/phonebooks", { name, phone });

      const response = fetching.data;

      if (response.success) {
        dispatch(resendContactSuccess(response.data, id));
      }
    } catch (error) {
      dispatch(resendContactFailed(error));
    }
  };

//. Delete Actions
const deleteContactSuccess = (id) => ({
  type: DELETE_CONTACT_SUCCESS,
  id,
});

const deleteContactFailed = (error) => ({
  type: DELETE_CONTACT_FAILED,
  error,
});

export const deleteContact = (id) => async (dispatch) => {
  try {
    const fetching = await request.delete(`/api/phonebooks/${id}`);

    const response = fetching.data;

    if (response.success) {
      dispatch(deleteContactSuccess(id));
    }
  } catch (error) {
    dispatch(deleteContactFailed(error));
  }
};

//. Update Actions
const updateContactSuccess = (data, id) => ({
  type: UPDATE_CONTACT_SUCCESS,
  data,
  id,
});

const updateContactFailed = (error) => ({
  type: UPDATE_CONTACT_FAILED,
  error,
});

export const updateContact =
  ({ id, name, phone }) =>
  async (dispatch) => {
    try {
      const fetching = await request.put(`/api/phonebooks/${id}`, {
        name,
        phone,
      });

      const response = fetching.data;

      if (response.success) {
        dispatch(updateContactSuccess(response.data, id));
      }
    } catch (error) {
      dispatch(updateContactFailed(error));
    }
  };

//. Search Actions

const searchContactSuccess = (query = {}) => ({
  type: SEARCH_CONTACT_SUCCESS,
  query,
});

export const searchContact =
  (query = {}) =>
  async (dispatch) => {
    await dispatch(searchContactSuccess(query));
    dispatch(loadContact(query));
  };

const searchResetQuery = () => ({
  type: SEARCH_CONTACT_RESET_QUERY,
})

export const searchReset = () => async dispatch => {
  await dispatch(searchResetQuery())
  dispatch(loadContact())
}
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData, addData, deleteData, updateData } from "./contactAPI";

//. Initial State

const initialState = {
  contacts: [],
  params: {
    page: 1,
    pages: 1,
  },
  info: {
    result: 0,
  },
};

//. Load Thunks

export const loadContact = createAsyncThunk("contact/loadContact", async (arg = { query: {} }, { getState, rejectWithValue }) => {
  const state = getState().contact;
  try {
    const fetching = await fetchData(state.params, arg.query);
    const response = fetching.data;
    if (response.success) {
      return { data: response.data, query: { ...arg.query } };
    } else {
      return null;
    }
  } catch ({ name, message, code, config, request }) {
    console.log(`${name}: ${message} occured.`);
    return rejectWithValue(null);
  }
});

export const addContact = createAsyncThunk("contact/addContact", async (arg, { dispatch, getState, rejectWithValue }) => {
  const state = getState().contact;
  const id = Date.now();
  const newContact = {
    id,
    ...arg,
    sent: true,
  };
  try {
    //. add new contact to the front end
    if (!state.params.name && !state.params.phone) {
      await dispatch(addtoFE(newContact));
    }
    //. request post data to the server
    const fetching = await addData({ ...arg });
    const response = fetching.data;
    //. updating new data property
    if (response.success && !state.params.name && !state.params.phone) {
      return { data: newContact, update: response.data };
    } else {
      return null;
    }
  } catch ({ name, message, code, config, request }) {
    console.log(`${name}: ${message} occured.`);
    return rejectWithValue({ ...newContact });
  }
});

export const deleteContact = createAsyncThunk("contact/deleteContact", async (arg, { rejectWithValue }) => {
  try {
    const fetching = await deleteData({ ...arg });
    const response = fetching.data;
    if (response.success && response.data > 0) {
      return { ...arg };
    } else {
      return null
    }
  } catch ({ name, message, code, config, request }) {
    console.log(`${name}: ${message} occured.`);
    return rejectWithValue(null);
  }
});

export const updateContact = createAsyncThunk("contact/updateContact", async (arg, { rejectWithValue }) => {
  try {
    const fetching = await updateData({ ...arg });
    const response = fetching.data;
    if (response.success) {
      return response.data;
    } else {
      return null;
    }
  } catch ({ name, message, code, config, request }) {
    console.log(`${name}: ${message} occured.`);
    return rejectWithValue(null);
  }
});

export const resendContact = createAsyncThunk("contact/resendContact", async (arg, { rejectWithValue }) => {
  try {
    const fetching = await addData({ ...arg });
    const response = fetching.data;
    if (response.success) {
      return { data: { ...arg }, update: response.data };
    } else {
      return null;
    }
  } catch ({ name, message, code, config, request }) {
    console.log(`${name}: ${message} occured.`);
    return rejectWithValue(null);
  }
});

//. Reducers

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addpage: (state) => {
      state.params.page += 1;
    },
    resetquery: (state) => {
      state.params.name = "";
      state.params.phone = "";
      state.params.page = 1;
    },
    addtoFE: (state, action) => {
      state.contacts.unshift({
        id: action.payload.id,
        name: action.payload.name,
        phone: action.payload.phone,
        sent: action.payload.sent,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContact.fulfilled, (state, action) => {
        if (action.payload !== null) {
          const response = action.payload;
          state.params = {
            page: response.data.page,
            pages: response.data.pages,
            name: response.query.name ? response.query.name : "",
            phone: response.query.phone ? response.query.phone : "",
            mode: response.query.mode ? response.query.mode : "and",
          };
          state.contacts = [
            ...(state.params.page === 1 ? [] : state.contacts),
            ...response.data.contacts.map((item) => {
              item.sent = true;
              return item;
            }),
          ];
          state.info = {
            result: response.data.rowCount,
          };
        }
      })
      .addCase(addContact.fulfilled, (state, action) => {
        console.log("fulfilled: add thunk fulfilled", action);
        if (action.payload !== null) {
          state.contacts = state.contacts.map((item) => {
            if (item.id === action.payload.data.id) {
              item.id = action.payload.update.id;
              item.sent = true;
            }
            return item;
          });
        }
      })
      .addCase(addContact.rejected, (state, action) => {
        console.log("rejected: add thunk rejected", action);
        state.contacts = state.contacts.map((item) => {
          if (item.id === action.payload.id) {
            item.sent = false;
          }
          return item;
        });
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        console.log("rejected: saat mau mendelete contact", action);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.contacts = state.contacts.map((item) => {
            if (item.id === action.payload.id) {
              return {
                id: action.payload.id,
                name: action.payload.name,
                phone: action.payload.phone,
                sent: true,
              };
            }
            return item;
          });
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        console.log("rejected: saat mau mengupdate contact", action);
      })
      .addCase(resendContact.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.contacts = state.contacts.map((item) => {
            if (item.id === action.payload.data.id) {
              return {
                ...action.payload.update,
                id: action.payload.update.id,
                sent: true,
              };
            }
            return item;
          });
        }
      })
      .addCase(resendContact.rejected, (state, action) => {
        console.log("rejected: saat mau mengupdate contact", action);
      });
  },
});

const { addpage, resetquery, addtoFE } = contactSlice.actions;

//. Thunks

export const loadMore = () => async (dispatch, getState) => {
  const state = getState().contact;
    if (state.params.page < state.params.pages) {
      await dispatch(addpage());
      dispatch(loadContact());
    }
}

export const searchContact = (query) => async (dispatch) => {
  await dispatch(resetquery());
  dispatch(loadContact({ query }));
};

export const resetQuery = () => async (dispatch) => {
  await dispatch(resetquery());
  dispatch(loadContact());
};

export default contactSlice.reducer;

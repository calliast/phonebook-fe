import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl, tags } from "../constant";

const request = axios.create({
  baseURL: "http://localhost:3039/",
  timout: 1000,
  headers: {
    Authorization: "token",
  },
});

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
});

export const mockLazy = (value) => {
  return new Promise((resolve) => setTimeout(resolve, value));
};

export const contactAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: [tags.contact],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllContact: builder.query({
        query: ({ page } = { page: 1 }) => ({ url: `/contact/get-all-contacts/`, params: { page } }),
        transformResponse: (response) => response.data,
      }),
      addContact: builder.mutation({
        query: (data) => ({
          url: `/contact/add-contact`,
          method: "POST"
        })
      })
    }),
    overrideExisting: false,
  });

//. load contact
export const fetchData = (params, query = {}) =>
  request.get("/api/phonebooks", {
    params: { ...params, ...query },
  });

//. add contact
export const addData = ({ name, phone }) => request.post("/api/phonebooks", { name, phone });

//. update contact
export const updateData = ({ id, name, phone }) => request.put(`/api/phonebooks/${id}`, { name, phone });

//. delete contact
export const deleteData = ({ id }) => request.delete(`/api/phonebooks/${id}`);

export const { useGetAllContactQuery } = contactAPI;

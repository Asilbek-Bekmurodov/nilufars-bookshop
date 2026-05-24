import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookshop-u08d.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Book", "Author", "CurrentUser"],
  endpoints: (builder) => ({
    // --- AUTH & CURRENT USER ---
    login: builder.mutation({
      query: (data) => ({ url: "/auth/login", method: "POST", body: data }),
      invalidatesTags: ["CurrentUser"],
    }),
    register: builder.mutation({
      query: (data) => ({ url: "/auth/register", method: "POST", body: data }),
    }),
    getCurrentUser: builder.query({
      query: () => "/users/me",
      providesTags: ["CurrentUser"],
    }),
    updateCurrentUser: builder.mutation({
      query: (data) => ({ url: "/users/me", method: "PUT", body: data }),
      invalidatesTags: ["CurrentUser"],
    }),

    // --- USERS MANAGEMENT ---
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (data) => ({ url: "/users", method: "POST", body: data }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),

    // --- AUTHORS MANAGEMENT ---
    getAuthors: builder.query({
      query: () => "/authors", // Agar hamma mualliflar ro'yxati kerak bo'lsa
      providesTags: ["Author"],
    }),
    updateAuthor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/authors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Author"],
    }),
    deleteAuthor: builder.mutation({
      query: (id) => ({ url: `/authors/${id}`, method: "DELETE" }),
      invalidatesTags: ["Author"],
    }),

    getBooks: builder.query({
      query: (limit = 1677) => `/books?limit=${limit}`,
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    addBook: builder.mutation({
      query: (data) => ({ url: "/books", method: "POST", body: data }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Book"],
    }),
    uploadBookPdf: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/books/${id}/upload-pdf`,
        method: "POST",
        body: formData, // FormData formatida yuboriladi
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAuthorsQuery,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUploadBookPdfMutation,
} = authApi;

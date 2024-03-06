import { createApi,} from '@reduxjs/toolkit/query/react';
//import { useDispatch } from 'react-redux';
import { LOGIN_MUTATION, } from '@/Api/LoginMutation';
import baseQueryWithReauth from './ReAuth';
import { REGENERATE_TOKEN } from '@/Api/RegenerateToken';
import { LIST_CENTERUSERS } from '@/Api/CenterUserQuery';

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: "",
          method: "POST",
          body: {
            query: LOGIN_MUTATION.query,
            variables: {
              email,
              password,
            },
          },
        };
      },
    }),
    regenerateAccessToken: builder.mutation({
      query: ({ token }) => {
        return {
          url: "",
          method: "POST",
          body: {
            query: REGENERATE_TOKEN.query,
            variables: {
              token,
            },
          },
        };
      },
    }),
    listCenterUsers: builder.query({
      query: (options) => {
        const {
          limit,
          page,
          center_id,
          search_string,
          is_active,
          add_super_admin,
        } = options;
        return {
          url: "", // Your API URL
          method: "POST",
          body: {
            query: LIST_CENTERUSERS.query,
            variables: {
              limit,
              page,
              center_id,
              search_string,
              is_active,
              add_super_admin,
            },
          },
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useRegenerateAccessTokenMutation,
  useListCenterUsersQuery,
} = usersApi;
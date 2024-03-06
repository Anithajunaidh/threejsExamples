import { usersApi } from "./ApiSlice";

export const searchSlice = usersApi.injectEndpoints({
  endpoints: (builder) => ({
    searchItems: builder.query({
      query: (searchParams) => ({
        url: " ",
        method: 'POST',
        body: {      
          query: searchParams.queryVariable,
          variables: searchParams.variables,
        },
      }),
    },
    ),
    // ... other endpoints
  }),
});
export const useSearchItemsQuery = searchSlice.endpoints.searchItems.useQuery; 





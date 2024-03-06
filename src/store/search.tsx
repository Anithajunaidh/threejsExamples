import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { usersApi } from './ApiSlice';
import { RootState } from './store';
import { LIST_CENTERUSERS } from '@/Api/CenterUserQuery';

export interface SearchSliceState {
  data: ''; // Define the data structure for your search results
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null; // You can add an error field to store any errors that occur
}

const initialState: SearchSliceState = {
  data: '',
  loading: 'idle',
  error: null,
};

// export const searchUsers = createAsyncThunk(
//   'search/searchUsers',
//   async (searchParams: { searchString: string, limit: number, page: number, isActive: boolean, addSuperAdmin: boolean }, { rejectWithValue }) => {
//     try {
//       const response = await usersApi.endpoints.listCenterUsers.query(searchParams); // Modify this to send your GraphQL query
//       return response.data.listCenterUsers.listUsers;
//     } catch (error) {
//       return rejectWithValue('An error occurred while searching for users.');
//     }
//   }
// );
export const searchUsers = createAsyncThunk(
  'search/searchUsers',
  async (searchParams: { searchString: string, limit: number, page: number, isActive: boolean, addSuperAdmin: boolean }, { rejectWithValue }) => {
    try {
      const query = LIST_CENTERUSERS.query; 
      const graphqlRequest = {
        query: query,
        variables:{
          search_string: searchParams.searchString, // Pass the searchString variable
          limit: searchParams.limit,
          page: searchParams.page,
          isActive: searchParams.isActive,
          addSuperAdmin: searchParams.addSuperAdmin,
        }, // Pass your search parameters as variables
      };
      // const queryParams = new URLSearchParams(searchParams);
      const url = `https://ngobackv.caprover2.innogenio.com/graphql`;
      const persistedUserData = await localStorage.getItem('persist:user');
      const userData = JSON.parse(persistedUserData);
      const accessToken =JSON.parse(userData.accessToken)
      if (!accessToken) {
        // Handle the case when the access token is missing
        throw new Error('Access token is missing');
      }

      // Include the access token in the headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(graphqlRequest),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the response as JSON
      return data.data.listCenterUsers.listUsers; // Modify this according to your API response structure
    } catch (error) {
      return rejectWithValue('An error occurred while searching for users.');
    }
  }
);
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
export const selectSearchData = (state: RootState) => state.search.data;



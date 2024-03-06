import {fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState} from '@/store/store';

const baseQuery = fetchBaseQuery({
  baseUrl:"https://ngoback-qa.caprover3.innogenio.com/graphql", 
  prepareHeaders: (headers, { getState }) => {
  headers.set('Content-Type', 'application/json');
  const accessToken = (getState() as RootState).user.accessToken;
  if (accessToken) {
  headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return headers;
},
});

export default baseQuery;
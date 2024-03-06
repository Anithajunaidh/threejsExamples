import { FetchArgs, BaseQueryApi} from '@reduxjs/toolkit/query';
import baseQuery from '../store/BaseQuery';
import localStorage from 'redux-persist/es/storage';
// import { REGENERATE_TOKEN } from '@/Api/RegenerateToken';
//import graphqlEndpoint from 'next.config.mjs'

const RegenerateAccessToken = async (currentAccessToken:string) => {
  console.log(currentAccessToken)
  const graphqlEndpoint='https://ngobackv.caprover2.innogenio.com/graphql'
  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify({
         query: `
          mutation generateAccessTokenFromToken(
          $token: String!
          ){
          generateAccessTokenFromToken(
          token: $token
          )
      }
    `,
        variables: {
          token: currentAccessToken,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const responseData = await response.json();
    if (responseData.errors) {
      throw new Error(`Mutation failed: ${JSON.stringify(responseData.errors)}`);
    }
    // Access the newly generated access token from the response data
    const newAccessToken = responseData.data.generateAccessTokenFromToken;
    // Store the new access token or do whatever you need to with it
    // For example, update it in your local storage
    return newAccessToken;
  } catch (error) {
    console.error('Error: Token regeneration failed:', error);
    return null;
  }
};

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.data && Array.isArray(result.data.errors) && result.data.errors[0]?.code === 122) {
    try {
      const persistedUserData = await localStorage.getItem('persist:user');
      if (persistedUserData) {
        const userData = JSON.parse(persistedUserData);
       // const currentAccessToken = userData.accessToken.replace(/^"|"$/g, '');
        const currentAccessToken =JSON.parse(userData.accessToken)

        console.log(currentAccessToken)
        if (currentAccessToken) {
          try {
            // const newAccessToken = await useRegenerateAccessTokenMutation();
            const newAccessToken = await RegenerateAccessToken(currentAccessToken); 
            if (newAccessToken) {
              localStorage.setItem('accessToken', newAccessToken);
              return await baseQuery(args, api, extraOptions);
            } else {
              console.error('Token regeneration failed.');
            }
          } catch (error) {
            console.error('Error: Token regeneration failed:', error);
          }
        } else {
          console.error('No current access token found.');
        }
      } else {
        console.error('No data found under the key "persistor:user"');
      }
    } catch (error) {
      console.error('Error retrieving persisted user data:', error);
    }
  }
  return result;
};

export default baseQueryWithReauth;


'use client'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from '@/store/store';
import { Provider } from 'react-redux';
// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
// import { usersApi } from './ApiSlice';


const ReduxProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <Provider store={store}>
      {/* <ApiProvider api={usersApi}> */}
       <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
      {/* </ApiProvider> */}
    </Provider>
  )
}

export default ReduxProvider

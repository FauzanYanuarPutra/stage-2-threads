import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Replies from './page/Replies/index.tsx'
import App, { privateData } from './App.tsx'
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './store/RootReducer.ts';
import { Provider } from 'react-redux';
import LoginPage from './page/Auth/Login/index.tsx';
import RegisterPage, { publicData } from './page/Auth/Register/index.tsx';
import FollowPage from './page/Follow/index.tsx';

const theme = extendBaseTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBackground',
        color: 'white',
      },
    },
  },
  colors: {
    darkBackground: '#1D1D1D'
  }
})
const store = configureStore({
  reducer: RootReducer
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: privateData,
  },
  {
    path: "replies/:id",
    element: <Replies />,
    loader: privateData,
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: publicData,
  },
  {
    path: "register",
    element: <RegisterPage />,
    loader: publicData,
  },
  {
    path: "follows",
    element: <FollowPage />,
    loader: privateData,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <ChakraProvider theme={theme}>
      <Provider store={store}>  
        <RouterProvider router={router}  />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)


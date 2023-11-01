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
import SearchPage from './page/search/index.tsx';
import { PrivateRoute, PublicRoute } from './root/PrivateRoute.tsx';
import ProfilePage from './page/profile/index.tsx';

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
    element: <PrivateRoute />, 
    loader: privateData,
    children: [
      {
        index: true,
        element: <App />,
        loader: privateData,
      },
    ],
  },
  {
    path: "replies/:id",
    element: <PrivateRoute />, 
    loader: privateData,
    children: [
      {
        index: true,
        element: <Replies />,
        loader: privateData,
      },
    ],
  },
  
  {
    path: "login",
    element: <PublicRoute />, 
    loader: publicData,
    children: [
      {
        index: true,
        element: <LoginPage />,
        loader: publicData,
      },
    ],
  },
  {
    path: "register",
    element: <PublicRoute />, 
    loader: publicData,
    children: [
      {
        index: true,
        element: <RegisterPage />,
        loader: privateData,
      },
    ],
  },
  {
    path: "follows",
    element: <PrivateRoute />, 
    loader: privateData,
    children: [
      {
        index: true,
        element: <FollowPage />,
        loader: privateData,
      },
    ],
  },
  {
    path: "profile",
    element: <PrivateRoute />, 
    loader: privateData,
    children: [
      {
        index: true,
        element: <ProfilePage />,
        loader: privateData,
      },
    ],
  },
  {
    path: "search",
    element: <PrivateRoute />, 
    loader: privateData,
    children: [
      {
        index: true,
        element: <SearchPage />,
        loader: privateData,
      },
    ],
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



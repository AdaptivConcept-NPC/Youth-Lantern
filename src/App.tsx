// import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

// import the main layout
import MainLayout from './layouts/MainLayout';

// import the page components
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage';
import CommunityMarket from './pages/CommunityMarket';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/market' element={<CommunityMarket />} />
      {/* use '*' for any path that cannot be found */}
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App
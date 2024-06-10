// import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

// import the main layout
import MainLayout from './layouts/MainLayout';

// import the page components
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage';
import CommunityMarket from './pages/CommunityMarket';
import NotFoundPage from './pages/NotFoundPage';
import JobPage from './pages/JobPage'; // , {jobLoader}
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

type CompanyType = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
};

type JobType = {
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: CompanyType;
};

type JobTypeId = {
  id: string;
};

const App = () => {
  // function to create a new job from form submission
  const addJob = async (newJob: JobType) => {
    const res = await fetch("/json_api/jobs", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });

    return res.json();
  }

  // function to delete a job
  const deleteJob = async (id: string) => {
    const res = await fetch(`/json_api/jobs/${id}`, {
      method: 'DELETE'
    });

    return res.json();
  }

  // function to edit / update a job
  const updateJob = async (job: JobTypeId & JobType, jobId: string) => {
    const res = await fetch(`/json_api/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });

    return res.json();
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/jobs/edit/:id' element={<EditJobPage updateJobSubmit={updateJob} />} />
        <Route path='/market' element={<CommunityMarket />} />
        {/* use '*' for any path that cannot be found */}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
// import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeCards from './components/HomeCards'
import JobListing from './components/JobListing'
import ViewAllJobs from './components/ViewAllJobs'

const App = () => {
  return (
    <>
      <body>
        {/* <!-- Navbar --> */}
        <Navbar />

        {/* <!-- Hero --> */}
        <Hero title='🔥Ignite your Future!' subtitle='Where Ambition Meets Opportunity' />

        {/* <!-- Home Cards --> */}
        <HomeCards />

        {/* <!-- Browse Jobs --> */}
        <JobListing />

        {/* view all jobs */}
        <ViewAllJobs />
      </body>
    </>
  )
}

export default App
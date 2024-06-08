// import React from 'react'

import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import JobListing from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'

const HomePage = () => {
    return (
        <>
            {/* <!-- Hero --> */}
            <Hero title='🔥Ignite your Future!' subtitle='Where Ambition Meets Opportunity' />

            {/* <!-- Home Cards --> */}
            <HomeCards />

            {/* <!-- Browse Jobs --> */}
            <JobListing isHome={true} />

            {/* view all jobs */}
            <ViewAllJobs />
        </>
    )
}

export default HomePage
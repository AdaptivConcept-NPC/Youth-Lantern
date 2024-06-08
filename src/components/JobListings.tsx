// import React from 'react'
import jobs from '../jobs.json'
import JobListing from './JobListing';

const JobListings = ({ isHome = false }: { isHome: boolean }) => {
    // console.log(jobs) // debug

    // limit the latest / recent jobs to three (3)
    const jobListings = isHome ? jobs.jobs.slice(0, 3) : jobs.jobs;

    // infare the object types of each job parameter in the job list
    interface JobParamTypes {
        type: string;
        title: string;
        description: string;
        salary: string;
        location: string;
    }

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? "Latest Jobs" : "Browse Jobs"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobListings.map((jobs: JobParamTypes, key: number) => (
                        <JobListing key={key} job={jobs} />
                    ))}

                </div>
            </div>
        </section>
    )
}

export default JobListings
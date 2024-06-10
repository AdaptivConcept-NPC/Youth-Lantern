import { useState, useEffect } from 'react'
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }: { isHome: boolean }) => {
    // console.log(jobs) // debug

    // init states of the jobs and loading objects
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
        useEffect is a hook in React that allows you to perform side effects in function components. Side effects are basically anything that interacts with the world outside of the function scope. This could be data fetching, subscriptions, timers, manually changing the DOM, and so on.

        useEffect takes two arguments:

        1. A function where you put the side effect code.
        2. An optional dependency array.

        The function passed to useEffect will run after the render is committed to the screen. If you pass an empty array ([]) as the second argument, it means "run once after the initial render, and don't run again". If you pass no second argument, it means "run after every render". If you pass some variables inside the array, it means "run after the initial render and whenever any of these variables change".
    */
    useEffect(() => {
        // fecth jobs from json server via an async await function
        const fetchJobs = async () => {
            // fetch jobs limited to 3 if isHome is true
            // `/json_api` is used as a proxy defined in the vite configuration file
            const apiUrl = isHome ? '/json_api/jobs?_limit=3' : '/json_api/jobs';
            try {
                // try to fetch jobs from json server
                const res = await fetch(apiUrl);
                const data = await res.json();
                // update the state of the jobs state object
                setJobs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // update the state of the loading object
                setLoading(false);
            }
        };

        // Invoke / Call the fetchJobs function
        fetchJobs();
    }, [isHome]);

    // *** deprecate in favor of url limit parameter
    // limit the latest / recent jobs to three (3) if isHome is true, else pass all jobs to jobListings
    // const jobListings = isHome ? jobs.slice(0, 3) : jobs;

    // infare the object types of each job parameter in the job list
    interface JobParamTypes {
        id: number;
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
                {loading ?
                    (
                        // Show loading indicator
                        <Spinner loading={loading} />
                    ) :
                    (
                        /* generate the jobs list */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {jobs.map((job: JobParamTypes) => (
                                <JobListing key={job.id} job={job} />
                            ))}
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default JobListings
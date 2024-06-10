import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // , useLoaderData
import Spinner from '../components/Spinner';
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
// import to use toast messages
import { toast } from 'react-toastify';

const JobPage = ({deleteJob}: {deleteJob: (jobId: string) => void}) => {
    // destructure to get the id of the job from the url
    const { id } = useParams();
    // const job = jobLoader(id)
    // const job = useLoaderData();

    const navigate = useNavigate();

    // *** Option 1: use useState and useEffect Hooks
    // init the state of the job and loader
    // infare the object types of each job parameter in the job list
    type JobParamTypes = {
        id: number;
        type: string;
        title: string;
        description: string;
        salary: string;
        location: string;
        company: CompanyTypes;
    }
    type CompanyTypes = {
        name: string;
        description: string;
        contactEmail: string;
        contactPhone: string;
    };
    const [job, setJob] = useState<JobParamTypes | null>(null); /*This tells TypeScript that job can be either null or an object of type Job.*/
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/json_api/jobs/${id}`);
                const data = await res.json();
                // update the state of job with the data
                setJob(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // update the state of the loading object
                setLoading(false);
            }
        }

        // invoke / call the fetchJob method
        fetchJob();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDeleteClick = ({jobId}: {jobId: string}) => {
        const confirm = window.confirm('Are you sure you want to delete this job listing?');

        if(!confirm) return;

        deleteJob(jobId);

        toast.success('Job deleted successfully')

        navigate('/jobs');
    }

    // Option 1 return:
    // optional chaining: With optional chaining (?.), if job is null or undefined, it will stop the evaluation and return undefined. This prevents the error from occurring because you're not trying to access a property on null or undefined.
    return (
        loading ?
            <Spinner loading={true} /> :
            <>

                <section>
                    <div className="container m-auto py-6 px-6">
                        <Link
                            to="/jobs"
                            className="text-indigo-500 hover:text-indigo-600 flex items-center">
                            <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Job Listings
                        </Link>
                    </div>
                </section>

                <section className="bg-indigo-50">
                    <div className="container m-auto py-10 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                            <main>
                                <div
                                    className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                                >
                                    <div className="text-gray-500 mb-4">{job?.type}</div>
                                    <h1 className="text-3xl font-bold mb-4">
                                        {job?.title}
                                    </h1>
                                    <div
                                        className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                        <FaLocationDot
                                            className="text-lg text-orange-700 mr-2"
                                        ></FaLocationDot>
                                        <p className="text-orange-700">{job?.location}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                                        Job Description
                                    </h3>

                                    <p className="mb-4">
                                        {job?.description}
                                    </p>

                                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                                    <p className="mb-4">{job?.salary} / Year</p>
                                </div>
                            </main>

                            {/* <!-- Sidebar --> */}
                            <aside>
                                {/* <!-- Company Info --> */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold mb-6">Company Info</h3>

                                    <h2 className="text-2xl">{job?.company.name}</h2>

                                    <p className="my-2">
                                        {job?.company.description}
                                    </p>

                                    <hr className="my-4" />

                                    <h3 className="text-xl">Contact Email:</h3>

                                    <p className="my-2 bg-indigo-100 p-2 font-bold">
                                        {job?.company.contactEmail}
                                    </p>

                                    <h3 className="text-xl">Contact Phone:</h3>

                                    <p className="my-2 bg-indigo-100 p-2 font-bold">{job?.company.contactPhone}</p>
                                </div>

                                {/* <!-- Manage --> */}
                                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                    <Link
                                        to={`/jobs/edit/${job?.id}`}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >Edit Job</Link>
                                    <button
                                        onClick={() => {
                                            if (job?.id !== undefined) {
                                                onDeleteClick({ jobId: String(job.id) });
                                            } else {
                                                // handle the case when job or job.id is undefined
                                                console.error('Job or job.id is undefined');
                                                alert('Error: Job or job.id is undefined');
                                            }
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >
                                        Delete Job
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </>
    )

    // Option 2 return:
    /* return (
        <h1>{job.title}</h1>
    ) */
};

// *** Option 2: use data loader method
// Data loader is a method that loads data via the react router
/* interface Params {
    id: string;
  }
const jobLoader = async (params: Params) => {
    console.log(`Loading ${params.id}`);
    const res = await fetch(`/json_api/jobs/${params.id}`);
    const data = await res.json();
    return data
} 
export { JobPage as default , jobLoader };
*/

export default JobPage;
import toast from "react-hot-toast";

const JobPage = () => {
  const handleClick = (j) => {
    toast.success(`Job Apply Successful for ${j}`);
  };
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      description:
        "We are looking for a talented frontend developer skilled in React and Tailwind CSS.",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Innovative Apps",
      location: "San Francisco, CA",
      description:
        "Join our team as a backend developer to build scalable APIs using Node.js and MongoDB.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "New York, NY",
      description:
        "Seeking a creative UI/UX designer to craft intuitive and engaging user interfaces.",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-10">
      <div className="w-11/12 mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Job Openings</h1>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <p className="text-sm  mb-4">
                {job.company} - {job.location}
              </p>
              <p className="mb-4">{job.description}</p>
              <button
                onClick={() => handleClick(job.title)}
                className="inline-block px-6 py-2 mt-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobPage;

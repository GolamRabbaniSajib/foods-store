import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiSearch, FiMapPin, FiBriefcase, FiChevronDown, FiExternalLink } from "react-icons/fi";

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Food Store Inc.",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description:
      "We are looking for a talented Frontend Developer skilled in React, Next.js, and Tailwind CSS to build beautiful, high-performance user interfaces for our customer-facing platform.",
    applyLink: "/careers/apply/frontend-developer",
  },
  {
    id: 2,
    title: "Lead Backend Engineer (Node.js)",
    company: "Food Store Inc.",
    location: "Remote (Bangladesh)",
    type: "Full-time",
    description:
      "Join our team as a Backend Engineer to design, build, and maintain scalable APIs and services using Node.js, Express, and MongoDB.",
    applyLink: "/careers/apply/backend-engineer",
  },
  {
    id: 3,
    title: "Product Designer (UI/UX)",
    company: "Food Store Inc.",
    location: "Dhaka, Bangladesh",
    type: "Contract",
    description:
      "Seeking a creative Product Designer to craft intuitive and engaging user interfaces and experiences. You will conduct user research, create wireframes and prototypes.",
    applyLink: "/careers/apply/product-designer",
  },
  {
    id: 4,
    title: "Digital Marketing Manager",
    company: "Food Store Inc.",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description:
      "We are hiring a Digital Marketing Manager to lead our online presence. You will manage SEO/SEM, social media campaigns, and email marketing.",
    applyLink: "/careers/apply/marketing-manager",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- Reusable Job Card ---
const JobCard = ({ job, isExpanded, toggleExpand, handleApply }) => (
  <motion.div
    layout
    key={job.id}
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
  >
    <div className="p-6 cursor-pointer" onClick={() => toggleExpand(job.id)}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{job.title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center gap-1"><FiBriefcase /> {job.company}</span>
            <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full font-medium">{job.type}</span>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <FiChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </div>

    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          <p className="text-gray-700 dark:text-gray-300 border-t pt-4 border-gray-200 dark:border-gray-700 leading-relaxed">
            {job.description}
          </p>
          <button
            onClick={(e) => handleApply(e, job.title, job.applyLink)}
            className="inline-flex items-center gap-2 mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 ring-offset-2 ring-green-500 dark:ring-offset-gray-800"
          >
            Apply Now <FiExternalLink />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const JobPage = () => {
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const handleApply = (e, title, link) => {
    e.stopPropagation();
    toast.success(`Redirecting to apply for ${title}...`);
    console.log(`Navigating to: ${link}`);
  };

  const filteredJobs = jobs.filter((job) =>
    [job.title, job.company, job.description].some((text) =>
      text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 sm:py-24">
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Join Our Team</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            We're looking for passionate people to help us build the future of food delivery.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants} className="relative mb-10 max-w-2xl mx-auto">
          <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
        </motion.div>

        {/* Job Listings */}
        <motion.div variants={containerVariants} className="space-y-6">
          <AnimatePresence>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isExpanded={expanded === job.id}
                  toggleExpand={toggleExpand}
                  handleApply={handleApply}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">No jobs found</p>
                <p className="text-gray-500 mt-2">Try a different keyword or check back later.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default JobPage;

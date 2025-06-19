import { motion } from "framer-motion";
import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

// Step data
const steps = [
  {
    id: 1,
    title: "Choose Location",
    icon: <FaLocationPinLock />,
    description: "Enter your address to see restaurants near you.",
  },
  {
    id: 2,
    title: "Select Restaurant",
    icon: <MdOutlineRestaurant />,
    description: "Browse through our curated list of top eateries.",
  },
  {
    id: 3,
    title: "Make Your Order",
    icon: <IoFastFoodOutline />,
    description: "Pick your desired dishes and customize them.",
  },
  {
    id: 4,
    title: "Fast Delivery",
    icon: <TbTruckDelivery />,
    description: "Your freshly prepared meal is on its way to you.",
  },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Work = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 sm:py-24">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Get Your Food in 4 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Ordering has never been easier.
          </p>
        </motion.div>

        {/* Steps with animation */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connecting Line for large screens */}
          <div className=" lg:block absolute inset-0 flex items-center justify-between z-0 pointer-events-none" aria-hidden="true">
            <svg
              className="w-full h-px stroke-current text-gray-300 dark:text-gray-600"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
              />
            </svg>
          </div>

          {/* Step Cards */}
          {steps.map(({ id, title, icon, description }) => (
            <motion.div
              key={id}
              className="relative z-10 flex flex-col items-center text-center p-6"
              variants={itemVariants}
            >
              <motion.div
                className="relative flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 border-4 border-emerald-500 rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl text-emerald-500">{icon}</div>
                <span className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white font-bold text-sm rounded-full">
                  {id}
                </span>
              </motion.div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;

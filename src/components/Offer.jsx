import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const offerImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3";

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, duration: 0.8 },
  },
};

const Offer = () => (
  <section className="w-full py-16 sm:py-20">
    <motion.div
      className="relative w-11/12 max-w-7xl mx-auto bg-gradient-to-br from-amber-500 to-red-600 text-white p-8 md:p-12 lg:p-16 rounded-3xl overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Decorative background */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text */}
        <div className="lg:w-1/2 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
          <motion.h2 className="text-sm font-bold uppercase tracking-widest text-yellow-300" variants={textVariants}>
            Limited Time Offer
          </motion.h2>
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold my-3 leading-tight" variants={textVariants}>
            Special Deals for Your Catering Events
          </motion.h1>
          <motion.p className="text-base md:text-lg text-yellow-50 mb-8" variants={textVariants}>
            From corporate lunches to wedding parties, delight your guests with our unforgettable flavors. Book now and make your event a delicious success.
          </motion.p>
          <motion.div variants={textVariants}>
            <Link to="/foods" aria-label="Order now for catering events">
              <motion.button
                className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Order Now <FiArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div className="lg:w-1/2 w-full mt-8 lg:mt-0 flex justify-center lg:justify-end" variants={imageVariants}>
          <div
            className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] bg-cover bg-center shadow-2xl rounded-lg"
            style={{
              backgroundImage: `url(${offerImage})`,
              clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
            }}
            role="img"
            aria-label="Special offer catering event"
          />
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default Offer;

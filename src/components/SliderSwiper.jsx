import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

import swiperImage from "../assets/swiperBg.avif";

const testimonials = [
  {
    text: `Interactively target efficient ideas before open-source supply chains. Conveniently fabricate state of the art channels vis-a-vis dynamic ROI.`,
    name: "Nate Wilson",
    title: "Marketing Head",
    image:
      "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=1949&auto=format&fit=crop",
  },
  {
    text: `The attention to detail and the quality of the food was exceptional. Our event was a massive success thanks to their catering service. Highly recommended!`,
    name: "Sadiya Jannat",
    title: "Event Organizer",
    image:
      "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop",
  },
  {
    text: `A truly seamless experience from order to delivery. The team is professional, and the food is always fresh and delicious. A reliable partner for all our corporate needs.`,
    name: "Rajib Mia",
    title: "Office Manager",
    image:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SliderSwiper = () => {
  return (
    <section
      aria-label="Client testimonials"
      className="relative bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${swiperImage})` }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="relative z-10 w-11/12 max-w-7xl mx-auto py-20 sm:py-24">
        {/* Header */}
        <motion.header
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Testimonials
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mt-2">
            What Our Clients Say
          </h1>
        </motion.header>

        {/* Swiper */}
        <Swiper
          spaceBetween={50}
          centeredSlides
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          modules={[Autoplay, Navigation]}
          className="w-full"
          loop
          aria-live="polite"
          pagination={false} // Disable pagination dots
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx} className="self-stretch">
              {({ isActive }) => (
                <motion.article
                  className="w-full md:w-10/12 lg:w-8/12 mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-white flex flex-col items-center justify-center text-center h-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${item.name}, ${item.title}`}
                >
                  <motion.div variants={itemVariants}>
                    <FaQuoteLeft className="text-5xl text-amber-400/50 mb-4" />
                  </motion.div>
                  <motion.p className="text-lg md:text-xl font-normal leading-relaxed flex-grow" variants={itemVariants}>
                    {item.text}
                  </motion.p>
                  <motion.div className="mt-6 flex flex-col items-center" variants={itemVariants}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md mb-3"
                      loading="lazy"
                    />
                    <h4 className="font-bold text-lg text-white">{item.name}</h4>
                    <p className="text-sm text-gray-300">{item.title}</p>
                  </motion.div>
                </motion.article>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom navigation button styles with Tailwind */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          @apply text-white bg-white/10 rounded-full w-11 h-11 flex items-center justify-center transition-colors duration-300;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          @apply bg-white/20;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 1.125rem; /* 18px */
          font-weight: 900;
        }
      `}</style>
    </section>
  );
};

export default SliderSwiper;

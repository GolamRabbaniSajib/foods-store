import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FiEye, FiDownload } from "react-icons/fi";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import foodBgImage from "../assets/allfoodbg.avif";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1484723051597-62b14d8583de?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1887&auto=format=fit&crop" },
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1887&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1887&auto=format&fit=crop" },
];

const INITIAL_VISIBLE_IMAGES = 6;

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(INITIAL_VISIBLE_IMAGES);

  const handleImageClick = (index) => {
    setImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLoadMore = () => setVisibleImages((prev) => prev + INITIAL_VISIBLE_IMAGES);

  const handleDownload = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `food-gallery-image-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
      })
      .catch(() => alert("Failed to download image."));
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>Foodie | Gallery</title>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-white px-4"
        style={{ backgroundImage: `url(${foodBgImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Our Food Gallery
          </h1>
          <p className="mt-4 text-lg text-gray-200">A Feast for Your Eyes</p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.slice(0, visibleImages).map((image, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden rounded-lg shadow-lg break-inside-avoid"
              variants={itemVariants}
              layout
            >
              <img
                src={image.src}
                alt={`Gallery item ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => handleImageClick(i)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  aria-label="View Image"
                >
                  <FiEye className="text-xl" />
                </button>
                <button
                  onClick={() => handleDownload(image.src)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  aria-label="Download Image"
                >
                  <FiDownload className="text-xl" />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleImages < galleryImages.length && (
          <div className="text-center mt-12">
            <motion.button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-amber-500 text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Load More Images"
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={galleryImages}
        index={imageIndex}
        plugins={[Fullscreen, Thumbnails, Zoom]}
        thumbnails={{ border: 0, borderRadius: 4, padding: 8, gap: 16 }}
      />
    </div>
  );
};

export default Gallery;

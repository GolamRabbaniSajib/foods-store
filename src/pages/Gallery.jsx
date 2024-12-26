import { useState } from "react";
import foodBgImage from "../assets/allfoodbg.avif";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const staticImages = [
    "https://i.ibb.co.com/GQhN61P/3.jpg",
    "https://i.ibb.co.com/rykJPZ8/4.jpg",
    "https://i.ibb.co.com/dbMsL9L/5.jpg",
    "https://i.ibb.co.com/Ttp89jN/6.jpg",
    "https://i.ibb.co.com/rfgpTrg/7.jpg",
    "https://i.ibb.co.com/zm21vqR/8avif.jpg",
    "https://i.ibb.co.com/tPy02h6/9.jpg",
    "https://i.ibb.co.com/f8dz8xs/10.jpg",
    "https://i.ibb.co.com/3SfBfyh/1.jpg",
    "https://i.ibb.co.com/022SF3Y/2.jpg0",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleView = (index) => {
    setCurrentImageIndex(index); // Set the selected image index
    setIsOpen(true); // Open the lightbox
  };
  return (
    <div>
      <Helmet>
        <title>Food | Gallery</title>
      </Helmet>
      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-green-400"
        style={{ backgroundImage: `url(${foodBgImage})` }}
      >
        {/* Overlay for dimming the background */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-4xl font-bold">GALLERY</h1>
        </div>
      </section>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {staticImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              {/* Image */}
              <img
                src={image}
                alt={"sajib"}
                className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-50"
              />

              {/* Overlay with Buttons */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                <button
                  onClick={() => handleView(index)}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={staticImages.map((image) => ({ src: image }))}
            index={currentImageIndex}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;

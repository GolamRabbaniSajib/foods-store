import foodBgImage from "../assets/allfoodbg.avif";

const Gallery = () => {
  const staticImages = [
    "https://via.placeholder.com/300?text=Image+1",
    "https://via.placeholder.com/300?text=Image+2",
    "https://via.placeholder.com/300?text=Image+3",
    "https://via.placeholder.com/300?text=Image+4",
    "https://via.placeholder.com/300?text=Image+5",
    "https://via.placeholder.com/300?text=Image+6",
    "https://via.placeholder.com/300?text=Image+7",
    "https://via.placeholder.com/300?text=Image+8",
    "https://via.placeholder.com/300?text=Image+9",
    "https://via.placeholder.com/300?text=Image+10",
  ];
  return (
    <div>
      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${foodBgImage})` }}
      >
        {/* Overlay for dimming the background */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-4xl font-bold">ALL FOODS</h1>
        </div>
      </section>
      <div>
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {staticImages.map((src, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`Static Image ${index + 1}`}
                  className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-50"
                />

                {/* Overlay with Buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
                  <button className="mb-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

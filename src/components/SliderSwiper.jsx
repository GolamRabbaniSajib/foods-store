import swiperImage from "../assets/swiperBg.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const testimonials = [
  {
    text: `Interactively target efficient ideas before open-source supply chains. 
           Conveniently fabricate state of the art channels vis-a-vis dynamic ROI.`,
    name: "Nate Wilson",
    time: "2 Days Ago",
    image:
      "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=1949&auto=format&fit=crop",
  },
  {
    text: `I was not thrilled with this recipe, the cookies did not spread while baking. 
           I won't be making them again.`,
    name: "Rajib Mia",
    time: "4 Days Ago",
    image:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop",
  },
  {
    text: `Continually architect global processes via bleeding-edge partnerships. 
           Compellingly foster growth strategies for intuitive catalysts.`,
    name: "Sadiya Jannat",
    time: "1 Day Ago",
    image:
      "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop",
  },
];

const SliderSwiper = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${swiperImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-11/12 max-w-7xl mx-auto py-20">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 drop-shadow-lg">
            Clients About Us
          </h1>
          <p className="text-white text-lg font-medium">Testimonials</p>
        </div>

        {/* Swiper Section */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full md:w-9/12 lg:w-7/12 mx-auto bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl text-white space-y-6 transition-all duration-500">
                <p className="text-center text-xl md:text-2xl font-medium leading-relaxed">
                  “{item.text}”
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-green-400 shadow-md"
                  />
                </div>
                <p className="text-center font-bold text-lg">
                  {item.name}, {item.time}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderSwiper;

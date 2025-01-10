import swiperImage from "../assets/swiperBg.avif";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import Slide from "./Slide";

const SliderSwiper = () => {
  return (
    <div
      className="object-cover"
      style={{
        backgroundImage: `url(${swiperImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" container mx-auto">
        <div className="space-y-4 text-center mb-36 pt-20">
          <h1 className="text-4xl md:text-6xl font-semibold text-white">
            Clients About Us
          </h1>
          <p>Testimonials</p>
        </div>
        <div className=" flex items-center justify-center">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="w-9/12 mx-auto space-y-8 pb-10">
                <p className="text-center text-2xl font-medium text-white">
                  Interactively target efficient ideas before open-source supply
                  chains. Conveniently fabricate state of the art channels
                  vis-a-vis dynamic ROI. Proactively productize virtual.
                </p>
                <div className="flex items-center justify-center">
                  <img
                    className="rounded-full object-cover object-center w-20 h-20"
                    src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <p className="text-center text-white font-bold text-xl">
                  Nate Wilson, 2 Days Ago
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-9/12 mx-auto space-y-8 pb-10">
                <p className="text-center text-2xl font-medium text-white">
                  I was not thrilled with this recipe, the cookies did not
                  spread while baking and it is my belief that there is not
                  enough butter in the recipe. I won't be making them again. Not
                  using this recipe.
                </p>
                <div className="flex items-center justify-center">
                  <img
                    className="rounded-full object-cover object-center w-20 h-20"
                    src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <p className="text-center text-white font-bold text-xl">
                  Rajib Mia, 4 Days Ago
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-9/12 mx-auto space-y-8 pb-10">
                <p className="text-center text-2xl font-medium text-white">
                  Continually architect global processes via bleeding-edge
                  partnerships. Phosfluorescently leverage other's client-based
                  leadership after transparent paradigms. Compellingly foster an
                  expanded array of growth strategies for intuitive catalysts.
                </p>
                <div className="flex items-center justify-center">
                  <img
                    className="rounded-full object-cover object-center w-20 h-20"
                    src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <p className="text-center text-white font-bold text-xl">
                  Sadiya Jannat, 1 Days Ago
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderSwiper;

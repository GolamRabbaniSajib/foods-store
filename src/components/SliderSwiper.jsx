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
      className="min-h-screen container"
      style={{ backgroundImage: `url(${swiperImage})` }}
    >
      <div className="space-y-4 text-center mb-36 pt-20">
        <h1 className="text-6xl font-semibold text-white">Clients About Us</h1>
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
                  className="rounded-full w-20 h-20"
                  src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                Interactively target efficient ideas before open-source supply
                chains. Conveniently fabricate state of the art channels
                vis-a-vis dynamic ROI. Proactively productize virtual.
              </p>
              <div className="flex items-center justify-center">
                <img
                  className="rounded-full w-20 h-20"
                  src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                Interactively target efficient ideas before open-source supply
                chains. Conveniently fabricate state of the art channels
                vis-a-vis dynamic ROI. Proactively productize virtual.
              </p>
              <div className="flex items-center justify-center">
                <img
                  className="rounded-full w-20 h-20"
                  src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <p className="text-center text-white font-bold text-xl">
                Nate Wilson, 2 Days Ago
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SliderSwiper;

import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import SliderSwiper from "../components/SliderSwiper";
import TopFood from "../components/TopFood";
import Work from "../components/Work";
import Offer from "../components/Offer";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Food | Home</title>
      </Helmet>
      {/* banner */}
      <div className="mb-36">
        <Banner></Banner>
      </div>
      {/* how to work section */}
      <div className="mb-36">
      <Work></Work>
      </div>
      {/* Top Foods section */}
      <div className="mb-36">
        <TopFood></TopFood>
      </div>
      <div className="mb-36">
        <Offer></Offer>
      </div>
      {/* swiper */}
      <SliderSwiper></SliderSwiper>
    </div>
  );
};

export default Home;

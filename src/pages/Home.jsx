import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import SliderSwiper from "../components/SliderSwiper";
import TopFood from "../components/TopFood";
import Work from "../components/Work";
import Offer from "../components/Offer";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Food | Home</title>
      </Helmet>

      {/* Banner Section */}
      <section>
        <Banner />
      </section>

      {/* How It Works Section */}
      <section>
        <Work />
      </section>

      {/* Top Foods Section */}
      <section>
        <TopFood />
      </section>

      {/* Special Offer Section */}
      <section>
        <Offer />
      </section>

      {/* Testimonials Slider Section */}
      <section className="pb-20">
        <SliderSwiper />
      </section>
    </main>
  );
};

export default Home;

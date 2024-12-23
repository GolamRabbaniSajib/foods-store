import Banner from "../components/Banner";
import TopFood from "../components/TopFood";
import Work from "../components/Work";

const Home = () => {
  return (
    <div>
        {/* banner */}
        <div>
            <Banner></Banner>
        </div>
        {/* how to work section */}
        <Work></Work>
        {/* Top Foods section */}
        <div>
            <TopFood></TopFood>
        </div>
    </div>
  );
};

export default Home;

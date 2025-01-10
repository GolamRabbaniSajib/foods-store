import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div className="bg-red-700 text-white p-8 rounded-lg flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto">
      {/* Text Content */}
      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          SPECIAL OFFER FOR
          <br />
          CATERING EVENTS
        </h1>
        <p className="text-lg mb-6">
          The mouth-watering aroma of sizzling burgers now fills the streets
          thanks to the passionate pursuit of three brothers.
        </p>
        <Link to={"/foods"}>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-red-800 font-bold py-3 px-6 rounded-full shadow-lg">
            ORDER NOW ➡️
          </button>
        </Link>
      </div>

      {/* Image Content */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1537185664194-89a481f7fcfb?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Delicious burger"
          className="w-[300px] h-[300px] object-cover rounded-tl-[200px]"
        />
      </div>
    </div>
  );
};

export default Offer;

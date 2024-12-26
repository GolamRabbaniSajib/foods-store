import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
const Work = () => {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="text-center space-y-3 my-14">
        <h1 className="text-4xl md:text-6xl font-semibold"><span className="text-red-400">How to</span> <span className="text-green-400">order?</span></h1>
        <p className="font-bold text-gray-400">Follow the Steps</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-11/12 mx-auto mt-28">
        <div className="flex flex-col items-center space-y-5">
          <p className="text-6xl text-green-400">
            <FaLocationPinLock />
          </p>
          <div className="flex">
            <span className="bg-orange-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              1
            </span>
          </div>
          <p className="text-xl font-semibold">Choose your location</p>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <p className="text-6xl text-green-400">
            <MdOutlineRestaurant />
          </p>
          <div className="flex">
            <span className="bg-orange-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              2
            </span>
          </div>
          <p className="text-xl font-semibold">Choose restaurant</p>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <p className="text-6xl text-green-400">
            <IoFastFoodOutline />
          </p>
          <div className="flex">
            <span className="bg-orange-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              3
            </span>
          </div>
          <p className="text-xl font-semibold">Make your order</p>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <p className="text-6xl text-green-400">
            <TbTruckDelivery />
          </p>
          <div className="flex">
            <span className="bg-orange-400 w-10 h-10 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              4
            </span>
          </div>
          <p className="text-xl font-semibold">Food is on the way</p>
        </div>
      </div>
    </div>
  );
};

export default Work;

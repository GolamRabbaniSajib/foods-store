import { FaLocationPinLock } from "react-icons/fa6";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

const steps = [
  {
    id: 1,
    title: "Choose your location",
    icon: <FaLocationPinLock />,
  },
  {
    id: 2,
    title: "Choose restaurant",
    icon: <MdOutlineRestaurant />,
  },
  {
    id: 3,
    title: "Make your order",
    icon: <IoFastFoodOutline />,
  },
  {
    id: 4,
    title: "Food is on the way",
    icon: <TbTruckDelivery />,
  },
];

const Work = () => {
  return (
    <section className="w-11/12 mx-auto py-16">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
          <span className="text-red-400">How to</span>{" "}
          <span className="text-green-400">order?</span>
        </h1>
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Follow the Steps
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 hover:-translate-y-1 transform"
          >
            <div className="relative">
              <div className="text-6xl text-green-400 mb-2">{step.icon}</div>
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold shadow-lg animate-bounce">
                {step.id}
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;

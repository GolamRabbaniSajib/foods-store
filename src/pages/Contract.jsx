import toast from "react-hot-toast";
import logo from "../assets/2.png";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    reset()
  };
  const handleClick = () => {
    toast.success("Message Successfully Sent");
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-10">
      <div className="w-11/12 mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Left Section */}
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <img
              src={logo}
              alt="Contact Us"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
          {/* Right Section */}
          <div className="md:w-1/2 h-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  resource=""
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  placeholder="Your Message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                onClick={handleClick}
                type="submit"
                className="w-full bg-green-400 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

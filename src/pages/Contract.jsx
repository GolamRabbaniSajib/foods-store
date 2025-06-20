import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import logo from "../assets/2.png";
import { FiSend } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Contact = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    setIsSending(true);
    console.log("Form Data:", data);

    setTimeout(() => {
      setIsSending(false);
      toast.success("Message sent successfully!");
      reset();
    }, 1500);
  };

  const renderInput = ({ id, label, type = "text", placeholder, validation }) => (
    <div className="relative">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
          errors[id] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
        {...register(id, validation)}
      />
      {errors[id] && (
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-red-500 text-xs mt-1 absolute"
        >
          {errors[id]?.message}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl lg:text-5xl font-bold text-center mb-10" variants={itemVariants}>
          Get In Touch
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* Image Section */}
          <motion.div className="w-full md:w-5/12" variants={itemVariants}>
            <img
              src={logo}
              alt="Contact Illustration"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
            />
          </motion.div>

          {/* Form Section */}
          <motion.div className="w-full md:w-6/12" variants={itemVariants}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6"
            >
              {renderInput({
                id: "name",
                label: "Name",
                placeholder: "Your Name",
                validation: { required: "Name is required." },
              })}

              {renderInput({
                id: "email",
                label: "Email",
                type: "email",
                placeholder: "Your Email",
                validation: {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                },
              })}

              <div className="relative">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                    errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 resize-none`}
                  {...register("message", {
                    required: "Message cannot be empty.",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long.",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-red-500 text-xs mt-1 absolute"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px -10px rgba(74, 222, 128, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                {isSending ? "Sending..." : "Send Message"}
                {!isSending && <FiSend />}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

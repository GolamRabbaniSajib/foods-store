import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createNewUser, updateUserProfile, signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    const { name, email, photo, password } = data;
    try {
      const result = await createNewUser(email, password);
      const user = result.user;
      await updateUserProfile({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
      toast.success("Registration successful! Welcome!");
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.code || "An unknown error occurred.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Google Sign-in Error:", err);
      toast.error(err.message || "Failed to sign in with Google.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Food Store | Create Account</title>
      </Helmet>

      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Side: Image & Branding */}
          <section className="hidden md:block relative" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
              alt="Delicious food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10">
              <motion.h1
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl font-extrabold text-white leading-tight"
              >
                Join the Best <br /> Food Experience.
              </motion.h1>
              <motion.p
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-gray-200 mt-4"
              >
                Create an account to start your culinary journey with us.
              </motion.p>
            </div>
          </section>

          {/* Right Side: Registration Form */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 p-8 sm:p-12 flex flex-col justify-center"
            aria-label="Create account form"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Your Account
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 mb-8">
              Let's get you started!
            </motion.p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name Field */}
              <motion.div variants={itemVariants} className="relative">
                <FiUser className="absolute top-3.5 left-3 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("name", { required: "Your name is required." })}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              {/* Photo URL Field */}
              <motion.div variants={itemVariants} className="relative">
                <FiImage className="absolute top-3.5 left-3 text-gray-400" aria-hidden="true" />
                <input
                  type="url"
                  placeholder="Photo URL"
                  autoComplete="photo"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("photo", { required: "A photo URL is required." })}
                  aria-invalid={errors.photo ? "true" : "false"}
                  aria-describedby="photo-error"
                />
                {errors.photo && (
                  <p id="photo-error" className="text-red-500 text-xs mt-1" role="alert">
                    {errors.photo.message}
                  </p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants} className="relative">
                <FiMail className="absolute top-3.5 left-3 text-gray-400" aria-hidden="true" />
                <input
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address." },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants} className="relative">
                <FiLock className="absolute top-3.5 left-3 text-gray-400" aria-hidden="true" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: { value: 6, message: "Password must be at least 6 characters." },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[a-z])/,
                      message: "Must include uppercase and lowercase letters.",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-all duration-300 shadow-lg hover:shadow-green-500/40"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Registering...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </motion.div>
            </form>

            {/* Social Login */}
            <motion.div variants={itemVariants} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 mt-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <FcGoogle size={22} aria-hidden="true" />
                <span>Sign up with Google</span>
              </button>
            </motion.div>

            {/* Link to Login */}
            <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-green-600 hover:text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              >
                Log in here
              </Link>
            </motion.p>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Register;

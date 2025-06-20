import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUser,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiGlobe,
  FiAlertTriangle,
} from "react-icons/fi";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

// Section Reusable Component
const Section = ({ icon: Icon, title, children }) => (
  <motion.article
    variants={itemVariants}
    role="region"
    aria-labelledby={title}
    className="mb-10"
  >
    <header className="flex items-center gap-4 mb-4">
      <Icon className="w-8 h-8 text-green-500" aria-hidden="true" />
      <h2
        id={title}
        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
      >
        {title}
      </h2>
    </header>
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.article>
);

// Main Terms & Conditions Page
const Terms = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 sm:py-24">
      <motion.div
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Last Updated: June 21, 2025
          </p>
        </motion.div>

        {/* All Sections */}
        <Section icon={FiFileText} title="1. Introduction & Acceptance">
          <p>
            Welcome to <strong>Food Store</strong>. These Terms and Conditions
            ("Terms") govern your use of our website (foodstore.com.bd) and the
            services we offer. By accessing or using our platform, you agree to
            be bound by these Terms and our Privacy Policy.
          </p>
        </Section>

        <Section icon={FiUser} title="2. User Accounts">
          <p>
            To place orders, you may need to create an account. You're
            responsible for maintaining confidentiality of your login
            credentials and for all activities that occur under your account.
          </p>
        </Section>

        <Section icon={FiShoppingCart} title="3. Orders, Pricing & Payment">
          <p>
            All orders are subject to acceptance and availability. Prices are
            listed in BDT and inclusive of VAT. Payment can be made via mobile
            financial services, cards, or Cash on Delivery.
          </p>
        </Section>

        <Section icon={FiTruck} title="4. Delivery Policy">
          <p>
            While we strive to deliver on time, delays may happen. Risk of loss
            and title passes to you upon delivery to the carrier or your
            specified address.
          </p>
        </Section>

        <Section icon={FiShield} title="5. Intellectual Property">
          <p>
            All content, including text, graphics, and software, belongs to
            Food Store or its licensors and is protected by international
            copyright laws.
          </p>
        </Section>

        <Section icon={FiAlertTriangle} title="6. Limitation of Liability">
          <p>
            Food Store is not liable for indirect, incidental, or consequential
            damages arising from use or inability to use our services, to the
            fullest extent permitted by law.
          </p>
        </Section>

        <Section icon={FiGlobe} title="7. Governing Law">
          <p>
            These Terms are governed by the laws of the People's Republic of
            Bangladesh. Any disputes shall be resolved exclusively in courts
            located in Dhaka.
          </p>
        </Section>
      </motion.div>
    </section>
  );
};

export default Terms;

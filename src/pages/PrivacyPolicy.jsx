import React from "react";
import { motion } from "framer-motion";
import {
  FiLock,
  FiInfo,
  FiShare2,
  FiDatabase,
  FiUserCheck,
  FiShield,
  FiMessageSquare,
  FiCpu,
} from "react-icons/fi";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

// --- Reusable Section Component ---
const PolicySection = ({ icon: Icon, title, children }) => (
  <motion.article
    variants={itemVariants}
    role="region"
    aria-labelledby={title}
    className="mb-10"
  >
    <header className="flex items-center gap-4 mb-4">
      <Icon className="w-8 h-8 text-green-500 flex-shrink-0" aria-hidden="true" />
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

// --- Main Privacy Policy Page ---
const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 sm:py-24">
      <motion.div
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Page Header --- */}
        <motion.header variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: June 21, 2025
          </p>
        </motion.header>

        {/* --- Sections --- */}
        <PolicySection icon={FiLock} title="Our Commitment to Your Privacy">
          <p>
            Welcome to <strong>Food Store</strong>. We are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information. By using our services, you agree to this policy.
          </p>
        </PolicySection>

        <PolicySection icon={FiInfo} title="Information We Collect">
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, contact number, email, and delivery address.</li>
            <li><strong>Payment Info:</strong> We use secure third-party gateways and do not store your card details.</li>
            <li><strong>Usage Data:</strong> Includes site interaction, page views, and search history.</li>
          </ul>
        </PolicySection>

        <PolicySection icon={FiCpu} title="How We Use Your Information">
          <p>Your data helps us:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process orders and handle payments.</li>
            <li>Communicate about orders, promotions, and updates.</li>
            <li>Personalize your experience and show relevant content.</li>
            <li>Improve service quality and troubleshoot issues.</li>
            <li>Prevent fraud and ensure platform security.</li>
          </ul>
        </PolicySection>

        <PolicySection icon={FiShare2} title="How We Share Your Information">
          <p>
            We do <strong>not sell</strong> your data. Information is shared only with trusted service providers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Delivery Partners:</strong> For timely order fulfillment.</li>
            <li><strong>Payment Gateways:</strong> To securely process transactions.</li>
            <li><strong>Analytics Tools:</strong> To improve performance and user experience.</li>
          </ul>
          <p>These third parties are bound by strict confidentiality agreements.</p>
        </PolicySection>

        <PolicySection icon={FiDatabase} title="Data Security">
          <p>
            We employ SSL encryption and secure protocols to protect your data. While we strive to safeguard your information, no system is 100% secure.
          </p>
        </PolicySection>

        <PolicySection icon={FiUserCheck} title="Your Rights and Choices">
          <p>
            You may access or delete your information anytime via your account. You can also unsubscribe from marketing emails using the link provided in each message.
          </p>
        </PolicySection>

        <PolicySection icon={FiShield} title="Children's Privacy">
          <p>
            Our services are not directed toward users under 18. If we discover that such data has been collected, it will be deleted immediately.
          </p>
        </PolicySection>

        <PolicySection icon={FiMessageSquare} title="Contact Us">
          <p>
            For any privacy-related inquiries, feel free to reach out:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:privacy@foodstore.com.bd"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              privacy@foodstore.com.bd
            </a>
          </p>
        </PolicySection>
      </motion.div>
    </section>
  );
};

export default PrivacyPolicy;

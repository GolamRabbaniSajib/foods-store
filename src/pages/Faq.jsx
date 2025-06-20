import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

// FAQ content
const faqData = [
  {
    id: 1,
    question: "How do I place an order on Food Store?",
    answer:
      "Placing an order is simple! Just browse our categories, select the items you want, add them to your cart, and proceed to checkout. You'll be prompted to enter your delivery address and payment details to complete the order.",
  },
  {
    id: 2,
    question: "What are your delivery hours and areas?",
    answer:
      "We currently deliver across all major areas in Dhaka from 9:00 AM to 10:00 PM, seven days a week. You can check if your specific location is covered by entering your address on the homepage.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer:
      "We accept a wide range of payment methods including credit/debit cards (Visa, MasterCard), mobile banking (bKash, Nagad, Rocket), and Cash on Delivery (COD) for your convenience.",
  },
  {
    id: 4,
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is confirmed, you will receive an SMS and email with a tracking link. You can also track the real-time status of your order from the 'My Orders' section in your Food Store account.",
  },
  {
    id: 5,
    question: "What is your return and refund policy?",
    answer:
      "We have a 'no questions asked' return policy for any perishable items that are not up to standard upon delivery. For packaged goods, returns are accepted within 24 hours if the product is unopened and in its original packaging.",
  },
];

// Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Memoized accordion item
const AccordionItem = memo(({ item, onToggle, isActive }) => {
  const { id, question, answer } = item;
  const answerId = `faq-answer-${id}`;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <button
        onClick={onToggle}
        aria-expanded={isActive}
        aria-controls={answerId}
        className="w-full flex justify-between items-center text-left p-6 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {question}
        </h3>
        <span className="text-xl text-green-500">
          {isActive ? <FiMinus /> : <FiPlus />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            id={answerId}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (id) => {
    setActiveIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 sm:py-24">
      <motion.div
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Have questions? We've got answers. If you can't find what you're
            looking for, feel free to contact us.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-4">
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={activeIndex === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Faq;

// src/components/ScrollSection.js
import { motion } from "framer-motion";

export default function ScrollSection({ children }) {
  return (
    <motion.section
      className="min-h-screen w-full flex items-center justify-center px-6 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </motion.section>
  );
}

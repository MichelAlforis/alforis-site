// components/FadeSection.js
import { motion } from "framer-motion";

export default function FadeSection({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`py-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {children}
    </motion.section>
  );
}

import { motion } from 'framer-motion'

export const Progress = ({ value = 0, max = 100 }) => {
  const percentage = Math.min((value / max) * 100, 100)

  
  return (
    <div className="w-full h-3 bg-acier rounded-full overflow-hidden shadow-inner">
      <motion.div
        className="h-full bg-doré"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </div>
  )
}

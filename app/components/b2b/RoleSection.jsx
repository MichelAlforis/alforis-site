'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function RoleSection({ extraClass = '' }) {
  return (
    <section className={`py-20 ${extraClass}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-12">Notre rôle</h2>
          
          <div className="bg-gradient-to-br from-acier/10 to-vertSauge/10 dark:from-acier/20 dark:to-vertSauge/20 p-8 md:p-12 rounded-2xl border border-acier/20 dark:border-vertSauge/20">
            <p className="text-xl md:text-2xl mb-8 text-anthracite dark:text-ivoire font-light text-center leading-relaxed">
              Pas un simple "third party marketer" → <br className="hidden md:block" />
              mais un <span className="text-doré font-bold">designer de stratégie de distribution cross-border</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <motion.div 
                className="bg-ivoire dark:bg-acier/40 p-8 rounded-xl shadow-lg border border-acier/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4">💼</div>
                <h3 className="mb-3 text-doré">Institutionnels</h3>
                <p className="text-acier dark:text-ivoire">Luxembourg, France</p>
              </motion.div>
              
              <motion.div 
                className="bg-ivoire dark:bg-acier/40 p-8 rounded-xl shadow-lg border border-acier/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="mb-3 text-doré">Retail haut de gamme</h3>
                <p className="text-acier dark:text-ivoire">CGP, bancassureurs, family offices Espagne & Portugal</p>
              </motion.div>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-4 text-anthracite dark:text-ivoire">
              <Shield className="w-8 h-8 text-doré flex-shrink-0" />
              <p className="font-medium text-center text-lg">
                Un acteur <span className="font-bold text-doré">indépendant, sélectif et crédible</span>, membre de l'AFTPM
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
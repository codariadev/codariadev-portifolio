"use client";

import { motion, Variants } from 'framer-motion';
import OrbContainer from './animations/heroAnimation';

export default function Hero() {


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };
  
  return (
    <section className='flex justify-between items-center h-screen p-40'>
        <motion.article 
          className='w-1/2'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
            <motion.h2 className="text-[#7768EF]" variants={itemVariants}>Desenvolvedor Frontend</motion.h2>
            <motion.h1 className='text-[#2B78D6] text-4xl' variants={itemVariants}>Lucas Eduardo Alves</motion.h1>
            <motion.p className='text-[#84F8AA] text-sm' variants={itemVariants}>um texto breve</motion.p>
        </motion.article>

        <div className='w-1/2'>
          <OrbContainer />
        </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[1180px] mx-auto"
    >
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">{children}</h1>
      <div className="border-b border-slate-300 mb-6"></div>
    </motion.div>
  );
}

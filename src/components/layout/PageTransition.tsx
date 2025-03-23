
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const variants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } },
  exit: { 
    opacity: 0, 
    y: -8, 
    transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] } 
  }
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className={cn("min-h-[calc(100vh-64px)] w-full", className)}
    >
      {children}
    </motion.div>
  );
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}

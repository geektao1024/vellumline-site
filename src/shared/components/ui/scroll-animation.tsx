"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  stagger?: boolean;
}

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px", // Optimization: trigger animation earlier for better perceived performance
  });

  // Respect user's reduced motion preference (accessibility)
  const shouldReduceMotion = useReducedMotion();
  const shouldShow = shouldReduceMotion || isInView || hasEnteredView;

  useEffect(() => {
    if (isInView) {
      setHasEnteredView(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (shouldReduceMotion || hasEnteredView) {
      return;
    }

    let rafId: number | null = null;
    let timeoutId: number | null = null;
    let intervalId: number | null = null;

    const checkVisibility = () => {
      const element = ref.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const triggerInset = 50;

      if (
        rect.top < window.innerHeight - triggerInset &&
        rect.bottom > triggerInset
      ) {
        setHasEnteredView(true);
      }
    };

    const requestCheck = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        checkVisibility();
      });
    };

    checkVisibility();
    rafId = window.requestAnimationFrame(checkVisibility);
    timeoutId = window.setTimeout(checkVisibility, 250);
    intervalId = window.setInterval(checkVisibility, 300);
    window.addEventListener("scroll", requestCheck, { passive: true });
    window.addEventListener("resize", requestCheck);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
      window.removeEventListener("scroll", requestCheck);
      window.removeEventListener("resize", requestCheck);
    };
  }, [hasEnteredView, shouldReduceMotion]);

  // If user prefers reduced motion or JavaScript is disabled, show content directly
  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 };
      case "down":
        return { y: -30, x: 0 };
      case "left":
        return { x: 30, y: 0 };
      case "right":
        return { x: -30, y: 0 };
      default:
        return { y: 30, x: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={shouldShow ? "visible" : "hidden"}
        className={className}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getInitialPosition(),
        filter: "blur(4px)",
      }}
      animate={
        shouldShow
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              ...getInitialPosition(),
              filter: "blur(4px)",
            }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

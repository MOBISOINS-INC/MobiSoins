'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
  stars?: number;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-2.5 sm:gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, stars }, i) => (
              <div
                key={i}
                className="glass-dark p-2.5 sm:p-7 !rounded-lg sm:!rounded-2xl w-full md:max-w-xs"
              >
                {stars && (
                  <div className="flex gap-0.5 mb-1.5 sm:mb-4">
                    {Array.from({ length: stars }).map((_, j) => (
                      <svg key={j} viewBox="0 0 24 24" fill="#98B690" className="w-2 h-2 sm:w-[13px] sm:h-[13px]">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                )}
                <p className="text-[11px] sm:text-sm text-white/75 leading-snug sm:leading-relaxed font-light">{text}</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 pt-2 sm:mt-5 sm:pt-5 border-t border-white/10">
                  <img
                    width={36}
                    height={36}
                    src={image}
                    alt={name}
                    className="h-6 w-6 sm:h-9 sm:w-9 rounded-full object-cover ring-1 ring-white/15"
                  />
                  <div className="flex flex-col">
                    <div className="text-[11px] sm:text-sm font-semibold text-white leading-tight sm:leading-5">{name}</div>
                    <div className="text-[9px] sm:text-xs text-white/45 leading-tight sm:leading-5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

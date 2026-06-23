"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaBookOpen,
  FaDroplet,
  FaFlask,
  FaGraduationCap,
} from "react-icons/fa6";

import { education } from "@/data";
import { cn } from "@/lib/utils";

const iconMap = {
  cap: FaGraduationCap,
  drop: FaDroplet,
  book: FaBookOpen,
  flask: FaFlask,
} as const;

export const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Drives every parallax layer from this section's travel through the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Timeline line "fills" as the section scrolls past.
  const lineScale = useTransform(scrollYProgress, [0.08, 0.85], [0, 1]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-14 md:py-20"
    >
      <div className="relative z-10">
        <h1 className="heading">
          MY <span className="text-purple">EDUCATION</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white-200 md:text-base">
          Training in computer engineering, web development, and systems —
          from technical foundations to university degree.
        </p>

        {/* Timeline */}
        <div className="relative mx-auto mt-10 max-w-5xl md:mt-16">
          {/* Static line track */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          {/* Animated fill line (parallax-driven) */}
          <motion.div
            style={{ scaleY: lineScale }}
            aria-hidden
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-purple via-purple/60 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-8 md:gap-12">
            {education.map((item, index) => {
              const Icon =
                iconMap[item.icon as keyof typeof iconMap] ?? FaGraduationCap;
              const isLeft = index % 2 === 0;

              return (
                <div key={item.id} className="relative flex md:items-center">
                  {/* Node + icon */}
                  <div className="absolute left-5 z-20 -translate-x-1/2 md:left-1/2">
                    <div className="flex size-10 items-center justify-center rounded-full border border-white/[0.15] bg-black-100 shadow-[0_0_25px_-4px_#5ce1e6] md:size-12">
                      <Icon className="text-lg text-purple" />
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ backgroundColor: "rgba(17, 17, 17, 0.69)" }}
                    className={cn(
                      "relative ml-12 w-full overflow-hidden rounded-3xl border border-white/[0.1] bg-[url('/grid.svg')] bg-cover bg-center bg-no-repeat p-5 shadow-input transition-colors duration-300 hover:border-purple/40 dark:shadow-none md:ml-0 md:w-[44%] md:p-6",
                      isLeft
                        ? "md:mr-auto md:pr-9 md:text-right"
                        : "md:ml-auto md:pl-9"
                    )}
                  >
                    <span className="inline-block rounded-full border border-purple/30 bg-purple/10 px-3 py-1 text-xs font-medium text-purple">
                      {item.period}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-white md:text-xl">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-white-100">
                      {item.school}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white-200">
                      {item.description}
                    </p>

                    <div
                      className={cn(
                        "mt-4 flex flex-wrap gap-2",
                        isLeft && "md:justify-end"
                      )}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[11px] text-white-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

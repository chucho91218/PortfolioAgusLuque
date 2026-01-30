"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center py-12 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      <AnimatedNoise opacity={0.03} />

      <div ref={contentRef} className="w-full flex flex-col">
        {/* TITULO */}
        <div className="relative z-10">
          <SplitFlapText text="DEVELOPER" speed={80} />
        </div>

        {/* CONTENEDOR DE CONTENIDO (Texto y Foto) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mt-1 gap-6">
          {/* BLOQUE IZQUIERDO */}
          <div className="flex-1 pt-2">
            <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1.2rem,3.4vw,2.2rem)] tracking-wide">
              Bienvenido a mi portfolio.
            </h2>

            <p className="mt-4 max-w-md font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
              “Si podés imaginarlo y podés programarlo, ya existe.”
            </p>

            {/* Botones */}
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="/cv.pdf"
                download
                className="group inline-flex items-center gap-3 border border-foreground/20 px-7 py-3.5 font-mono text-sm uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
              >
                <ScrambleTextOnHover text="Descargar CV" as="span" duration={0.6} />
                <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
              </a>

              <a
                href="https://www.linkedin.com/in/agustinluquedev/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/chucho91218"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* FOTO */}
          <div className="relative w-[240px] h-[300px] md:w-[380px] md:h-[277px] border border-border/40 bg-black/20 overflow-hidden self-center lg:self-start lg:mt-4 shadow-2xl">
            <Image
              src="/mee.jpg"
              alt="Foto de Agustín"
              fill
              className="object-cover"
              priority
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 6px)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

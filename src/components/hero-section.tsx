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

  const scrollToWork = () => {
    const el = document.querySelector("#work")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] md:min-h-screen flex items-center py-10 md:py-12 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      <AnimatedNoise opacity={0.03} />

      <div ref={contentRef} className="w-full flex flex-col">
        {/* TITULO */}
        <div className="relative z-10">
          <SplitFlapText text="DEVELOPER" speed={80} />
        </div>

        {/* CONTENEDOR DE CONTENIDO (Texto y Foto) */}
        <div className="flex flex-col lg:flex-row justify-between items-start mt-2 md:mt-1 gap-6 md:gap-8">
          {/* BLOQUE IZQUIERDO */}
          <div className="flex-1 pt-1 md:pt-2">
            <h2 className="font-[var(--font-bebas)] text-foreground/70 text-[clamp(1.15rem,3.4vw,2.2rem)] tracking-wide">
              Bienvenido a mi portfolio.
            </h2>

            <p className="mt-3 md:mt-4 max-w-md font-mono text-[15px] md:text-lg text-foreground/60 leading-relaxed">
              “Si podés imaginarlo y podés programarlo, ya existe.”
            </p>

            {/* CTAs + Links (mobile friendly) */}
            <div className="mt-7 md:mt-10 flex flex-col gap-6">
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 md:gap-6">
                <a
                  href="/cv.pdf"
                  download
                  className="group inline-flex w-fit items-center gap-3 border border-foreground/25 bg-black/10 px-7 py-3.5 font-mono text-sm uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
                >
                  <ScrambleTextOnHover text="Descargar CV" as="span" duration={0.6} />
                  <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
                </a>

                <button
                  type="button"
                  onClick={scrollToWork}
                  className="group inline-flex w-fit items-center gap-3 border border-border/50 px-7 py-3.5 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                >
                  <ScrambleTextOnHover text="Ver proyectos" as="span" duration={0.6} />
                  <span className="text-base transition-transform duration-[400ms] ease-in-out group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-8">
                <a
                  href="https://www.linkedin.com/in/agustinluquedev/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm uppercase tracking-widest text-foreground/55 hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/chucho91218"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm uppercase tracking-widest text-foreground/55 hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* FOTO */}
          <div className="relative w-[220px] h-[250px] md:w-[380px] md:h-[277px] border border-border/40 bg-black/20 overflow-hidden self-start lg:self-start lg:mt-4 shadow-2xl mt-3">
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

"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-28 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            05 / COLOPHON
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-6xl md:text-7xl tracking-tight">
            DETALLES
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
            Un resumen de stack, herramientas y cómo está hecho este portfolio.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
          <div className="border border-border/40 bg-card/40 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Frontend
            </p>
            <p className="mt-3 font-mono text-sm text-foreground">
              Next.js, TypeScript, Tailwind
            </p>
          </div>

          <div className="border border-border/40 bg-card/40 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Animaciones
            </p>
            <p className="mt-3 font-mono text-sm text-foreground">
              GSAP + ScrollTrigger
            </p>
          </div>

          <div className="border border-border/40 bg-card/40 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Deploy
            </p>
            <p className="mt-3 font-mono text-sm text-foreground">
              Vercel
            </p>
          </div>
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-10 border-t border-border/40 pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} — Agustín Luque
          </p>
        </div>
      </div>
    </section>
  )
}

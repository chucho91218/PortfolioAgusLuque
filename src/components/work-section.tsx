"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiments = [
  {
    title: "Cardetailing",
    medium: "PROXIMAMENTE",
    description: "En proceso...",
    bg: "/cardetailing.png",
    href: "", // 👈 no clickeable
  },
  {
    title: "Finance Game",
    medium: "React, TypeScript, Tailwind CSS, Vite+Laravel, Livewire, MySQL",
    description:
      "Participé en una plataforma web gamificada para aprender y finanzas personales, con pantallas interactivas y “misiones” para reforzar conceptos.",
    bg: "/finance.png",
    href: "https://github.com/tomydp/finance-game.git",
  },
  {
    title: "Vangogh Deco",
    medium: "Next.js, React, TypeScript, Tailwind CSS, Vercel",
    description:
      "Sitio web para presentar la marca, mostrar productos o servicios y facilitar el contacto, con diseño responsive y enfoque visual.",
    bg: "/vangogh.png",
    href: "https://vangogh-deco.vercel.app/",
  },
  {
    title: "La cuenta clara",
    medium: "React, TypeScript, Tailwind CSS, Node.js, Vercel",
    description:
      "App web para dividir gastos en grupo y calcular quién le debe a quién, evitando confusiones y haciendo el reparto de manera rápida y clara.",
    bg: "/cuenta.png",
    href: "https://lacuentaclara.vercel.app/",
  },
] as const

type Experiment = (typeof experiments)[number]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("[data-work-card]")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
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
      id="work"
      className="relative py-24 md:py-28 pl-6 md:pl-28 pr-6 md:pr-12"

    >
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            02 /
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-6xl md:text-7xl tracking-tight">
            ULTIMOS PROYECTOS
          </h2>
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {experiments.map((experiment, index) => (
          <WorkCard
            key={experiment.title}
            experiment={experiment}
            index={index}
            persistHover={index === 0}
          />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  experiment,
  index,
  persistHover = false,
}: {
  experiment: Experiment
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive
  const isClickable = Boolean(experiment.href)

  const Wrapper: any = isClickable ? "a" : "article"
  const wrapperProps = isClickable
    ? {
        href: experiment.href,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": `Abrir ${experiment.title}`,
      }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      ref={cardRef}
      data-work-card
      className={cn(
        "group relative overflow-hidden block",
        "h-[220px] md:h-[240px]",
        "border border-border/40 bg-black/20",
        "p-6 flex flex-col justify-between",
        "transition-all duration-500",
        isClickable ? "cursor-pointer" : "cursor-default",
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={experiment.bg}
        alt={`${experiment.title} background`}
        fill
        className={cn(
          "object-cover transition-opacity duration-500",
          isActive ? "opacity-35" : "opacity-20",
        )}
        priority={false}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />

      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative z-10">
        <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/90">
          {experiment.medium}
        </span>

        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] tracking-tight transition-colors duration-300",
            "text-3xl md:text-4xl",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {experiment.title}
        </h3>
      </div>

      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-base md:text-lg text-muted-foreground leading-relaxed transition-all duration-500 max-w-[44ch]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {experiment.description}
        </p>
      </div>

      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-xs transition-colors duration-300 z-10",
          isActive ? "text-accent" : "text-muted-foreground/50",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500 z-10",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </Wrapper>
  )
}

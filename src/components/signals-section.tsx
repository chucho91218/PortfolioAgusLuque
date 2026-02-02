"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Network, Smartphone, GraduationCap } from "lucide-react"
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiDotnet,
  SiPhp,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiDocker,
  SiUbuntu, SiVercel
} from "react-icons/si"

gsap.registerPlugin(ScrollTrigger)

type SignalType = "about" | "frontend" | "backend" | "tools" | "career"

type SignalItem = {
  type: SignalType
  title: string
  note?: string
  items?: { label: string; Icon: any }[]
}

const signals: SignalItem[] = [
  {
    type: "about",
    title: "Perfil",
    note:
      "Soy Agustín Luque, desarrollador Full Stack. Me apasiona crear productos que no solo funcionen bien, sino que también se sientan claros, modernos y fáciles de usar.Diseño interfaces responsive con buen criterio de UX, y construyo la lógica del lado servidor. Hoy busco sumarme a equipos donde pueda aportar compromiso y una mirada práctica, mientras sigo aprendiendo y enfrentando nuevos desafíos. Me enfoco en entregar soluciones claras, sólidas y mantenibles.",
  },
  {
    type: "frontend",
    title: "Tecnologías",
    note: "Frontend.",
    items: [
      { label: "React", Icon: SiReact },
      { label: "JavaScript", Icon: SiJavascript },
      { label: "TypeScript", Icon: SiTypescript },
      { label: "HTML", Icon: SiHtml5 },
      { label: "CSS3", Icon: SiCss3 },
      { label: "Tailwind CSS", Icon: SiTailwindcss },
    
    ],
  },
  {
    type: "backend",
    title: "Tecnologías",
    note: "Backend.",
    items: [
      { label: ".NET", Icon: SiDotnet },
      { label: "PHP", Icon: SiPhp },
      { label: "Node.js", Icon: SiNodedotjs },
      { label: "Express", Icon: SiExpress },
      { label: "APIs REST", Icon: Network },
      { label: "MySQL", Icon: SiMysql },
    ],
  },
 {
  type: "tools",
  title: "Herramientas",
  items: [
    { label: "Git", Icon: SiGit },
    { label: "Docker", Icon: SiDocker },
    { label: "Ubuntu", Icon: SiUbuntu },
    { label: "Vercel", Icon: SiVercel },
  ],
},

  {
    type: "career",
    title: "Carrera",
    note:
      "Desarrollador de Software 2023-2025. Instituto Superior — Villa del Rosario.",
    items: [{ label: "Estudios", Icon: GraduationCap }],
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      {/* Cursor naranja */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          01 / 
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-6xl md:text-7xl tracking-tight">
          SOBRE MI
        </h2>
      </div>

      {/* Cards (horizontal scroll) */}
      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {signals.map((signal, index) => (
          <SignalCard key={index} signal={signal} index={index} />
        ))}
      </div>
    </section>
  )
}

function SignalCard({ signal, index }: { signal: SignalItem; index: number }) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Header mini */}
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          {/* date eliminado */}
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-[2.75rem] tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {signal.title}
        </h3>

        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        {/* Body */}
        {signal.items?.length ? (
          <div className="flex flex-wrap gap-3">
            {signal.items.map((it) => {
              const Icon = it.Icon
              return (
                <div
                  key={it.label}
                  className="flex items-center gap-2 border border-border/40 px-3.5 py-2.5"
                >
                  <Icon className="h-[18px] w-[18px] text-muted-foreground" />
                  <span className="font-mono text-sm text-muted-foreground">
                    {it.label}
                  </span>
                </div>
              )
            })}
          </div>
        ) : null}

        {signal.note ? (
          <p className="mt-5 font-mono text-base text-muted-foreground leading-relaxed">
            {signal.note}
          </p>
        ) : null}

        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}

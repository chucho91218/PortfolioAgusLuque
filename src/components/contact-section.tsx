"use client"

import { useState } from "react"
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactSectionProps = {
  email?: string
  location?: string
  linkedinUrl?: string
  githubUrl?: string
}

export function ContactSection({
  email = "luqueagustindev@gmail.com",
  location = "Córdoba, Argentina",
  linkedinUrl = "https://www.linkedin.com/in/agustinluquedev/",
  githubUrl = "https://github.com/chucho91218",
}: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  )

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdvkgpq"

  return (
    <section id="contacto" className="relative py-28 pl-6 md:pl-28 pr-6 md:pr-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            04 / CONTACTO
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-6xl md:text-7xl tracking-tight">
            ¿HABLAMOS?
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
            Si te interesa mi perfil o querés que charlemos sobre una oportunidad,
            escribime y te respondo lo antes posible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Info + links */}
          <div className="border border-border/40 bg-card/40 p-7 md:p-8">
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="grid h-11 w-11 place-items-center border border-border/40 bg-black/20">
                  <Mail className="h-5 w-5 text-accent" />
                </span>
                <span className="font-mono text-sm md:text-base">{email}</span>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="grid h-11 w-11 place-items-center border border-border/40 bg-black/20">
                  <MapPin className="h-5 w-5 text-accent" />
                </span>
                <span className="font-mono text-sm md:text-base">{location}</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-border/40 px-4 py-2.5 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all"
                >
                  <Linkedin className="h-4 w-4 text-accent" />
                  LinkedIn
                </a>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-border/40 px-4 py-2.5 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all"
                >
                  <Github className="h-4 w-4 text-accent" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="mt-10 h-px w-full bg-border/40" />

            <div className="mt-6 flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">
                © {new Date().getFullYear()} — Agustín Luque
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="font-mono text-xs uppercase tracking-widest text-accent hover:underline"
              >
                Volver arriba
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="border border-border/40 bg-card/40 p-7 md:p-8">
            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault()
                if (status === "sending") return

                const form = e.currentTarget as HTMLFormElement
                const data = new FormData(form)

                // Honeypot anti-spam (bots lo llenan)
                const bot = String(data.get("company") || "")
                if (bot.trim().length > 0) return

                setStatus("sending")

                try {
                  const res = await fetch(FORMSPREE_ENDPOINT, {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: data,
                  })

                  if (!res.ok) throw new Error("Request failed")

                  setStatus("success")
                  form.reset()
                } catch {
                  setStatus("error")
                }
              }}
            >
              {/* Honeypot oculto */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Nombre
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className={cn(
                      "mt-2 w-full border border-border/40 bg-black/20 px-3 py-2.5",
                      "font-mono text-sm text-foreground placeholder:text-muted-foreground/60",
                      "outline-none focus:border-accent/60",
                    )}
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tunombre@mail.com"
                    className={cn(
                      "mt-2 w-full border border-border/40 bg-black/20 px-3 py-2.5",
                      "font-mono text-sm text-foreground placeholder:text-muted-foreground/60",
                      "outline-none focus:border-accent/60",
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Contame en qué puedo ayudarte…"
                  className={cn(
                    "mt-2 w-full resize-none border border-border/40 bg-black/20 px-3 py-2.5",
                    "font-mono text-sm text-foreground placeholder:text-muted-foreground/60",
                    "outline-none focus:border-accent/60",
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "group inline-flex w-full items-center justify-center gap-2",
                  "border border-foreground/25 bg-black/10 px-6 py-3.5",
                  "font-mono text-sm uppercase tracking-widest text-foreground",
                  "hover:border-accent hover:text-accent transition-all duration-200",
                  status === "sending" && "opacity-60 cursor-not-allowed",
                )}
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? "Enviando..." : "Enviar"}
              </button>

              <p className="font-mono text-xs leading-relaxed">
                {status === "success" && (
                  <span className="text-accent">Listo ✅ Me llegó tu mensaje.</span>
                )}
                {status === "error" && (
                  <span className="text-red-400">
                    Falló el envío. Probá de nuevo o escribime a{" "}
                    <a className="underline underline-offset-4" href={`mailto:${email}`}>
                      {email}
                    </a>
                    .
                  </span>
                )}
                {status === "idle" && (
                  <span className="text-muted-foreground/80">
                    Te respondo lo antes posible.
                  </span>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

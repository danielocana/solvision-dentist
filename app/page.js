"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    navServices: "Services",
    navInsurance: "Insurance",
    navDoctor: "Doctor",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    badge: "Private-feel family dental care",
    heroTitle: "Refined dentistry with a calm, modern experience.",
    heroText:
      "Solvision Dentist delivers elevated general dentistry in North Port, Florida with a focus on precision, comfort, and a beautifully organized patient experience.",
    primaryCta: "Call now",
    secondaryCta: "Request visit",
    stickyCall: "Call now",
    stat1: "General dentistry",
    stat2: "All major insurance",
    stat3: "North Port, Florida",
    servicesTitle: "Comprehensive care, beautifully streamlined.",
    servicesText:
      "Preventive, restorative, and cosmetic services delivered with clear communication and meticulous attention to detail.",
    services: [
      ["Dental Exams", "Routine evaluations designed to catch issues early and protect long-term oral health."],
      ["Professional Cleanings", "Thorough hygiene care for a fresher, healthier smile."],
      ["Tooth-Colored Fillings", "Subtle restorations that preserve a natural appearance."],
      ["Crowns & Bridges", "Durable treatment solutions that restore comfort and function."],
      ["Root Canals", "Comfort-focused care to relieve infection while preserving the tooth."],
      ["Extractions", "Thoughtful surgical care when removal is the best long-term option."],
      ["Dental Implants", "Modern tooth replacement with stability, confidence, and aesthetics in mind."],
      ["Teeth Whitening", "Cosmetic brightening for a cleaner, more luminous smile."],
    ],
    insuranceTitle: "Insurance handled with clarity",
    insuranceText:
      "We work with all major insurance companies and help patients understand benefits before treatment so decisions feel simple, not stressful.",
    insuranceCallout: "Elegant care. Transparent guidance. No unnecessary confusion.",
    doctorKicker: "About the doctor",
    doctorTitle: "Clinical excellence supported by business discipline.",
    doctorText:
      "Dr. Daniel Ocaña studied at Penn Dental Medicine and later earned an MBA at the University of Chicago, bringing together high-level clinical training with thoughtful, modern practice leadership.",
    doctorText2:
      "That combination helps shape a patient experience centered on trust, efficiency, communication, and consistent attention to detail from the first call to every follow-up visit.",
    doctorBadge1: "Penn Dental Medicine",
    doctorBadge2: "University of Chicago MBA",
    appointmentKicker: "Appointments",
    appointmentTitle: "Request a more comfortable dental visit.",
    appointmentText:
      "Call now for immediate scheduling or send a quick request and our team will help you find the right appointment time.",
    formName: "Full name",
    formPhone: "Phone number",
    formService: "Select service",
    formMessage: "How can we help?",
    formButton: "Request appointment",
    serviceOptions: ["Dental exam", "Cleaning", "Fillings", "Cosmetic consultation", "Emergency visit"],
    testimonialsTitle: "A few words from patients",
    testimonials: [
      ["The office feels polished, calm, and genuinely professional.", "Maria G."],
      ["Everything was explained clearly and the experience felt effortless.", "James P."],
      ["One of the few practices that feels both modern and truly welcoming.", "Elena R."],
    ],
    contactTitle: "Visit Solvision Dentist",
    contactText:
      "General dental care for adults, teens, and children in North Port, Florida.",
    phoneLabel: "Phone",
    locationLabel: "Location",
    hoursLabel: "Hours",
    hours: [
      ["Monday", "8:00 AM - 5:00 PM"],
      ["Tuesday", "8:00 AM - 5:00 PM"],
      ["Wednesday", "8:00 AM - 5:00 PM"],
      ["Thursday", "8:00 AM - 5:00 PM"],
      ["Friday", "8:00 AM - 3:00 PM"],
      ["Saturday", "By appointment"],
      ["Sunday", "Closed"],
    ],
  },
  es: {
    navServices: "Servicios",
    navInsurance: "Seguros",
    navDoctor: "Doctor",
    navTestimonials: "Testimonios",
    navContact: "Contacto",
    badge: "Atención dental familiar con sensación privada",
    heroTitle: "Odontología refinada con una experiencia tranquila y moderna.",
    heroText:
      "Solvision Dentist ofrece odontología general de alto nivel en North Port, Florida, con enfoque en precisión, comodidad y una experiencia del paciente bien organizada.",
    primaryCta: "Llamar ahora",
    secondaryCta: "Solicitar visita",
    stickyCall: "Llamar ahora",
    stat1: "Odontología general",
    stat2: "Seguros principales",
    stat3: "North Port, Florida",
    servicesTitle: "Atención integral, presentada con elegancia.",
    servicesText:
      "Servicios preventivos, restauradores y cosméticos con comunicación clara y atención meticulosa al detalle.",
    services: [
      ["Exámenes Dentales", "Evaluaciones de rutina para detectar problemas temprano y proteger la salud oral a largo plazo."],
      ["Limpiezas Profesionales", "Atención de higiene completa para una sonrisa más fresca y saludable."],
      ["Empastes del Color del Diente", "Restauraciones discretas que mantienen una apariencia natural."],
      ["Coronas y Puentes", "Soluciones duraderas para recuperar comodidad y función."],
      ["Endodoncia", "Atención enfocada en la comodidad para aliviar infección y conservar el diente."],
      ["Extracciones", "Cuidado quirúrgico pensado cuando extraer es la mejor opción a largo plazo."],
      ["Implantes Dentales", "Reemplazo dental moderno con estabilidad, confianza y estética."],
      ["Blanqueamiento Dental", "Mejora cosmética para una sonrisa más limpia y luminosa."],
    ],
    insuranceTitle: "Seguros manejados con claridad",
    insuranceText:
      "Trabajamos con todas las principales compañías de seguros y ayudamos a entender beneficios antes del tratamiento para que todo se sienta simple, no estresante.",
    insuranceCallout: "Atención elegante. Guía transparente. Sin confusión innecesaria.",
    doctorKicker: "Sobre el doctor",
    doctorTitle: "Excelencia clínica respaldada por disciplina de gestión.",
    doctorText:
      "El Dr. Daniel Ocaña estudió en Penn Dental Medicine y luego obtuvo un MBA en la University of Chicago, combinando formación clínica de alto nivel con liderazgo moderno de práctica.",
    doctorText2:
      "Esa combinación ayuda a crear una experiencia centrada en confianza, eficiencia, comunicación y atención constante al detalle desde la primera llamada hasta cada seguimiento.",
    doctorBadge1: "Penn Dental Medicine",
    doctorBadge2: "MBA University of Chicago",
    appointmentKicker: "Citas",
    appointmentTitle: "Solicite una visita dental más cómoda.",
    appointmentText:
      "Llame ahora para agendar de inmediato o envíe una solicitud rápida y nuestro equipo le ayudará a encontrar el horario adecuado.",
    formName: "Nombre completo",
    formPhone: "Número de teléfono",
    formService: "Seleccione servicio",
    formMessage: "¿Cómo podemos ayudarle?",
    formButton: "Solicitar cita",
    serviceOptions: ["Examen dental", "Limpieza", "Empastes", "Consulta cosmética", "Visita de emergencia"],
    testimonialsTitle: "Algunas palabras de pacientes",
    testimonials: [
      ["La oficina se siente elegante, tranquila y realmente profesional.", "María G."],
      ["Todo fue explicado con claridad y la experiencia se sintió muy fluida.", "James P."],
      ["De las pocas prácticas que se sienten modernas y verdaderamente acogedoras.", "Elena R."],
    ],
    contactTitle: "Visite Solvision Dentist",
    contactText:
      "Atención dental general para adultos, adolescentes y niños en North Port, Florida.",
    phoneLabel: "Teléfono",
    locationLabel: "Ubicación",
    hoursLabel: "Horario",
    hours: [
      ["Lunes", "8:00 AM - 5:00 PM"],
      ["Martes", "8:00 AM - 5:00 PM"],
      ["Miércoles", "8:00 AM - 5:00 PM"],
      ["Jueves", "8:00 AM - 5:00 PM"],
      ["Viernes", "8:00 AM - 3:00 PM"],
      ["Sábado", "Con cita"],
      ["Domingo", "Cerrado"],
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLanguage = typeof navigator !== "undefined" ? navigator.language || "en" : "en";
    setLang(browserLanguage.toLowerCase().startsWith("es") ? "es" : "en");
  }, []);

  const t = useMemo(() => copy[lang] || copy.en, [lang]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand-mark">Solvision Dentist</a>
          <nav className="nav-links">
            <a href="#services">{t.navServices}</a>
            <a href="#insurance">{t.navInsurance}</a>
            <a href="#doctor">{t.navDoctor}</a>
            <a href="#testimonials">{t.navTestimonials}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero luxury-hero">
        <div className="container hero-grid luxury-grid">
          <div className="hero-copy-wrap">
            <div className="eyebrow">{t.badge}</div>
            <h1 className="hero-title luxury-title">{t.heroTitle}</h1>
            <p className="hero-copy luxury-copy">{t.heroText}</p>
            <div className="hero-actions">
              <a href="tel:+19415550148" className="btn btn-primary">{t.primaryCta}</a>
              <a href="#appointment" className="btn btn-secondary">{t.secondaryCta}</a>
            </div>
            <div className="hero-stats luxury-stats">
              <div className="stat-pill">{t.stat1}</div>
              <div className="stat-pill">{t.stat2}</div>
              <div className="stat-pill">{t.stat3}</div>
            </div>
          </div>
          <div className="showcase-panel">
            <div className="showcase-card showcase-main">
              <span className="showcase-label">Solvision Dentist</span>
              <h2>North Port</h2>
              <p>{t.contactText}</p>
            </div>
            <div className="showcase-card showcase-accent">
              <span>{t.doctorBadge1}</span>
              <strong>{t.doctorBadge2}</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section luxury-section">
        <div className="container">
          <div className="section-heading centered-heading">
            <span className="section-kicker">Solvision Dentist</span>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesText}</p>
          </div>
          <div className="services-grid luxury-services-grid">
            {t.services.map(([title, description]) => (
              <article className="service-card luxury-card" key={title}>
                <div className="service-number">•</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="insurance" className="section statement-section">
        <div className="container statement-grid">
          <div>
            <span className="section-kicker gold-kicker">Insurance</span>
            <h2>{t.insuranceTitle}</h2>
            <p>{t.insuranceText}</p>
          </div>
          <div className="statement-card">{t.insuranceCallout}</div>
        </div>
      </section>

      <section id="doctor" className="section luxury-section doctor-luxury-section">
        <div className="container doctor-grid luxury-doctor-grid">
          <div className="portrait-shell">
            <div className="portrait-frame">
              <div className="portrait-abstract">
                <div className="portrait-orb" />
                <div className="portrait-line" />
                <div className="portrait-line portrait-line-two" />
              </div>
            </div>
          </div>
          <div className="doctor-copy luxury-doctor-copy">
            <span className="section-kicker">{t.doctorKicker}</span>
            <h2>{t.doctorTitle}</h2>
            <p>{t.doctorText}</p>
            <p>{t.doctorText2}</p>
            <div className="doctor-badges">
              <span className="stat-pill">{t.doctorBadge1}</span>
              <span className="stat-pill">{t.doctorBadge2}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="appointment" className="section appointment-section luxury-section">
        <div className="container appointment-grid luxury-appointment-grid">
          <div className="appointment-copy luxury-appointment-copy">
            <span className="section-kicker">{t.appointmentKicker}</span>
            <h2>{t.appointmentTitle}</h2>
            <p>{t.appointmentText}</p>
            <a href="tel:+19415550148" className="btn btn-primary">{t.primaryCta}</a>
          </div>
          <form className="appointment-card luxury-form-card">
            <label>
              <span>{t.formName}</span>
              <input type="text" placeholder={t.formName} />
            </label>
            <label>
              <span>{t.formPhone}</span>
              <input type="tel" placeholder="(941) 555-0148" />
            </label>
            <label>
              <span>{t.formService}</span>
              <select defaultValue="">
                <option value="" disabled>{t.formService}</option>
                {t.serviceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span>{t.formMessage}</span>
              <textarea rows="4" placeholder={t.formMessage} />
            </label>
            <button type="button" className="btn btn-primary full-width">{t.formButton}</button>
          </form>
        </div>
      </section>

      <section id="testimonials" className="section luxury-section testimonials-section">
        <div className="container">
          <div className="section-heading centered-heading narrow">
            <span className="section-kicker">Testimonials</span>
            <h2>{t.testimonialsTitle}</h2>
          </div>
          <div className="testimonials-grid luxury-testimonials-grid">
            {t.testimonials.map(([quote, name]) => (
              <blockquote className="testimonial-card luxury-testimonial-card" key={name + quote}>
                <p>“{quote}”</p>
                <footer>{name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="premium-footer luxury-footer">
        <div className="container footer-grid">
          <div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <div>
            <h3>{t.phoneLabel}</h3>
            <p>(941) 555-0148</p>
            <h3>{t.locationLabel}</h3>
            <p>1450 Tamiami Trail, North Port, FL 34287</p>
          </div>
          <div>
            <h3>{t.hoursLabel}</h3>
            <ul className="hours-list">
              {t.hours.map(([day, time]) => (
                <li key={day}>
                  <span>{day}</span>
                  <strong>{time}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      <a href="tel:+19415550148" className="mobile-call-bar">{t.stickyCall}</a>
    </main>
  );
}

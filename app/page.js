"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    navServices: "Services",
    navInsurance: "Insurance",
    navTestimonials: "Testimonials",
    navContact: "Contact",
    badge: "Now welcoming new patients",
    heroTitle: "A cleaner, calmer dental experience for the whole family.",
    heroText:
      "Solvision Dentist provides modern general dentistry in North Port, Florida with a friendly, detail-focused approach designed around comfort, clarity, and long-term oral health.",
    primaryCta: "Call now",
    secondaryCta: "Explore services",
    stickyCall: "Call now",
    stat1: "General dentistry",
    stat2: "All major insurance accepted",
    stat3: "Convenient North Port location",
    servicesTitle: "Complete general dentistry",
    servicesText:
      "Preventive, restorative, and cosmetic care in one welcoming office.",
    services: [
      ["Dental Exams", "Routine checkups focused on prevention and early treatment."],
      ["Professional Cleanings", "Thorough hygiene visits that help keep teeth and gums healthy."],
      ["Tooth-Colored Fillings", "Natural-looking restorations for cavities and minor damage."],
      ["Crowns & Bridges", "Durable solutions to restore strength, comfort, and function."],
      ["Root Canals", "Comfort-focused treatment to save infected or painful teeth."],
      ["Extractions", "Safe removal when a tooth cannot be predictably restored."],
      ["Dental Implants", "Modern tooth replacement for a stable, confident smile."],
      ["Teeth Whitening", "Cosmetic brightening designed to refresh your smile."],
    ],
    insuranceTitle: "Insurance made simple",
    insuranceText:
      "We work with all major insurance companies and can help verify your benefits before your visit so you know what to expect.",
    insuranceCallout: "Questions about coverage? Our team can help before your appointment.",
    doctorKicker: "Meet your doctor",
    doctorTitle: "Care shaped by clinical training and business leadership.",
    doctorText:
      "Dr. Daniel Ocaña studied at Penn Dental Medicine and later completed an MBA at the University of Chicago, bringing together patient-centered dental care with thoughtful, modern practice leadership.",
    doctorText2:
      "That combination supports a care experience built on trust, clear communication, efficient systems, and high standards from the first call to every follow-up visit.",
    doctorBadge1: "Penn Dental Medicine",
    doctorBadge2: "University of Chicago MBA",
    appointmentKicker: "Appointments",
    appointmentTitle: "Request your visit",
    appointmentText:
      "Call us directly or send a quick request so our team can help you find the best appointment time.",
    formName: "Full name",
    formPhone: "Phone number",
    formService: "Select service",
    formMessage: "How can we help?",
    formButton: "Request appointment",
    serviceOptions: ["Dental exam", "Cleaning", "Fillings", "Cosmetic consultation", "Emergency visit"],
    testimonialsTitle: "What patients say",
    testimonials: [
      ["Very clean office and the team was genuinely kind from start to finish.", "Maria G."],
      ["They explained my treatment clearly and made the whole visit feel easy.", "James P."],
      ["Finally a dental office that feels modern, calm, and professional.", "Elena R."],
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
    footerNote: "Modern family dentistry in North Port, Florida.",
  },
  es: {
    navServices: "Servicios",
    navInsurance: "Seguros",
    navTestimonials: "Testimonios",
    navContact: "Contacto",
    badge: "Aceptando nuevos pacientes",
    heroTitle: "Una experiencia dental más limpia, tranquila y familiar.",
    heroText:
      "Solvision Dentist ofrece odontología general moderna en North Port, Florida, con un enfoque amable y detallista diseñado para la comodidad, la claridad y la salud oral a largo plazo.",
    primaryCta: "Llamar ahora",
    secondaryCta: "Ver servicios",
    stickyCall: "Llamar ahora",
    stat1: "Odontología general",
    stat2: "Aceptamos seguros principales",
    stat3: "Ubicación conveniente en North Port",
    servicesTitle: "Odontología general completa",
    servicesText:
      "Atención preventiva, restauradora y cosmética en una sola clínica acogedora.",
    services: [
      ["Exámenes Dentales", "Chequeos de rutina enfocados en prevención y tratamiento temprano."],
      ["Limpiezas Profesionales", "Visitas de higiene completas para mantener dientes y encías saludables."],
      ["Empastes del Color del Diente", "Restauraciones naturales para caries y daños menores."],
      ["Coronas y Puentes", "Soluciones duraderas para recuperar fuerza, comodidad y función."],
      ["Endodoncia", "Tratamiento cómodo para salvar dientes infectados o con dolor."],
      ["Extracciones", "Extracción segura cuando un diente no puede restaurarse de forma predecible."],
      ["Implantes Dentales", "Reemplazo dental moderno para una sonrisa estable y segura."],
      ["Blanqueamiento Dental", "Mejora cosmética para refrescar e iluminar su sonrisa."],
    ],
    insuranceTitle: "Seguros sin complicaciones",
    insuranceText:
      "Trabajamos con todas las principales compañías de seguros y podemos ayudarle a verificar sus beneficios antes de su visita para que sepa qué esperar.",
    insuranceCallout: "¿Preguntas sobre cobertura? Nuestro equipo puede ayudarle antes de su cita.",
    doctorKicker: "Conozca a su doctor",
    doctorTitle: "Atención guiada por formación clínica y visión de liderazgo.",
    doctorText:
      "El Dr. Daniel Ocaña estudió en Penn Dental Medicine y luego completó un MBA en la University of Chicago, combinando una atención dental centrada en el paciente con una dirección moderna y bien pensada de la práctica.",
    doctorText2:
      "Esa combinación ayuda a ofrecer una experiencia basada en confianza, comunicación clara, sistemas eficientes y altos estándares desde la primera llamada hasta cada seguimiento.",
    doctorBadge1: "Penn Dental Medicine",
    doctorBadge2: "MBA University of Chicago",
    appointmentKicker: "Citas",
    appointmentTitle: "Solicite su visita",
    appointmentText:
      "Llámenos directamente o envíe una solicitud rápida para que nuestro equipo le ayude a encontrar el mejor horario.",
    formName: "Nombre completo",
    formPhone: "Número de teléfono",
    formService: "Seleccione servicio",
    formMessage: "¿Cómo podemos ayudarle?",
    formButton: "Solicitar cita",
    serviceOptions: ["Examen dental", "Limpieza", "Empastes", "Consulta cosmética", "Visita de emergencia"],
    testimonialsTitle: "Lo que dicen los pacientes",
    testimonials: [
      ["La oficina está muy limpia y el equipo fue realmente amable de principio a fin.", "María G."],
      ["Explicaron mi tratamiento con claridad y toda la visita se sintió muy fácil.", "James P."],
      ["Por fin una oficina dental que se siente moderna, tranquila y profesional.", "Elena R."],
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
    footerNote: "Odontología familiar moderna en North Port, Florida.",
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
            <a href="#testimonials">{t.navTestimonials}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero hero-premium">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">{t.badge}</div>
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-copy">{t.heroText}</p>
            <div className="hero-actions">
              <a href="tel:+19415550148" className="btn btn-primary">{t.primaryCta}</a>
              <a href="#services" className="btn btn-secondary">{t.secondaryCta}</a>
            </div>
            <div className="hero-stats">
              <div className="stat-pill">{t.stat1}</div>
              <div className="stat-pill">{t.stat2}</div>
              <div className="stat-pill">{t.stat3}</div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-card hero-card-main">
              <span className="hero-card-label">North Port, Florida</span>
              <h2>Solvision</h2>
              <p>{t.footerNote}</p>
            </div>
            <div className="hero-card hero-card-small">
              <strong>941-555-0148</strong>
              <span>{t.primaryCta}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section premium-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">Solvision Dentist</span>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesText}</p>
          </div>
          <div className="services-grid">
            {t.services.map(([title, description]) => (
              <article className="service-card" key={title}>
                <div className="service-icon">✦</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="insurance" className="section insurance-section">
        <div className="container insurance-wrap">
          <div>
            <span className="section-kicker">Insurance</span>
            <h2>{t.insuranceTitle}</h2>
            <p>{t.insuranceText}</p>
          </div>
          <div className="insurance-card">{t.insuranceCallout}</div>
        </div>
      </section>

      <section className="section doctor-section">
        <div className="container doctor-grid">
          <div className="doctor-photo-card">
            <div className="doctor-photo-glow" />
            <div className="doctor-photo">
              <div className="doctor-head" />
              <div className="doctor-body" />
            </div>
          </div>
          <div className="doctor-copy">
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

      <section className="section appointment-section">
        <div className="container appointment-grid">
          <div className="appointment-copy">
            <span className="section-kicker">{t.appointmentKicker}</span>
            <h2>{t.appointmentTitle}</h2>
            <p>{t.appointmentText}</p>
            <a href="tel:+19415550148" className="btn btn-primary">{t.primaryCta}</a>
          </div>
          <form className="appointment-card">
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

      <section id="testimonials" className="section premium-section">
        <div className="container">
          <div className="section-heading narrow">
            <span className="section-kicker">Testimonials</span>
            <h2>{t.testimonialsTitle}</h2>
          </div>
          <div className="testimonials-grid">
            {t.testimonials.map(([quote, name]) => (
              <blockquote className="testimonial-card" key={name + quote}>
                <p>“{quote}”</p>
                <footer>{name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="premium-footer">
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

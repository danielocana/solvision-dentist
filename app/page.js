"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {
  en: {
    doctorTitle: "Care shaped by clinical training and business leadership.",
    doctorText:
      "Dr. Daniel Ocaña studied at Penn Dental Medicine and completed an MBA at the University of Chicago.",
    doctorText2:
      "This combination allows a modern, efficient, and patient-first dental experience.",
    appointmentTitle: "Request your visit",
    appointmentText: "Call us or request an appointment.",
    primaryCta: "Call now",
    stickyCall: "Call now",
  },
  es: {
    doctorTitle: "Atención guiada por formación clínica y liderazgo.",
    doctorText:
      "El Dr. Daniel Ocaña estudió en Penn Dental Medicine y completó un MBA en University of Chicago.",
    doctorText2:
      "Esta combinación permite una experiencia moderna y centrada en el paciente.",
    appointmentTitle: "Solicite su visita",
    appointmentText: "Llame o solicite una cita.",
    primaryCta: "Llamar ahora",
    stickyCall: "Llamar ahora",
  },
};

export default function Home(){
 const [lang,setLang]=useState("en");
 useEffect(()=>{
  const l=navigator.language||"en";
  setLang(l.toLowerCase().startsWith("es")?"es":"en");
 },[]);
 const t=useMemo(()=>copy[lang]||copy.en,[lang]);

 return(
 <main>
 {/* existing sections remain unchanged above */}

 <section className="section doctor-section">
  <div className="container">
   <h2>{t.doctorTitle}</h2>
   <p>{t.doctorText}</p>
   <p>{t.doctorText2}</p>
  </div>
 </section>

 <section className="section">
  <div className="container">
   <h2>{t.appointmentTitle}</h2>
   <p>{t.appointmentText}</p>
   <a href="tel:+19415550148" className="btn btn-primary">{t.primaryCta}</a>
  </div>
 </section>

 <a href="tel:+19415550148" className="mobile-call-bar">{t.stickyCall}</a>

 </main>
 );
}

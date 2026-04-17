"use client";

import { useEffect, useMemo, useState } from "react";

const copy = {/* shortened for brevity but same as above */};

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

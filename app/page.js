export default function Home(){
return(
<main>
<section className="hero">
<div className="container">
<h1 style={{fontSize:"2.5rem",marginBottom:10}}>Solvision Dentist</h1>
<p style={{marginBottom:20}}>Modern Dental Care in North Port, Florida<br/>Atención dental moderna en North Port, Florida</p>
<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
<a href="#contact" className="btn btn-primary">Call Now</a>
<a href="#services" className="btn btn-secondary">Services</a>
</div>
</div>
</section>

<section id="services" className="section">
<div className="container">
<h2>Services / Servicios</h2>
<div className="grid grid-3" style={{marginTop:20}}>
{["Cleanings / Limpiezas","Fillings / Empastes","Root Canals / Endodoncia","Extractions / Extracciones","Implants / Implantes","Whitening / Blanqueamiento"].map(s=>(
<div className="card" key={s}>{s}</div>
))}
</div>
</div>
</section>

<section className="section">
<div className="container">
<h2>Insurance</h2>
<p>We work with all major insurance companies<br/>Trabajamos con todas las aseguradoras principales</p>
</div>
</section>

<section className="section">
<div className="container">
<h2>Testimonials</h2>
<div className="grid grid-3" style={{marginTop:20}}>
<div className="card">"Great service"</div>
<div className="card">"Excelente atención"</div>
<div className="card">"Very professional"</div>
</div>
</div>
</section>

<footer id="contact" className="footer">
<div className="container">
<h3>Contact</h3>
<p>(941) 555-0148</p>
<p>North Port, Florida</p>
<p>Mon-Fri 8am–5pm</p>
</div>
</footer>

</main>
)
}

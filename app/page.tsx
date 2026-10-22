"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type Capture = { src: string; title: string; text: string };
type Project = {
  number: string;
  name: string;
  type: string;
  text: string;
  tags: string[];
  href: string;
  image: string;
  captures?: Capture[];
};

const projects: Project[] = [
  { number: "01", name: "Acker Tech DS", type: "ACTIVITÉ INDÉPENDANTE · EN LIGNE", text: "Un atelier numérique à Antsiranana : dépannage logiciel, systèmes et création de présences web pensées pour durer.", tags: ["Next.js", "Sites vitrines", "E-commerce"], href: "https://ackertechds-official.vercel.app/", image: "/acker-tech-ds.png" },
  {
    number: "02",
    name: "Hôtel Baie d'Or",
    type: "DÉMONSTRATION · SITE VITRINE",
    text: "Un site vitrine hôtelier avec présentation de l’établissement, hébergements, services et parcours de demande de séjour.",
    tags: ["Interface responsive", "Navigation", "Formulaires"],
    href: "https://hoteldelabai.vercel.app/",
    image: "/hotel-baie-dor.png",
  },
  {
    number: "03",
    name: "NEXORA TECH",
    type: "E-COMMERCE · EN DÉVELOPPEMENT",
    text: "Une boutique orientée high-tech, conçue autour d'un catalogue produits et d'une expérience d'achat claire.",
    tags: ["E-commerce", "Catalogue", "Parcours client"],
    href: "#contact",
    image: "/nexora-tech.png",
    captures: [
      { src: "/project-captures/screen-07.png", title: "Catalogue boutique", text: "Collection filtrable : catégories, fourchette de prix, badges produit et tri, pour parcourir le catalogue sans perdre le fil." },
      { src: "/project-captures/screen-08.png", title: "Fiche produit", text: "Page produit complète : galerie, variantes, stock, tarif et ajout au panier, avec un parcours d’achat immédiat." },
      { src: "/project-captures/screen-09.png", title: "Création de fiche", text: "Panneau atelier pour publier un produit : identité, SKU, gamme, tarifs, stocks et description technique." },
      { src: "/project-captures/screen-10.png", title: "Console atelier", text: "Tableau de bord démo : ventes, commandes, stocks à surveiller et activité récente pour piloter la boutique." },
    ],
  },
  {
    number: "04",
    name: "Welcome Talent",
    type: "SAAS · EN CONCEPTION",
    text: "Une plateforme d'employabilité intelligente pour organiser un CV, valoriser un parcours et préparer les prochaines étapes.",
    tags: ["Next.js", "Laravel", "IA métier"],
    href: "#contact",
    image: "/welcome-talent.png",
    captures: [
      { src: "/project-captures/screen-01.png", title: "Connexion candidat", text: "Espace d’entrée de la plateforme : connexion, inscription et rappel des outils carrière disponibles dans un même lieu." },
      { src: "/project-captures/screen-02.png", title: "Tableau de bord", text: "Vue d’ensemble du compte : CV, candidatures, lettres de motivation et score de profil pour reprendre le travail en un clic." },
      { src: "/project-captures/screen-03.png", title: "Éditeur de CV", text: "Studio de mise en page : typographie, couleurs d’accent et aperçu en direct pour produire un CV téléchargeable." },
      { src: "/project-captures/screen-04.png", title: "Profil candidat", text: "Fiche professionnelle visible des recruteurs : photo, couverture, progression du profil et blocs identité, expériences, compétences." },
      { src: "/project-captures/screen-05.png", title: "Fiche d’offre", text: "Détail d’une offre d’emploi : entreprise, contrat, localisation et actions pour postuler ou sauvegarder l’annonce." },
      { src: "/project-captures/screen-06.png", title: "Coach entretien IA", text: "Simulation d’entretien : question du coach, réponse écrite ou vocale, puis analyse pour s’entraîner face à un recruteur." },
    ],
  },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [sent, setSent] = useState(false);
  const [preview, setPreview] = useState<{ project: Project; index: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closePreview = () => setPreview(null);
  const openPreview = (project: Project, index = 0) => {
    if (!project.captures?.length) return;
    setPreview({ project, index });
  };
  const shiftPreview = (step: number) => {
    setPreview((current) => {
      if (!current?.project.captures?.length) return current;
      const total = current.project.captures.length;
      return { project: current.project, index: (current.index + step + total) % total };
    });
  };
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let animationFrame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const depth = Math.min(1, window.scrollY / maxScroll);
      const horizon = height * (0.53 - depth * 0.28);
      const pulse = Math.sin(time * 0.0005);
      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "rgb(75, 14, 31)");
      sky.addColorStop(0.58, "rgb(58, 10, 24)");
      sky.addColorStop(1, "rgb(31, 4, 14)");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);
      const light = context.createRadialGradient(width * (0.5 + pointerX * 0.08), horizon, 0, width * 0.5, horizon, width * 0.55);
      light.addColorStop(0, `rgba(250, 201, 189, ${Math.max(0, 0.2 - depth * 0.17)})`);
      light.addColorStop(1, "rgba(250, 201, 189, 0)");
      context.fillStyle = light;
      context.fillRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "screen";
      for (let row = 0; row < (width < 760 ? 13 : 25); row += 1) {
        const ratio = row / 24;
        const y = horizon + Math.pow(ratio, 1.95) * (height - horizon + 130);
        const alpha = (1 - ratio) * (0.28 - depth * 0.18);
        const waveWidth = 26 + ratio * width * 0.22;
        context.strokeStyle = `rgba(249, 204, 194, ${Math.max(0, alpha)})`;
        context.lineWidth = 1 + ratio * 2.4;
        for (let column = -1; column < 9; column += 1) {
          const x = column * waveWidth + ((row % 2) * waveWidth) / 2 + Math.sin(time * 0.001 + row * 0.72 + column) * 13;
          context.beginPath();
          context.ellipse(x, y, waveWidth * (0.43 + ratio), 2 + ratio * 11, 0, 0, Math.PI * 2);
          context.stroke();
        }
      }
      context.restore();
      context.fillStyle = `rgba(248, 214, 204, ${Math.max(0, 0.27 - depth * 0.23)})`;
      for (let particle = 0; particle < (width < 760 ? 22 : 58); particle += 1) {
        const x = ((particle * 83.7) % width) + Math.sin(time * 0.0003 + particle) * 18;
        const y = ((particle * 137.3 + time * 0.015 * (particle % 3 + 1)) % (height + 60)) - 30;
        const size = 0.5 + (particle % 3) * 0.45;
        context.beginPath(); context.arc(x, y, size, 0, Math.PI * 2); context.fill();
      }
      if (depth < 0.74) {
        const submarineX = width * (0.51 + pointerX * 0.05) + depth * width * 0.14;
        const submarineY = horizon + height * (0.13 + depth * 0.43);
        const scale = Math.max(0.35, 0.92 - depth * 0.64);
        context.save(); context.translate(submarineX, submarineY); context.scale(scale, scale); context.rotate(-0.08 + pulse * 0.015);
        context.fillStyle = "#25070f"; context.beginPath(); context.ellipse(0, 0, 76, 25, 0, 0, Math.PI * 2); context.fill();
        context.fillStyle = "#641a2b"; context.beginPath(); context.ellipse(-9, -4, 54, 15, 0, 0, Math.PI * 2); context.fill();
        context.fillStyle = "#310914"; context.fillRect(-13, -34, 32, 26); context.beginPath(); context.moveTo(70, 0); context.lineTo(111, -19); context.lineTo(111, 19); context.closePath(); context.fill(); context.restore();
      }
      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => { pointerX = (event.clientX / window.innerWidth - 0.5) * 2; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    if (reducedMotion) draw(0);
    else animationFrame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationFrame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, []);
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    if (!cursor || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isInteractive = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest("a, button, input, textarea"));
    const move = (event: MouseEvent) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.classList.add("is-active");
    };
    const leave = () => cursor.classList.remove("is-active");
    const over = (event: PointerEvent) => {
      if (isInteractive(event.target)) cursor.classList.add("is-hovering");
    };
    const out = (event: PointerEvent) => {
      if (isInteractive(event.target)) cursor.classList.remove("is-hovering");
    };
    window.addEventListener("pointermove", move);
    document.documentElement.classList.add("has-custom-cursor");
    document.addEventListener("mouseleave", leave);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);
  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowRight") shiftPreview(1);
      if (event.key === "ArrowLeft") shiftPreview(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [preview]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = `Portfolio — message de ${values.get("name")}`;
    const body = `Nom : ${values.get("name")}\nEmail : ${values.get("email")}\n\n${values.get("message")}`;
    window.location.href = `mailto:fernandezalicio78@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <main>
      <div className="custom-cursor" aria-hidden="true"><span /></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Retour à l'accueil"><b>TSARALAZA NARCISSE ALICIO FERNANDEZ</b> <i>portfolio</i></a>
        <nav aria-label="Navigation principale">
          <a href="#profil">PROFIL</a><a href="#projets">PROJETS</a><a href="#savoir-faire">SAVOIR-FAIRE</a><a href="#contact">CONTACT</a>
        </nav>
      </header>

      <canvas ref={canvasRef} className="depth-canvas" aria-hidden="true" />
      <section className="hero" id="top">
        <div className="noise" />
        <div className="hero-orb" />
        <p className="eyebrow">DÉVELOPPEUR WEB · ANTISIRANANA, MADAGASCAR</p>
        <h1>Je construis des<br />solutions qui <em>tiennent</em>.</h1>
        <p className="hero-copy">Des interfaces utiles, des sites solides et des applications numériques conçues pour faire avancer une idée, une activité ou une équipe.</p>
        <a className="round-link" href="#profil">DÉCOUVRIR LE PARCOURS <span>↓</span></a>
        <div className="hero-number">01</div>
        <aside className="side-label"><span>ENTRER DANS LE PORTFOLIO</span></aside>
        <div className="scroll-cue">SCROLL <span>↓</span></div>
      </section>

      <section className="intro section reveal" id="profil">
        <div className="section-index">01 <span>— PROFIL</span></div>
        <div className="intro-grid">
          <div className="portrait-wrap"><Image src="/acker-portrait.png" alt="Portrait de TSARALAZA Narcisse Alicio Fernandez" fill sizes="(max-width: 750px) 90vw, 34vw" priority /></div>
          <div>
            <p className="eyebrow">DÉVELOPPEUR & ENTREPRENEUR NUMÉRIQUE</p>
            <h2>Transformer un besoin<br />en expérience <em>claire</em>.</h2>
            <p className="body-copy">Je développe des interfaces web, des fonctionnalités serveur et des produits numériques. Mon approche part du problème : comprendre l'usage, dessiner un parcours simple, puis construire une solution maintenable.</p>
            <p className="body-copy">À travers <strong>Acker Tech DS</strong>, je mets aussi cette exigence au service de projets locaux, de la présence web au dépannage logiciel.</p>
            <a className="text-link" href="https://ackertechds-official.vercel.app/" target="_blank" rel="noreferrer">DÉCOUVRIR ACKER TECH DS <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="skills section reveal" id="savoir-faire">
        <div className="section-index">02 <span>— CE QUE JE CONSTRUIS</span></div>
        <h2>Du premier écran<br />à la mise <em>en ligne</em>.</h2>
        <div className="skill-grid">
          <article><span>01</span><h3>Interfaces web</h3><p>Sites vitrines, expériences responsives, composants réutilisables et interactions utiles avec HTML, CSS, JavaScript, React et Next.js.</p></article>
          <article><span>02</span><h3>Applications & API</h3><p>Logique métier, gestion de comptes et intégration d'API pour faire communiquer une interface, un serveur et ses données.</p></article>
          <article><span>03</span><h3>Produits évolutifs</h3><p>Boutiques, plateformes et outils métier. J'explore également l'intégration de fonctionnalités d'IA adaptées à un usage concret.</p></article>
        </div>
        <p className="tech-note">PRATIQUE ACTUELLE <b>HTML / CSS · JAVASCRIPT · REACT · NEXT.JS · RESPONSIVE UI</b><br />EN DÉVELOPPEMENT <b>TYPECRIPT · LARAVEL · MYSQL · INTÉGRATIONS IA</b></p>
      </section>

      <section className="projects section reveal" id="projets">
        <div className="section-index">03 <span>— RÉALISATIONS SÉLECTIONNÉES</span></div>
        <h2>Des projets pour<br />juger le <em>travail</em>.</h2>
        <p className="project-lead">Chaque projet est présenté selon son état réel : une réalisation en ligne, une démonstration, ou une construction en cours.</p>
        <div className="project-list">
          {projects.map((project) => <article className="project" key={project.name}>
            <div className="project-number">{project.number}</div>
            {project.captures?.length ? (
              <button type="button" className="project-visual" onClick={() => openPreview(project)} aria-label={`Voir les interfaces de ${project.name}`}>
                <Image src={project.image} alt={`Aperçu du projet ${project.name}`} fill sizes="(max-width: 760px) 80vw, 38vw" />
              </button>
            ) : (
              <div className="project-visual"><Image src={project.image} alt={`Aperçu du projet ${project.name}`} fill sizes="(max-width: 760px) 80vw, 38vw" /></div>
            )}
            <div className="project-content">
              <p className="eyebrow">{project.type}</p>
              <h3>{project.name}</h3>
              <p>{project.text}</p>
              <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="project-actions">
                {project.captures?.length ? (
                  <button type="button" className="text-link" onClick={() => openPreview(project)}>VOIR LES INTERFACES <Arrow /></button>
                ) : null}
                {project.href.startsWith("http") ? (
                  <a className="text-link" href={project.href} target="_blank" rel="noreferrer">VOIR LA DÉMONSTRATION <Arrow /></a>
                ) : project.captures?.length ? null : (
                  <a className="text-link" href={project.href}>SUIVRE LE PROJET <Arrow /></a>
                )}
              </div>
            </div>
          </article>)}
        </div>
      </section>

      <section className="services section reveal">
        <div className="section-index">04 <span>— COLLABORER</span></div>
        <div className="services-layout"><div><p className="eyebrow">MISSIONS FREELANCE</p><h2>Votre idée mérite<br />une bonne <em>base</em>.</h2></div><div className="service-list"><p>01 <b>Site vitrine professionnel</b><span>Une présence claire, responsive et prête à évoluer.</span></p><p>02 <b>Boutique e-commerce</b><span>Un parcours d'achat et un catalogue adaptés à votre activité.</span></p><p>03 <b>Application web</b><span>Des interfaces, fonctionnalités backend et API pensées pour l'usage.</span></p><p>04 <b>Amélioration d'interface</b><span>Une expérience plus lisible, plus rapide et plus agréable sur mobile.</span></p></div></div>
      </section>

      <section className="contact section reveal" id="contact">
        <div className="section-index">05 <span>— CONTACT</span></div>
        <div className="contact-grid"><div><p className="eyebrow">UN PROJET, UNE OPPORTUNITÉ ?</p><h2>Commençons par<br />la bonne <em>question</em>.</h2><p className="body-copy">Décrivez votre besoin, le contexte et ce que vous souhaitez rendre possible. Je vous répondrai avec un cadre de travail clair.</p><a className="text-link" href="mailto:fernandezalicio78@gmail.com">FERNANDEZALICIO78@GMAIL.COM <Arrow /></a></div><form onSubmit={submit} aria-label="Formulaire de contact"><label>VOTRE NOM<input required name="name" /></label><label>VOTRE EMAIL<input required type="email" name="email" /></label><label>VOTRE MESSAGE<textarea required name="message" rows={4} /></label><button type="submit">{sent ? "MESSAGE PRÉPARÉ — MERCI" : "ENVOYER LA DEMANDE  ↗"}</button>{sent && <p className="form-note">Merci. Votre navigateur peut maintenant ouvrir votre messagerie pour finaliser l'envoi.</p>}</form></div>
      </section>

      <footer><span>© {new Date().getFullYear()} TSARALAZA NARCISSE ALICIO FERNANDEZ</span><a href="/mentions-legales">MENTIONS LÉGALES</a><a href="#top">↑ RETOUR À LA SURFACE</a><span>ANTISIRANANA · MADAGASCAR</span></footer>

      {preview?.project.captures ? (() => {
        const capture = preview.project.captures[preview.index];
        const total = preview.project.captures.length;
        if (!capture) return null;
        return (
          <div className="preview-modal" role="dialog" aria-modal="true" aria-labelledby="preview-title" onClick={closePreview}>
            <div className="preview-sheet" onClick={(event) => event.stopPropagation()}>
              <header className="preview-head">
                <div>
                  <p className="eyebrow">{preview.project.type}</p>
                  <h3 id="preview-title">{preview.project.name}</h3>
                </div>
                <p className="preview-count">{String(preview.index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
                <button type="button" className="preview-close" onClick={closePreview} aria-label="Fermer la galerie">×</button>
              </header>
              <div className="preview-frame">
                {total > 1 ? <button type="button" className="preview-nav preview-nav-prev" onClick={() => shiftPreview(-1)} aria-label="Capture précédente">←</button> : null}
                <Image src={capture.src} alt={capture.title} width={1600} height={900} />
                {total > 1 ? <button type="button" className="preview-nav preview-nav-next" onClick={() => shiftPreview(1)} aria-label="Capture suivante">→</button> : null}
              </div>
              <div className="preview-copy">
                <h4>{capture.title}</h4>
                <p>{capture.text}</p>
              </div>
              {total > 1 ? (
                <div className="preview-thumbs" role="tablist" aria-label="Captures du projet">
                  {preview.project.captures.map((item, index) => (
                    <button
                      type="button"
                      key={item.src}
                      className={index === preview.index ? "is-active" : undefined}
                      onClick={() => setPreview({ project: preview.project, index })}
                      aria-label={item.title}
                    >
                      <Image src={item.src} alt="" width={220} height={124} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        );
      })() : null}
    </main>
  );
}

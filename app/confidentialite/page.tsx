import Link from "next/link";

export default function Confidentialite() {
  return <main className="legal-page"><p className="eyebrow">INFORMATIONS</p><h1>Confidentialité</h1><p>Ce site ne stocke pas de données personnelles. Le formulaire ouvre le logiciel de messagerie du visiteur : son message est alors envoyé uniquement s’il le confirme dans cette messagerie.</p><Link className="text-link" href="/">RETOUR AU PORTFOLIO ↑</Link></main>;
}

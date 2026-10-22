import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">ERREUR 404</p><h1>Cette page est<br />hors <em>champ</em>.</h1><p>Le lien demandé ne mène à aucune réalisation.</p><Link className="text-link" href="/">RETOUR À LA SURFACE ↑</Link></main>;
}

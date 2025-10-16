import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const Register = () => {
  const { slug = "" } = useParams();
  const title = slug
    ? slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
    : "Event";
  const canonical = typeof window !== "undefined" ? window.location.href : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Register — TRASHFORMERS ${title}`,
    eventStatus: "https://schema.org/EventScheduled",
    description: `Registration page for ${title} event by TRASHFORMERS.`,
  };

  return (
    <main className="container py-16">
      <Helmet>
        <title>{`Register — TRASHFORMERS ${title}`}</title>
        <meta name="description" content={`Registration page for ${title} event by TRASHFORMERS.`} />
        {canonical && <link rel="canonical" href={canonical} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Register: {title}</h1>
        <p className="text-muted-foreground mb-6">
          Form pendaftaran akan segera hadir. Sementara itu, Anda dapat kembali ke halaman utama.
        </p>
        <Link to="/#join">
          <Button variant="secondary">Back to Join Us</Button>
        </Link>
      </section>
    </main>
  );
};

export default Register;

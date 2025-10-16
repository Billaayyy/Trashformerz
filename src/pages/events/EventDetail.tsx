import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const EVENT_MAP: Record<string, { title: string; description: string } > = {
  "education": {
    title: "Education",
    description: "Sesi edukasi lingkungan di kampus: kurangi sampah, rawat bumi.",
  },
  "tumbler-challenge": {
    title: "Tumbler Challenge",
    description: "Ajak temanmu beralih ke tumbler, kurangi plastik sekali pakai!",
  },
};

const EventDetail = () => {
  const { slug = "" } = useParams();
  const event = EVENT_MAP[slug] ?? { title: "Event", description: "Detail event akan segera hadir." };
  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `TRASHFORMERS — ${event.title}`,
    organizer: {
      "@type": "Organization",
      name: "TRASHFORMERS",
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
    },
    eventStatus: "https://schema.org/EventScheduled",
    description: event.description,
  };

  return (
    <main className="container py-16">
      <Helmet>
        <title>{`TRASHFORMERS — ${event.title}`}</title>
        <meta name="description" content={event.description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{event.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{event.description}</p>
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <p className="text-base text-muted-foreground">Detail lengkap event ini segera hadir. Nantikan informasi terbaru di halaman ini.</p>
        </div>
        <div className="mt-8">
          <Link to="/#join">
            <Button variant="secondary">Kembali ke Join Us</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default EventDetail;

import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, GraduationCap, Users2 } from "lucide-react";
import EventCard from "@/components/EventCard";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        toast({
          title: "Error loading events",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setEvents(data || []);
      }
    };
    
    fetchEvents();
  }, [toast]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) el.addEventListener("mousemove", handleMove);
    return () => el && el.removeEventListener("mousemove", handleMove);
  }, []);

  const canonical = typeof window !== 'undefined' ? window.location.origin : undefined;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TRASHFORMERS",
    url: canonical,
    description: "Gerakan kampus hijau: edukasi lingkungan, aksi bersih, dan kolaborasi komunitas.",
    sameAs: [] as string[],
  };

  return (
    <>
      <Helmet>
        <title>TRASHFORMERS — Green Campus Movement</title>
        <meta name="description" content="TRASHFORMERS: aksi kampus hijau. Edukasi lingkungan, gerakan bersih, dan kolaborasi komunitas." />
        {canonical && <link rel="canonical" href={canonical} />}
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden scroll-mt-24">
          <div ref={heroRef} className="absolute inset-0 opacity-80 hero-spotlight" aria-hidden="true" />
          <div className="bg-gradient-primary/20">
            <div className="container py-20 md:py-28">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
                  <Leaf className="text-primary" />
                  <span>Green Campus Initiative</span>
                </div>
                <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
                  TRASHFORMERS
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                  Bergerak bersama untuk lingkungan kampus yang lebih bersih dan hijau.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <a href="/#about"><Button variant="secondary" size="lg">Pelajari Lebih Lanjut</Button></a>
                  <a href="/#join"><Button variant="hero" size="lg">Ikut Bergabung</Button></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="container py-16 md:py-24 scroll-mt-24">
          <article className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold">About</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Peduli Sampah adalah program dari Divisi Social Community BEM PPM yang bertujuan untuk membangun kepedulian terhadap lingkungan. Melalui aksi nyata dan edukasi, kami mengajak masyarakat menjaga bumi agar tetap bersih dan hijau.
            </p>
          </article>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            <Card className="transition-transform hover:-translate-y-0.5 hover:shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users2 className="text-primary" /> Bergerak Bersama</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Bergerak Bersama untuk Lingkungan yang Lebih Baik melalui aksi nyata dan kolaborasi lintas komunitas.
              </CardContent>
            </Card>
            <Card className="transition-transform hover:-translate-y-0.5 hover:shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap className="text-primary" /> Edukasi Kampus</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Edukasi di Lingkungan Kampus agar kesadaran lingkungan tumbuh dari komunitas akademik.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Vision */}
        <section id="vision" className="bg-secondary/50 border-t scroll-mt-24">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center">Our Vision</h2>
              <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                <p>
                  Kami percaya bahwa peningkatan kesadaran lingkungan di kalangan generasi muda merupakan kunci untuk menciptakan perubahan jangka panjang yang dimulai dari lingkungan terkecil. Kami menyadari bahwa mahasiswa dan pemuda di Indonesia, khususnya di lingkungan akademik, semakin menyadari urgensi isu iklim serta perlunya mengurangi ketergantungan terhadap sampah dan plastik sekali pakai.
                </p>
                <p>
                  Peduli Sampah hadir sebagai katalis perubahan, dengan mengintegrasikan nilai-nilai kepedulian lingkungan ke dalam kehidupan kampus melalui edukasi berbasis aksi dan kolaborasi lintas komunitas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* People */}
        <section id="team" className="container py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center">People Behind TRASHFORMERS</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { name: "Leo Kristianto", role: "Head of Division" },
              { name: "Adha Fauziah", role: "Staff" },
              { name: "Billy Chendana", role: "Staff" },
              { name: "July Esther Florencia", role: "Staff" },
            ].map((p) => (
              <Card key={p.name} className="text-center transition-transform hover:-translate-y-0.5 hover:shadow-glow">
                <CardContent className="pt-6">
                  <img
                    src="/placeholder.svg"
                    alt={`${p.name} — TRASHFORMERS team portrait`}
                    loading="lazy"
                    className="mx-auto h-24 w-24 rounded-full border object-cover"
                  />
                  <h3 className="mt-4 font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us */}
        <section id="join" className="bg-secondary/50 border-t scroll-mt-24">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Join Us</h2>
              <p className="mt-3 text-muted-foreground">Ikuti kegiatan kami dan jadi bagian dari perubahan.</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  slug={event.slug}
                  title={event.title}
                  imageSrc={event.image_url}
                  location={event.location}
                  time={event.time}
                  description={event.description}
                  isLocked={event.is_locked}
                  unlockDate={event.unlock_date}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className="container py-10 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} TRASHFORMERS — Green Campus Movement.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;

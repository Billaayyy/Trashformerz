import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDays, MapPin, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export type EventCardProps = {
  slug: string;
  title: string;
  imageSrc: string;
  location: string;
  time: string;
  description: string;
  isLocked?: boolean;
  unlockDate?: string;
};

const EventCard = ({ slug, title, imageSrc, location, time, description, isLocked, unlockDate }: EventCardProps) => {
  const now = new Date();
  const unlock = unlockDate ? new Date(unlockDate) : null;
  const isRegistrationOpen = !isLocked || (unlock && now >= unlock);
  
  return (
    <Card className="group overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-glow">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={`${title} event banner — TRASHFORMERS`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {!isRegistrationOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="mx-auto h-12 w-12 mb-2" />
              <p className="text-lg font-semibold">Registration Opens</p>
              <p className="text-sm">{unlock?.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="text-primary" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="text-primary" />
          <span>Time: {time}</span>
        </div>
        <div className="flex gap-3 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" disabled={!isRegistrationOpen}>Details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              {!isRegistrationOpen ? (
                <div className="text-center py-4">
                  <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Registration opens on {unlock?.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  <p>
                    Agenda dan informasi lengkap akan segera hadir. Nantikan jadwal, lokasi detail,
                    persyaratan, serta cara berpartisipasi di halaman ini.
                  </p>
                </div>
              )}
              <DialogFooter>
                <Link to={slug === 'education' ? '/education' : `/register/${slug}`} aria-label={`Register for ${title}`}>
                  <Button variant="hero" disabled={!isRegistrationOpen}>Join</Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Link to={slug === 'education' ? '/education' : `/register/${slug}`} aria-label={`Register for ${title}`}>
            <Button variant="hero" disabled={!isRegistrationOpen}>Join</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;

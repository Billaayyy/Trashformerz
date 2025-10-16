import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  image_url: string;
  slug: string;
  is_locked: boolean;
  unlock_date: string | null;
};

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    time: "",
    image_url: "",
    slug: "",
    is_locked: false,
    unlock_date: "",
  });

  useEffect(() => {
    checkAuth();
    fetchEvents();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/its-adming/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/its-adming/auth");
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const openDialog = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        location: event.location,
        time: event.time,
        image_url: event.image_url,
        slug: event.slug,
        is_locked: event.is_locked,
        unlock_date: event.unlock_date || "",
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        time: "",
        image_url: "",
        slug: "",
        is_locked: false,
        unlock_date: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      unlock_date: formData.unlock_date || null,
    };

    try {
      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }

      setIsDialogOpen(false);
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — TRASHFORMERS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="container py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-muted-foreground">Manage your Join Us section events</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogDescription>
                  {editingEvent ? "Update event details" : "Create a new event for the Join Us section"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL-friendly name)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    required
                    placeholder="example-event"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    placeholder="Forever or 24 November 2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_locked"
                    checked={formData.is_locked}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_locked: checked })}
                  />
                  <Label htmlFor="is_locked">Lock Registration (Mystery Event)</Label>
                </div>
                {formData.is_locked && (
                  <div className="space-y-2">
                    <Label htmlFor="unlock_date">Unlock Date</Label>
                    <Input
                      id="unlock_date"
                      type="datetime-local"
                      value={formData.unlock_date}
                      onChange={(e) => setFormData({ ...formData, unlock_date: e.target.value })}
                      required={formData.is_locked}
                    />
                    <p className="text-xs text-muted-foreground">
                      Registration will open on this date
                    </p>
                  </div>
                )}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingEvent ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {event.title}
                        {event.is_locked && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Locked
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openDialog(event)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Slug</p>
                      <p className="font-mono text-xs">{event.slug}</p>
                    </div>
                    {event.is_locked && event.unlock_date && (
                      <div>
                        <p className="text-muted-foreground">Opens On</p>
                        <p className="font-medium">
                          {new Date(event.unlock_date).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default AdminDashboard;

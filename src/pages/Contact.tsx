import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about EduNabha? We're here to help. Reach out to us anytime.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        GL Bajaj Institute of Technology & Management<br />
                        Plot No 2, APJ Abdul Kalam Rd<br />
                        Knowledge Park III, Greater Noida, UP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-warm rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 9876543210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">info@edunabha.edu.in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-muted rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-muted-foreground">Nabha, Punjab</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-2xl shadow-soft">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

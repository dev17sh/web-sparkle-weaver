import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Download } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Now available in Punjabi, Hindi & English
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Quality Education for
              <span className="text-primary block">Rural Students</span>
              <span className="text-secondary">in Nabha</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              An offline-first digital learning platform designed specifically for students in rural areas. 
              Learn anytime, anywhere with engaging video lessons, interactive quizzes, and earn rewards as you progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" variant="hero" asChild>
                <Link to="/register">
                  <Play className="h-5 w-5" />
                  Start Learning Free
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/courses">
                  <Download className="h-5 w-5" />
                  Download for Offline
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Video Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Expert Teachers</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img
                src={heroImage}
                alt="Rural students learning with tablets"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-warm rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Earn Rewards</div>
                    <div className="text-sm text-muted-foreground">Tokens & Badges</div>
                  </div>
                </div>
              </div>
              {/* Floating Card 2 */}
              <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-hero rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Works Offline</div>
                    <div className="text-sm text-muted-foreground">No internet needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

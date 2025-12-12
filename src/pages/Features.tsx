import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Smartphone, Wifi, WifiOff, Download, Gamepad2, Languages, BarChart3, Users } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Platform Features</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Built for Rural Students
            </h1>
            <p className="text-lg text-muted-foreground">
              Every feature is carefully designed keeping in mind the unique challenges faced by students 
              in rural areas with limited internet access and resources.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <FeaturesSection />

        {/* PWA Feature Highlight */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Progressive Web App</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Works Offline, Everywhere
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our platform is built as a Progressive Web App (PWA), which means it works like a native app 
                  on your phone or tablet. Download lessons when you have internet, and study them anytime - 
                  even without connectivity.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: Download, text: "Download video lessons for offline viewing" },
                    { icon: WifiOff, text: "Access all downloaded content without internet" },
                    { icon: Wifi, text: "Auto-sync progress when connection is available" },
                    { icon: Smartphone, text: "Install on any device - mobile, tablet, or desktop" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" asChild>
                  <Link to="/register">Try it Free</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-9xl mb-4">📲</div>
                    <p className="text-2xl font-bold text-foreground">Install & Learn</p>
                    <p className="text-muted-foreground">No app store needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gamification */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-3xl p-8 shadow-soft">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {["🏆", "⭐", "🎖️", "💎", "🔥", "🌟"].map((emoji, i) => (
                      <div key={i} className="bg-secondary/10 rounded-xl p-4 text-center">
                        <span className="text-4xl">{emoji}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">Your Tokens</span>
                      <span className="text-2xl font-bold text-primary">1,250</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="gradient-warm h-3 rounded-full" style={{ width: "75%" }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">250 more to reach Gold level!</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Gamification</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Learn, Earn & Grow
                </h2>
                <p className="text-muted-foreground mb-6">
                  Learning shouldn't be boring! Our gamified approach keeps students motivated with 
                  rewards, achievements, and friendly competition.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: Gamepad2, text: "Earn tokens for completing lessons and quizzes" },
                    { icon: "🏅", text: "Unlock badges as you master new topics" },
                    { icon: BarChart3, text: "Track your progress on leaderboards" },
                    { icon: "🎁", text: "Redeem tokens for special rewards" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        {typeof item.icon === "string" ? (
                          <span className="text-xl">{item.icon}</span>
                        ) : (
                          <item.icon className="h-5 w-5 text-secondary" />
                        )}
                      </div>
                      <span className="text-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Multilingual */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Multilingual Support</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Learn in Your Language
              </h2>
              <p className="text-muted-foreground">
                All content is available in Punjabi, Hindi, and English, ensuring every student can 
                learn in the language they're most comfortable with.
              </p>
            </div>
            <div className="flex justify-center gap-6 flex-wrap">
              {[
                { lang: "ਪੰਜਾਬੀ", name: "Punjabi" },
                { lang: "हिंदी", name: "Hindi" },
                { lang: "English", name: "English" },
              ].map((item) => (
                <div key={item.name} className="bg-card px-8 py-6 rounded-2xl shadow-soft text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{item.lang}</div>
                  <div className="text-muted-foreground">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;

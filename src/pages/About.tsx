import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Heart, Users, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Bridging the Education Gap in Rural India
            </h1>
            <p className="text-lg text-muted-foreground">
              EduNabha is a digital learning platform specifically designed to address the educational challenges 
              faced by students in rural areas like Nabha, Punjab, where access to quality learning materials 
              and reliable internet is limited.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <div className="w-14 h-14 gradient-hero rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To provide accessible, high-quality digital education to every student in rural areas, 
                  ensuring no child is left behind due to geographical or infrastructural limitations. 
                  We believe education is a right, not a privilege.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-soft">
                <div className="w-14 h-14 gradient-warm rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="h-7 w-7 text-secondary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become the leading educational platform for rural India, transforming how students learn 
                  and empowering them to achieve their full potential. We envision a future where every village 
                  has access to world-class education.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Objectives */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Key Objectives
              </h2>
              <p className="text-muted-foreground">
                Our platform is built around four core objectives to transform rural education.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Enhance Accessibility",
                  description: "Offline-first platform allowing students to download and study without internet.",
                  icon: "📱",
                },
                {
                  title: "Improve Engagement",
                  description: "Gamified learning with tokens, badges, and rewards to make learning fun.",
                  icon: "🎮",
                },
                {
                  title: "Quality Content",
                  description: "Structured courses in multiple languages - Punjabi, Hindi, and English.",
                  icon: "📚",
                },
                {
                  title: "Empower Stakeholders",
                  description: "Tools for teachers to manage courses and parents to track progress.",
                  icon: "👥",
                },
              ].map((objective, index) => (
                <div
                  key={objective.title}
                  className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-glow transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl mb-4">{objective.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{objective.title}</h3>
                  <p className="text-sm text-muted-foreground">{objective.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Team
              </h2>
              <p className="text-muted-foreground">
                A dedicated team of students and faculty from GL Bajaj Institute working to make education accessible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: "Abhishek Priya Ranjan", role: "Developer", roll: "2401920140012" },
                { name: "Ashutosh Kumar", role: "Developer", roll: "2401920140043" },
                { name: "Dr. Kajal Rai", role: "Project Guide", roll: "Faculty, MCA Dept." },
              ].map((member, index) => (
                <div
                  key={member.name}
                  className="bg-card p-6 rounded-2xl shadow-soft text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👤</span>
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                  <p className="text-secondary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.roll}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Join Us in Transforming Rural Education
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a student looking to learn, a teacher wanting to share knowledge, 
              or someone who wants to support our mission, there's a place for you at EduNabha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

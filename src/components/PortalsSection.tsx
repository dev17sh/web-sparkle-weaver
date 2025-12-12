import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, UserCog, Shield } from "lucide-react";

const portals = [
  {
    icon: GraduationCap,
    title: "Student Portal",
    description: "Access video lessons, take quizzes, track your progress, and earn rewards as you learn.",
    features: ["Video & Text Lessons", "Interactive Quizzes", "Offline Download", "Earn Tokens & Badges"],
    color: "gradient-hero",
    link: "/register?role=student",
  },
  {
    icon: UserCog,
    title: "Teacher Portal",
    description: "Upload courses, manage students, grade assignments, and view class performance reports.",
    features: ["Course Management", "Student Enrollment", "Assignment Grading", "Performance Reports"],
    color: "gradient-warm",
    link: "/register?role=teacher",
  },
  {
    icon: Shield,
    title: "Admin Portal",
    description: "Manage all users, configure system settings, and access comprehensive analytics.",
    features: ["User Management", "System Configuration", "Analytics Dashboard", "Content Moderation"],
    color: "bg-accent",
    link: "/login?role=admin",
  },
];

const PortalsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Access Portals</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Tailored for Every User
          </h2>
          <p className="text-muted-foreground">
            Whether you're a student, teacher, or administrator, we have the right tools for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <div
              key={portal.title}
              className="bg-card rounded-2xl shadow-soft overflow-hidden hover:shadow-glow transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`${portal.color} p-6`}>
                <portal.icon className="h-12 w-12 text-primary-foreground mb-4" />
                <h3 className="text-2xl font-bold text-primary-foreground">{portal.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">{portal.description}</p>
                <ul className="space-y-3 mb-6">
                  {portal.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={portal.link}>Access Portal</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortalsSection;

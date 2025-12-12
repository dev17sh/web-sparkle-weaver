import { WifiOff, Globe, Trophy, BookOpen, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: WifiOff,
    title: "Offline Learning",
    description: "Download lessons and study without internet. Perfect for areas with limited connectivity.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Access content in Punjabi, Hindi, and English to learn in your preferred language.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn tokens and badges as you complete lessons and quizzes. Learning made fun!",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BookOpen,
    title: "Rich Course Content",
    description: "Video lessons, text materials, and interactive quizzes created by expert teachers.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Teacher & Parent Portal",
    description: "Teachers can manage courses while parents track their child's progress easily.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Detailed analytics and reports to identify learning gaps and celebrate achievements.",
    color: "bg-accent/10 text-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-muted-foreground">
            Our platform is designed with rural students in mind, ensuring quality education is accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

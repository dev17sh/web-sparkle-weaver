import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star } from "lucide-react";

const courses = [
  {
    title: "Mathematics Basics",
    category: "Mathematics",
    lessons: 24,
    duration: "8 hours",
    rating: 4.8,
    image: "📐",
    level: "Beginner",
  },
  {
    title: "Science Fundamentals",
    category: "Science",
    lessons: 30,
    duration: "10 hours",
    rating: 4.9,
    image: "🔬",
    level: "Intermediate",
  },
  {
    title: "English Communication",
    category: "Languages",
    lessons: 20,
    duration: "6 hours",
    rating: 4.7,
    image: "📚",
    level: "Beginner",
  },
  {
    title: "Hindi Sahitya",
    category: "Languages",
    lessons: 18,
    duration: "5 hours",
    rating: 4.6,
    image: "📖",
    level: "Beginner",
  },
];

const CoursesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Popular Courses</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Start Learning Today
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="bg-card rounded-2xl shadow-soft overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-32 gradient-hero flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{course.image}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-3">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;

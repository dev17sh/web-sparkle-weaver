import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const allCourses = [
  {
    id: 1,
    title: "Mathematics Basics",
    category: "Mathematics",
    lessons: 24,
    duration: "8 hours",
    rating: 4.8,
    image: "📐",
    level: "Beginner",
    description: "Learn fundamental math concepts from basic arithmetic to algebra.",
  },
  {
    id: 2,
    title: "Science Fundamentals",
    category: "Science",
    lessons: 30,
    duration: "10 hours",
    rating: 4.9,
    image: "🔬",
    level: "Intermediate",
    description: "Explore physics, chemistry, and biology through interactive lessons.",
  },
  {
    id: 3,
    title: "English Communication",
    category: "Languages",
    lessons: 20,
    duration: "6 hours",
    rating: 4.7,
    image: "📚",
    level: "Beginner",
    description: "Improve your English speaking, reading, and writing skills.",
  },
  {
    id: 4,
    title: "Hindi Sahitya",
    category: "Languages",
    lessons: 18,
    duration: "5 hours",
    rating: 4.6,
    image: "📖",
    level: "Beginner",
    description: "Explore Hindi literature, poetry, and grammar in depth.",
  },
  {
    id: 5,
    title: "Punjabi Language",
    category: "Languages",
    lessons: 15,
    duration: "4 hours",
    rating: 4.8,
    image: "🗣️",
    level: "Beginner",
    description: "Learn to read, write, and speak Punjabi fluently.",
  },
  {
    id: 6,
    title: "Computer Basics",
    category: "Technology",
    lessons: 22,
    duration: "7 hours",
    rating: 4.9,
    image: "💻",
    level: "Beginner",
    description: "Introduction to computers, internet, and basic digital skills.",
  },
  {
    id: 7,
    title: "Environmental Studies",
    category: "Science",
    lessons: 16,
    duration: "5 hours",
    rating: 4.5,
    image: "🌱",
    level: "Beginner",
    description: "Learn about our environment, ecosystems, and conservation.",
  },
  {
    id: 8,
    title: "Social Studies",
    category: "Humanities",
    lessons: 20,
    duration: "6 hours",
    rating: 4.7,
    image: "🌍",
    level: "Intermediate",
    description: "Study history, geography, and civics of India.",
  },
];

const categories = ["All", "Mathematics", "Science", "Languages", "Technology", "Humanities"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              High-quality educational content designed for rural students. Learn at your own pace, online or offline.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="bg-card rounded-2xl shadow-soft overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
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
                  <h3 className="font-bold text-foreground mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-secondary fill-secondary" />
                      <span className="font-medium text-foreground">{course.rating}</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/courses/${course.id}`}>Start Learning</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;

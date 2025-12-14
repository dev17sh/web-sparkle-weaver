import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Gurpreet Singh",
    role: "Student, Class 10",
    content: "EduNabha has changed my life! I can now study even when there's no internet at home. The video lessons are so clear and easy to understand.",
    avatar: "👦",
    rating: 5,
  },
  {
    name: "Mrs. Kaur",
    role: "Teacher, Govt. School Nabha",
    content: "As a teacher, I love how easy it is to upload my lessons and track student progress. The platform has made teaching so much more effective.",
    avatar: "👩‍🏫",
    rating: 5,
  },
  {
    name: "Rajinder Kumar",
    role: "Parent",
    content: "I can finally see how my daughter is doing in her studies. The parent dashboard gives me peace of mind and helps me support her learning.",
    avatar: "👨",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            What Our Community Says
          </h2>
          <p className="text-muted-foreground">
            Hear from students, teachers, and parents who are part of the EduNabha family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-secondary fill-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

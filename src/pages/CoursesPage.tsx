import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, BarChart3, ArrowRight } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    instructor: string;
    duration: string;
    level: string;
    image?: string;
}

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/courses');
            const data = await response.json();

            if (data.courses) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 max-w-6xl items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logoIcon} alt="EduNabha" className="h-8 w-8" />
                        <h1 className="text-xl font-bold">EduNabha</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard">
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Explore Our Courses</h2>
                    <p className="text-lg text-primary-foreground/90">
                        Choose from hundreds of courses taught by industry experts
                    </p>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="container max-w-6xl mx-auto py-12 px-4">
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-96">
                        <p className="text-muted-foreground">Loading courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="flex items-center justify-center min-h-96">
                        <p className="text-muted-foreground">No courses available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <Badge className={getLevelColor(course.level)}>
                                            {course.level}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold">4.5</span>
                                        </div>
                                    </div>
                                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        by {course.instructor}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 pb-4 space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {course.description}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <BarChart3 className="h-4 w-4" />
                                            <span>{course.level} Level</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Price</p>
                                            <p className="text-2xl font-bold text-primary">${course.price}</p>
                                        </div>
                                        <Link to={`/checkout/${course.id}`}>
                                            <Button size="sm" className="gap-2">
                                                Enroll
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;

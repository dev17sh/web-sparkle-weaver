import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Mail, MapPin, BadgeCheck } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    location: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('user');

        if (!isLoggedIn || !userData) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(userData));
        setIsLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    if (isLoading) {
        return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return null;
    }

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'teacher':
                return 'bg-blue-100 text-blue-800';
            case 'admin':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="container flex h-16 max-w-6xl items-center justify-between mx-auto">
                    <div className="flex items-center gap-3">
                        <img src={logoIcon} alt="EduNabha" className="h-8 w-8" />
                        <h1 className="text-xl font-bold">EduNabha Dashboard</h1>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Welcome Card */}
                    <div className="lg:col-span-3">
                        <Card className="gradient-warm">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-3xl">Welcome back, {user.name}! 👋</CardTitle>
                                        <CardDescription className="text-base">
                                            You're logged in as a {user.role}. Explore your dashboard and continue your learning journey.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* User Profile Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                                <p className="font-semibold">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Location</p>
                                <p className="font-semibold flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {user.location || 'Not specified'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BadgeCheck className="h-5 w-5" />
                                Account Type
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`${getRoleColor(user.role)} px-4 py-3 rounded-lg text-center font-semibold`}>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link to="/courses">
                                <Button variant="outline" className="w-full">Browse Courses</Button>
                            </Link>
                            <Button variant="outline" className="w-full">View Progress</Button>
                            <Button variant="outline" className="w-full">Settings</Button>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Learning Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">0</p>
                                    <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">0</p>
                                    <p className="text-sm text-muted-foreground">Courses Completed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">0%</p>
                                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">0</p>
                                    <p className="text-sm text-muted-foreground">Certificates Earned</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

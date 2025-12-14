import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, GraduationCap, UserCog } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "student";
  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: `Welcome to EduNabha! You can now login.`,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:block lg:flex-1 gradient-warm relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-secondary-foreground p-12">
            <div className="text-8xl mb-6">🎓</div>
            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-secondary-foreground/80 max-w-md">
              Join thousands of students who are transforming their future through quality digital education.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-secondary-foreground/10 rounded-full blur-3xl" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <img src={logoIcon} alt="EduNabha" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
              <p className="text-muted-foreground">Join EduNabha today</p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`p-4 rounded-xl border-2 transition-all ${
                role === "student"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <GraduationCap className={`h-6 w-6 mx-auto mb-2 ${role === "student" ? "text-primary" : "text-muted-foreground"}`} />
              <div className={`font-semibold ${role === "student" ? "text-primary" : "text-foreground"}`}>Student</div>
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`p-4 rounded-xl border-2 transition-all ${
                role === "teacher"
                  ? "border-secondary bg-secondary/5"
                  : "border-border hover:border-secondary/50"
              }`}
            >
              <UserCog className={`h-6 w-6 mx-auto mb-2 ${role === "teacher" ? "text-secondary" : "text-muted-foreground"}`} />
              <div className={`font-semibold ${role === "teacher" ? "text-secondary" : "text-foreground"}`}>Teacher</div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Village/Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., Nabha, Punjab"
                value={formData.location}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" required className="rounded border-border mt-1" />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

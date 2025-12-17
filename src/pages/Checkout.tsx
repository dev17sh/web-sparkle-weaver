import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    instructor: string;
    duration: string;
}

const Checkout = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        // Fetch course details
        if (courseId) {
            fetch(`http://localhost:3000/courses/${courseId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.course) {
                        setCourse(data.course);
                    } else {
                        toast({
                            title: "Error",
                            description: "Course not found",
                            variant: "destructive"
                        });
                        navigate('/courses');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast({
                        title: "Error",
                        description: "Failed to load course",
                        variant: "destructive"
                    });
                })
                .finally(() => setIsLoading(false));
        }
    }, [courseId, navigate, toast]);

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Format card number with spaces
        if (name === 'cardNumber') {
            const cleaned = value.replace(/\s/g, '');
            const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
            setPaymentData(prev => ({ ...prev, [name]: formatted }));
        } else if (name === 'expiryDate') {
            const cleaned = value.replace(/\D/g, '');
            const formatted = cleaned.length >= 2
                ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
                : cleaned;
            setPaymentData(prev => ({ ...prev, [name]: formatted }));
        } else if (name === 'cvv') {
            setPaymentData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 3) }));
        } else {
            setPaymentData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate payment data
        if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
            toast({
                title: "Validation Error",
                description: "Please fill in all payment details",
                variant: "destructive"
            });
            return;
        }

        setIsProcessing(true);

        try {
            const user = localStorage.getItem('user');
            const userData = user ? JSON.parse(user) : null;

            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Confirm purchase on backend (using fake payment ID)
            const fakePaymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            const confirmResponse = await fetch('http://localhost:3000/confirm-purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userData.id,
                    courseId: parseInt(courseId || '0'),
                    paymentIntentId: fakePaymentId
                })
            });

            const confirmData = await confirmResponse.json();

            if (confirmResponse.ok) {
                toast({
                    title: "Payment Successful!",
                    description: `You've successfully enrolled in ${course?.title}`
                });
                navigate('/dashboard');
            } else {
                toast({
                    title: "Error",
                    description: confirmData.message,
                    variant: "destructive"
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Payment processing failed",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!course) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="container max-w-6xl mx-auto flex h-16 items-center gap-3 px-4">
                    <button
                        onClick={() => navigate('/courses')}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Details */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl">{course.title}</CardTitle>
                                <CardDescription>by {course.instructor}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-base">{course.description}</p>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-semibold">{course.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Instructor</p>
                                        <p className="font-semibold">{course.instructor}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Form */}
                    <div>
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Complete Your Purchase</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Order Summary */}
                                <div className="space-y-2 pb-4 border-b">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Course Price</span>
                                        <span className="font-semibold">${course.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2">
                                        <span>Total</span>
                                        <span className="text-primary">${course.price.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Payment Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardHolder">Cardholder Name</Label>
                                        <Input
                                            id="cardHolder"
                                            name="cardHolder"
                                            placeholder="John Doe"
                                            value={paymentData.cardHolder}
                                            onChange={handlePaymentChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber">Card Number</Label>
                                        <Input
                                            id="cardNumber"
                                            name="cardNumber"
                                            placeholder="4242 4242 4242 4242"
                                            value={paymentData.cardNumber}
                                            onChange={handlePaymentChange}
                                            maxLength={19}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">Test: 4242 4242 4242 4242</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiryDate">Expiry Date</Label>
                                            <Input
                                                id="expiryDate"
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                value={paymentData.expiryDate}
                                                onChange={handlePaymentChange}
                                                maxLength={5}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input
                                                id="cvv"
                                                name="cvv"
                                                placeholder="123"
                                                value={paymentData.cvv}
                                                onChange={handlePaymentChange}
                                                maxLength={3}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        size="lg"
                                        className="w-full gap-2"
                                    >
                                        <Lock className="h-4 w-4" />
                                        {isProcessing ? 'Processing...' : `Pay $${course.price.toFixed(2)}`}
                                    </Button>
                                </form>

                                <p className="text-xs text-muted-foreground text-center">
                                    <CheckCircle className="h-3 w-3 inline mr-1" />
                                    Secure test payment (Demo mode)
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

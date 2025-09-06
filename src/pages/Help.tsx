import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  FileText, 
  Search, 
  Mic, 
  QrCode, 
  Phone, 
  Clock,
  Users,
  Shield,
  CheckCircle
} from "lucide-react";

const Help = () => {
  const faqs = [
    {
      id: "filing-grievance",
      question: "How do I file a grievance?",
      answer: "To file a grievance, navigate to the 'Submit Grievance' page, fill out all required fields including your name, location, department, priority level, and a detailed description of your issue. You can also upload supporting photos and use voice input for accessibility. Once submitted, you'll receive a unique ticket ID for tracking."
    },
    {
      id: "track-status",
      question: "How can I track my grievance status?",
      answer: "Use the 'Check Status' page and enter your unique ticket ID. The system will display your grievance details, current status, and a timeline showing the progress from submission to resolution. Status updates include: Submitted, Under Review, In Progress, and Resolved."
    },
    {
      id: "voice-input",
      question: "How does voice input work?",
      answer: "Click the 'Voice Input' button next to the description field when filing a grievance. Allow microphone access when prompted, then speak clearly. The system will convert your speech to text automatically. This feature works best with modern browsers like Chrome, Firefox, and Safari."
    },
    {
      id: "qr-code",
      question: "How do I use the QR code?",
      answer: "The QR code on the home page provides quick access to the portal on your mobile device. Simply open your phone's camera app, point it at the QR code, and tap the notification that appears to open the website directly in your mobile browser."
    },
    {
      id: "priority-levels",
      question: "What do the priority levels mean?",
      answer: "Low Priority: Non-urgent issues (7-10 days response). Medium Priority: Standard issues (3-5 days response). High Priority: Important issues affecting daily life (1-2 days response). Urgent: Emergency situations requiring immediate attention (same day response)."
    },
    {
      id: "response-time",
      question: "How long does it take to get a response?",
      answer: "Response times vary by priority level. Urgent issues receive same-day attention, high priority issues are addressed within 1-2 days, medium priority within 3-5 days, and low priority within 7-10 days. You'll receive status updates throughout the process."
    },
    {
      id: "photo-upload",
      question: "Can I upload photos with my grievance?",
      answer: "Yes, you can upload supporting photos up to 5MB in size. Accepted formats include PNG, JPG, and JPEG. Photos help authorities better understand your issue and can speed up the resolution process."
    },
    {
      id: "emergency-contact",
      question: "What if I have an emergency?",
      answer: "For true emergencies that threaten life or property, call 911 immediately. For urgent grievances that need same-day attention, use our emergency helpline at 1800-123-4567 or select 'Urgent' priority when filing your grievance."
    }
  ];

  const features = [
    {
      icon: FileText,
      title: "Easy Filing",
      description: "Simple form with clear fields and helpful guidance"
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Accessibility feature for hands-free form filling"
    },
    {
      icon: Search,
      title: "Status Tracking",
      description: "Real-time updates on your grievance progress"
    },
    {
      icon: QrCode,
      title: "Mobile Access",
      description: "Quick access via QR code scanning"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected and confidential"
    },
    {
      icon: Clock,
      title: "Timely Response",
      description: "Priority-based response times for faster resolution"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Submit Your Grievance",
      description: "Fill out the grievance form with all necessary details",
      icon: FileText
    },
    {
      step: 2,
      title: "Receive Ticket ID",
      description: "Get a unique tracking number for your submission",
      icon: Search
    },
    {
      step: 3,
      title: "Track Progress",
      description: "Monitor status updates through our tracking system",
      icon: Clock
    },
    {
      step: 4,
      title: "Resolution",
      description: "Receive notification when your issue is resolved",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of the Citizen Grievance Hub.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.step} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-6 h-6 text-primary" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section>
          <Card className="bg-gradient-to-r from-primary/10 to-success/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you couldn't find the answer to your question, don't hesitate to reach out for support 
                or start filing your grievance right away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary-hover">
                  <Link to="/grievance">
                    <FileText className="w-5 h-5 mr-2" />
                    File a Grievance
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Notice */}
        <Card className="mt-8 border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-destructive" />
              <div>
                <h3 className="font-semibold text-destructive">Emergency Situations</h3>
                <p className="text-sm text-foreground mt-1">
                  For life-threatening emergencies, call <strong>911</strong> immediately. 
                  For urgent but non-emergency issues, call our helpline at <strong>1800-123-4567</strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
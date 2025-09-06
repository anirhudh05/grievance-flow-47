import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  MessageSquare,
  AlertTriangle
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll respond to your inquiry within 24-48 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "General Support",
      primary: "1800-123-4567",
      secondary: "Mon-Fri: 9 AM - 6 PM",
      description: "For general inquiries and grievance support"
    },
    {
      icon: Shield,
      title: "Emergency Helpline",
      primary: "1800-911-HELP",
      secondary: "24/7 Available",
      description: "For urgent issues requiring immediate attention"
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "support@citizengrievance.gov",
      secondary: "Response: 24-48 hours",
      description: "For detailed inquiries and documentation"
    },
    {
      icon: MapPin,
      title: "Office Location",
      primary: "City Administration Building",
      secondary: "123 Main Street, Suite 400",
      description: "In-person assistance during business hours"
    }
  ];

  const departments = [
    { name: "Public Works", hours: "8 AM - 5 PM", phone: "(555) 123-1001" },
    { name: "Sanitation", hours: "6 AM - 4 PM", phone: "(555) 123-1002" },
    { name: "Water Supply", hours: "7 AM - 6 PM", phone: "(555) 123-1003" },
    { name: "Electricity", hours: "24/7", phone: "(555) 123-1004" },
    { name: "Transportation", hours: "6 AM - 8 PM", phone: "(555) 123-1005" },
    { name: "Police", hours: "24/7", phone: "911 or (555) 123-1006" }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our support team or find direct contact information for specific departments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <span>Send us a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Provide detailed information about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success-hover"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-6 h-6 text-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.title} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                        <p className="text-lg font-medium text-primary">{method.primary}</p>
                        <p className="text-sm text-muted-foreground">{method.secondary}</p>
                        <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-primary" />
                  <span>Office Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="font-medium">Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-accent/50 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Emergency services and online portal are available 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Contacts */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary" />
                <span>Department Direct Contacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div 
                    key={dept.name} 
                    className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{dept.name}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-primary font-medium">{dept.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{dept.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Notice */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-destructive mb-2">Emergency Situations</h3>
                <div className="space-y-2 text-foreground">
                  <p className="flex items-center space-x-2">
                    <strong>Life-threatening emergencies:</strong>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-bold">911</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <strong>Urgent non-emergency issues:</strong>
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-medium">1800-911-HELP</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    Examples of urgent issues: Gas leaks, water main breaks, power outages affecting 
                    multiple buildings, blocked emergency routes, or any situation requiring immediate municipal response.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
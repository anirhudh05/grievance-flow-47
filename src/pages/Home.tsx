import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Search, Phone, QrCode, Users, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import qrCodeImage from "@/assets/qr-code.png";

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: "Submit Grievance",
      description: "File your complaint with our easy-to-use form",
      href: "/grievance",
    },
    {
      icon: Search,
      title: "Track Status",
      description: "Monitor the progress of your submitted grievances",
      href: "/status",
    },
    {
      icon: Phone,
      title: "Emergency Support",
      description: "Get immediate help for urgent issues",
      href: "/contact",
    },
  ];

  const stats = [
    { label: "Grievances Resolved", value: "12,847", icon: CheckCircle },
    { label: "Active Users", value: "45,230", icon: Users },
    { label: "Avg Response Time", value: "2.3 days", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="relative h-[600px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Hero Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
                  Your Voice
                  <br />
                  <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                    Matters
                  </span>
                </h1>
                <p className="text-xl text-primary-foreground/90 mb-8 max-w-lg">
                  Submit grievances, track progress, and ensure your concerns reach the right authorities. 
                  Transparent. Accountable. Efficient.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-success hover:bg-success-hover">
                    <Link to="/grievance">
                      <FileText className="w-5 h-5 mr-2" />
                      Submit Grievance
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Link to="/status">
                      <Search className="w-5 h-5 mr-2" />
                      Check Status
                    </Link>
                  </Button>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="flex justify-center">
                <Card className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <QrCode className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Quick Access
                    </h3>
                    <img
                      src={qrCodeImage}
                      alt="QR Code for quick access"
                      className="w-40 h-40 mx-auto mb-4 rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      Scan to access the portal on your mobile device
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center">
                  <CardContent className="p-6">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Can We Help You Today?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive set of services designed to address your concerns efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <Button asChild className="group-hover:bg-primary-hover transition-colors">
                      <Link to={feature.href}>
                        Get Started
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-success">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of citizens who have successfully resolved their concerns through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/grievance">
                Start Your Grievance
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/help">
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
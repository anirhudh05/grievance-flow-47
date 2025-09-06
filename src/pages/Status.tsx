import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Clock, CheckCircle, AlertTriangle, FileText, Calendar } from "lucide-react";

interface GrievanceStatus {
  ticketId: string;
  name: string;
  department: string;
  priority: string;
  description: string;
  status: string;
  submittedAt: string;
  statusHistory?: Array<{
    status: string;
    date: string;
    comment: string;
  }>;
}

const Status = () => {
  const [ticketId, setTicketId] = useState("");
  const [grievanceData, setGrievanceData] = useState<GrievanceStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const statusConfig = {
    submitted: { 
      label: "Submitted", 
      icon: FileText, 
      color: "bg-blue-500",
      description: "Your grievance has been received and is being reviewed."
    },
    in_review: { 
      label: "Under Review", 
      icon: Clock, 
      color: "bg-yellow-500",
      description: "Your case is being examined by the relevant department."
    },
    in_progress: { 
      label: "In Progress", 
      icon: AlertTriangle, 
      color: "bg-orange-500",
      description: "Action is being taken to address your grievance."
    },
    resolved: { 
      label: "Resolved", 
      icon: CheckCircle, 
      color: "bg-green-500",
      description: "Your grievance has been successfully resolved."
    },
  };

  const simulateStatusUpdate = (baseStatus: string) => {
    const statusFlow = ["submitted", "in_review", "in_progress", "resolved"];
    const currentIndex = statusFlow.indexOf(baseStatus);
    const randomIndex = Math.min(currentIndex + Math.floor(Math.random() * 2) + 1, statusFlow.length - 1);
    return statusFlow[randomIndex];
  };

  const generateStatusHistory = (currentStatus: string, submittedDate: string) => {
    const history = [
      {
        status: "submitted",
        date: submittedDate,
        comment: "Grievance submitted successfully"
      }
    ];

    if (currentStatus !== "submitted") {
      history.push({
        status: "in_review",
        date: new Date(Date.parse(submittedDate) + 1 * 24 * 60 * 60 * 1000).toISOString(),
        comment: "Assigned to relevant department for review"
      });
    }

    if (["in_progress", "resolved"].includes(currentStatus)) {
      history.push({
        status: "in_progress",
        date: new Date(Date.parse(submittedDate) + 2 * 24 * 60 * 60 * 1000).toISOString(),
        comment: "Investigation and corrective actions initiated"
      });
    }

    if (currentStatus === "resolved") {
      history.push({
        status: "resolved",
        date: new Date(Date.parse(submittedDate) + 4 * 24 * 60 * 60 * 1000).toISOString(),
        comment: "Issue has been successfully resolved"
      });
    }

    return history;
  };

  const handleSearch = () => {
    if (!ticketId.trim()) {
      toast({
        title: "Missing Ticket ID",
        description: "Please enter a valid ticket ID to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const storedData = localStorage.getItem(ticketId.trim());
      
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const updatedStatus = simulateStatusUpdate(parsed.status);
        const statusHistory = generateStatusHistory(updatedStatus, parsed.submittedAt);
        
        // Update stored data with new status
        const updatedData = { ...parsed, status: updatedStatus, statusHistory };
        localStorage.setItem(ticketId.trim(), JSON.stringify(updatedData));
        
        setGrievanceData(updatedData);
        toast({
          title: "Grievance Found",
          description: `Status: ${statusConfig[updatedStatus as keyof typeof statusConfig].label}`,
        });
      } else {
        // Generate sample data for demo
        const sampleData: GrievanceStatus = {
          ticketId: ticketId.trim(),
          name: "Demo User",
          department: "Public Works",
          priority: "medium",
          description: "Sample grievance for demonstration purposes",
          status: "in_progress",
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          statusHistory: generateStatusHistory("in_progress", new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())
        };
        
        setGrievanceData(sampleData);
        toast({
          title: "Demo Data Loaded",
          description: "Showing sample grievance data for demonstration.",
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800"
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Check Grievance Status
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your ticket ID to track the progress of your grievance.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-6 h-6 text-primary" />
              <span>Ticket Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="ticketId" className="sr-only">Ticket ID</Label>
                <Input
                  id="ticketId"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Enter your ticket ID (e.g., CGH-12345678-ABCD)"
                  className="text-lg"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success-hover"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {grievanceData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Grievance Status</span>
                  <Badge className={getPriorityColor(grievanceData.priority)}>
                    {grievanceData.priority.toUpperCase()} PRIORITY
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Ticket Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Ticket ID:</span> {grievanceData.ticketId}</div>
                      <div><span className="font-medium">Submitted by:</span> {grievanceData.name}</div>
                      <div><span className="font-medium">Department:</span> {grievanceData.department}</div>
                      <div><span className="font-medium">Submitted on:</span> {formatDate(grievanceData.submittedAt)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Current Status</h4>
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const config = statusConfig[grievanceData.status as keyof typeof statusConfig];
                        const Icon = config.icon;
                        return (
                          <>
                            <div className={`p-2 rounded-full ${config.color}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">{config.label}</div>
                              <div className="text-sm text-muted-foreground">{config.description}</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground bg-muted p-3 rounded-md">
                    {grievanceData.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            {grievanceData.statusHistory && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    <span>Status Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {grievanceData.statusHistory.map((entry, index) => {
                      const config = statusConfig[entry.status as keyof typeof statusConfig];
                      const Icon = config.icon;
                      const isLast = index === grievanceData.statusHistory!.length - 1;
                      
                      return (
                        <div key={index} className="relative flex items-start space-x-4">
                          {!isLast && (
                            <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
                          )}
                          <div className={`flex-shrink-0 p-2 rounded-full ${config.color}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="font-semibold text-foreground">{config.label}</h5>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(entry.date)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {entry.comment}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-accent/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p>• Ticket ID format: CGH-XXXXXXXX-XXXX</p>
                <p>• Status updates may take 24-48 hours</p>
              </div>
              <div>
                <p>• Contact support for urgent issues</p>
                <p>• Emergency helpline: 1800-123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Status;
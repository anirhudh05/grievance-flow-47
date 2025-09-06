import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { VoiceInput } from "@/components/ui/voice-input";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, AlertCircle } from "lucide-react";

const Grievance = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    department: "",
    priority: "",
    description: "",
    photo: null as File | null,
  });

  const departments = [
    "Public Works",
    "Sanitation",
    "Water Supply",
    "Electricity",
    "Transportation",
    "Healthcare",
    "Education",
    "Police",
    "Fire Department",
    "Other",
  ];

  const priorities = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    const currentDescription = formData.description;
    const newDescription = currentDescription 
      ? `${currentDescription} ${transcript}` 
      : transcript;
    handleInputChange("description", newDescription);
  };

  const generateTicketId = () => {
    const prefix = "CGH";
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.department || !formData.priority || !formData.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const ticketId = generateTicketId();
    
    // Store in localStorage for status checking
    const grievanceData = {
      ...formData,
      ticketId,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      photoName: formData.photo?.name || null,
    };
    
    localStorage.setItem(ticketId, JSON.stringify(grievanceData));
    
    toast({
      title: "Grievance Submitted Successfully!",
      description: `Your ticket ID is: ${ticketId}. Please save this for tracking.`,
    });

    // Reset form
    setFormData({
      name: "",
      location: "",
      department: "",
      priority: "",
      description: "",
      photo: null,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Submit Your Grievance
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us understand your concern and we'll work to resolve it promptly.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-primary" />
              <span>Grievance Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
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

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location/Address *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location or address"
                    required
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center space-x-2">
                            {priority.value === "urgent" && <AlertCircle className="w-4 h-4 text-destructive" />}
                            <span>{priority.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your grievance in detail..."
                  className="min-h-[120px]"
                  required
                />
                <div className="flex justify-end">
                  <VoiceInput 
                    onTranscript={handleVoiceTranscript}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <Label htmlFor="photo" className="cursor-pointer">
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG up to 5MB
                    </span>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </Label>
                  {formData.photo && (
                    <div className="mt-2 text-sm text-success">
                      ✓ {formData.photo.name} selected
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success-hover"
                >
                  Submit Grievance
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 bg-accent/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• You'll receive a unique ticket ID for tracking</li>
              <li>• Your grievance will be forwarded to the relevant department</li>
              <li>• You'll receive updates on the progress via the status checker</li>
              <li>• Expected response time is 2-5 business days</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Grievance;
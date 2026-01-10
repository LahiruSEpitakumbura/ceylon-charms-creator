import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Globe, MessageCircle, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ContactInfo } from '@/types/booking';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface StepConfirmProps {
  data: ContactInfo;
  onUpdate: (data: Partial<ContactInfo>) => void;
  onBack: () => void;
}

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia', 
  'Canada', 'Netherlands', 'Switzerland', 'Italy', 'Spain', 
  'Belgium', 'Austria', 'Sweden', 'Norway', 'Denmark',
  'India', 'Japan', 'Singapore', 'United Arab Emirates', 'Other'
];

export function StepConfirm({ data, onUpdate, onBack }: StepConfirmProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateWhatsApp = (number: string) => {
    return /^\+?[\d\s-]{8,}$/.test(number);
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.name.trim()) newErrors.name = 'Please enter your name';
    if (!data.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!data.whatsapp.trim()) {
      newErrors.whatsapp = 'Please enter your WhatsApp number';
    } else if (!validateWhatsApp(data.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }
    if (!data.country) newErrors.country = 'Please select your country';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: 'Booking Request Sent!',
        description: 'We will contact you within 24 hours to confirm your trip.',
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="animate-fade-in space-y-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Thank You, {data.name}!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your booking request has been sent successfully. Our travel expert will contact you via WhatsApp or email within 24 hours to finalize your Sri Lanka adventure.
          </p>
          
          <Card className="p-6 text-left mb-8">
            <h3 className="font-semibold text-lg mb-4">What's Next?</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">1</span>
                </div>
                <span>We'll review your itinerary and check availability</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">2</span>
                </div>
                <span>You'll receive a detailed quote with exact prices</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">3</span>
                </div>
                <span>Confirm with a small deposit and we'll handle the rest!</span>
              </li>
            </ul>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
              Plan Another Trip
            </Button>
            <Button variant="accent" size="lg" asChild>
              <a 
                href={`https://wa.me/94771234567?text=Hi! I just submitted a booking request for Sri Lanka.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          Almost There!
        </h2>
        <p className="text-muted-foreground text-lg">
          Enter your contact details to receive your personalized quote
        </p>
      </div>

      <Card className="max-w-xl mx-auto p-6 lg:p-8">
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Full Name *</Label>
            <Input
              placeholder="John Smith"
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className={cn(errors.name && 'border-destructive')}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address *
            </Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              className={cn(errors.email && 'border-destructive')}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              WhatsApp Number *
            </Label>
            <Input
              placeholder="+1 234 567 8900"
              value={data.whatsapp}
              onChange={(e) => onUpdate({ whatsapp: e.target.value })}
              className={cn(errors.whatsapp && 'border-destructive')}
            />
            {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Country *
            </Label>
            <Select
              value={data.country}
              onValueChange={(value) => onUpdate({ country: value })}
            >
              <SelectTrigger className={cn(errors.country && 'border-destructive')}>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Special Requests (Optional)</Label>
            <Textarea
              placeholder="Any dietary requirements, accessibility needs, or special occasions..."
              value={data.specialRequests}
              onChange={(e) => onUpdate({ specialRequests: e.target.value })}
              rows={3}
            />
          </div>

          <Button 
            variant="accent" 
            size="xl" 
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Booking Request
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to receive communications from AO Travels.
            <br />
            We'll respond within 24 hours.
          </p>
        </div>
      </Card>

      <div className="flex justify-start pt-6">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Review
        </Button>
      </div>
    </div>
  );
}

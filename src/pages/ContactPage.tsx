import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Building2,
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'in-person',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '(713) 555-1234',
      subtitle: 'Mon-Fri 8am-6pm',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@yellowstone.com',
      subtitle: '24/7 Response',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'Houston, TX 77002',
      subtitle: 'By Appointment',
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Mon-Fri: 9am-6pm',
      subtitle: 'Sat: 10am-4pm',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20">
      {/* Header */}
      <motion.div 
        className="bg-primary-blue py-12 sm:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Schedule a Tour
          </motion.h1>
          <motion.p 
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Choose between an in-person tour or a virtual tour from the comfort of your home.
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-sm shadow-md p-4 sm:p-6 border-t-4 border-gold"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-sm flex items-center justify-center mb-3 sm:mb-4">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
              </div>
              <h3 className="font-display font-bold text-primary-blue text-base sm:text-lg mb-1">
                {item.title}
              </h3>
              <p className="text-primary-blue font-semibold text-sm sm:text-base">{item.value}</p>
              <p className="text-muted-blue text-xs sm:text-sm">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white rounded-sm shadow-md p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-primary-blue mb-4 sm:mb-6">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-primary-blue mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-blue mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        inquiryType: 'general',
                      });
                    }}
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-primary-blue"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none text-primary-blue"
                    >
                      <option value="in-person">In-Person Tour</option>
                      <option value="virtual">Virtual Tour</option>
                    </select>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-blue" />
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-gold"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-blue" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@email.com"
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-gold"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-blue" />
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(713) 555-1234"
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-gold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-2">
                        Subject *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-blue" />
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-gold"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-blue" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold text-primary-blue hover:bg-gold-light font-semibold h-12"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Side Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-8"
          >
            {/* Departments */}
            <div className="bg-white rounded-sm shadow-md p-5 sm:p-8">
              <h3 className="text-lg sm:text-xl font-display font-bold text-primary-blue mb-4 sm:mb-6">
                Department Contacts
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-sm flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">Leasing Office</h4>
                    <p className="text-muted-blue text-sm">For availability, tours, and applications</p>
                    <a href="tel:+17135551234" className="text-gold text-sm hover:text-gold-dark">
                      (713) 555-1234 ext. 1
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-sm flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">Maintenance Hotline</h4>
                    <p className="text-muted-blue text-sm">24/7 Emergency maintenance requests</p>
                    <a href="tel:+17135551235" className="text-gold text-sm hover:text-gold-dark">
                      (713) 555-1235
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-sm flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-blue">Resident Services</h4>
                    <p className="text-muted-blue text-sm">For current residents</p>
                    <a href="tel:+17135551236" className="text-gold text-sm hover:text-gold-dark">
                      (713) 555-1236
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-50 border border-red-200 rounded-sm p-4 sm:p-6">
              <h4 className="font-semibold text-red-800 mb-2">Emergency Maintenance</h4>
              <p className="text-red-700 text-sm mb-3">
                For after-hours emergencies (flooding, no heat/AC, lockouts), 
                please call our 24/7 hotline immediately.
              </p>
              <a 
                href="tel:+17135551235" 
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                (713) 555-1235
              </a>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-sm shadow-md p-5 sm:p-8">
              <h3 className="text-lg sm:text-xl font-display font-bold text-primary-blue mb-4">
                Visit Our Office
              </h3>
              <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center">
                <div className="text-center text-muted-blue">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive Map</p>
                  <p className="text-xs">Houston, TX 77002</p>
                </div>
              </div>
              <p className="text-muted-blue text-sm mt-4">
                Our leasing office is open Monday-Friday 9am-6pm and Saturday 10am-4pm. 
                Schedule an appointment for property tours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Check, 
  Home,
  Video,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

type TourType = 'in-person' | 'virtual';

interface BookingData {
  tourType: TourType | null;
  date: Date | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const tourTypes = [
  { 
    id: 'in-person' as TourType, 
    title: 'In-Person Tour', 
    description: 'Visit the property with a leasing specialist',
    icon: Home,
    duration: '45 min',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    id: 'virtual' as TourType, 
    title: 'Virtual Tour', 
    description: 'Live video walkthrough from anywhere',
    icon: Video,
    duration: '30 min',
    color: 'from-purple-500 to-purple-600'
  },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

export function BookingWizard({ isOpen, onClose, propertyName }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    tourType: null,
    date: null,
    time: null,
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const handleTourTypeSelect = (type: TourType) => {
    setBookingData(prev => ({ ...prev, tourType: type }));
  };

  const handleDateSelect = (date: Date) => {
    setBookingData(prev => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, time }));
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return bookingData.tourType !== null;
      case 2: return bookingData.date !== null && bookingData.time !== null;
      case 3: return bookingData.name.trim() !== '' && bookingData.email.trim() !== '' && bookingData.phone.trim() !== '';
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Tour scheduled successfully! Check your email for confirmation.');
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setBookingData({
        tourType: null,
        date: null,
        time: null,
        name: '',
        email: '',
        phone: '',
        notes: ''
      });
      setIsSuccess(false);
    }, 300);
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-800 rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-white/10">
            <div>
              <h2 className="text-xl font-display font-bold text-primary dark:text-white">
                {isSuccess ? 'Booking Confirmed!' : 'Schedule a Tour'}
              </h2>
              {propertyName && !isSuccess && (
                <p className="text-sm text-slate/60 dark:text-white/60">{propertyName}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-slate dark:text-white/60" />
            </button>
          </div>

          {/* Progress Bar */}
          {!isSuccess && (
            <div className="px-6 pt-4">
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      i < step ? 'bg-[#E1B84A]' : 'bg-neutral-200 dark:bg-white/10'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate/60 dark:text-white/60 mt-2">
                Step {step} of {totalSteps}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-primary dark:text-white mb-2">
                    You're All Set!
                  </h3>
                  <p className="text-slate/70 dark:text-white/60 mb-6">
                    We've sent a confirmation to {bookingData.email}
                  </p>
                  <div className="bg-neutral-50 dark:bg-white/5 rounded-xl p-4 mb-6 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-[#E1B84A]" />
                      <span className="text-primary dark:text-white">
                        {bookingData.date && formatDate(bookingData.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-[#E1B84A]" />
                      <span className="text-primary dark:text-white">{bookingData.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-[#E1B84A]" />
                      <span className="text-primary dark:text-white">{bookingData.name}</span>
                    </div>
                  </div>
                  <Button onClick={handleClose} className="bg-[#E1B84A] text-[#0B2F5B] hover:bg-[#F0C85A] font-semibold">
                    Done
                  </Button>
                </motion.div>
              ) : (
                <>
                  {/* Step 1: Tour Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-slate/70 dark:text-white/60 mb-4">
                        Choose how you'd like to experience the property
                      </p>
                      {tourTypes.map((type, index) => (
                        <motion.button
                          key={type.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleTourTypeSelect(type.id)}
                          className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                            bookingData.tourType === type.id
                              ? 'border-[#E1B84A] bg-[#E1B84A]/5'
                              : 'border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center flex-shrink-0`}>
                              <type.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-primary dark:text-white">{type.title}</h3>
                                <span className="text-sm text-slate/60 dark:text-white/60">{type.duration}</span>
                              </div>
                              <p className="text-sm text-slate/60 dark:text-white/60 mt-1">{type.description}</p>
                            </div>
                            {bookingData.tourType === type.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-[#E1B84A] flex items-center justify-center"
                              >
                                <Check className="w-4 h-4 text-[#0B2F5B]" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-slate/70 dark:text-white/60 mb-4">
                        Select your preferred date and time
                      </p>
                      
                      {/* Date Selection */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-primary dark:text-white mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Select Date
                        </h3>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {calendarDays.map((date, index) => (
                            <motion.button
                              key={date.toISOString()}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.03 }}
                              onClick={() => handleDateSelect(date)}
                              className={`flex-shrink-0 p-3 rounded-xl border-2 transition-all ${
                                bookingData.date?.toDateString() === date.toDateString()
                                  ? 'border-[#E1B84A] bg-[#E1B84A]/10'
                                  : 'border-neutral-200 dark:border-white/10 hover:border-neutral-300'
                              }`}
                            >
                              <p className="text-xs text-slate/60 dark:text-white/60 uppercase">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </p>
                              <p className={`text-lg font-bold ${
                                bookingData.date?.toDateString() === date.toDateString()
                                  ? 'text-[#E1B84A]'
                                  : 'text-primary dark:text-white'
                              }`}>
                                {date.getDate()}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      {bookingData.date && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h3 className="font-semibold text-primary dark:text-white mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Select Time
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {timeSlots.map((time, index) => (
                              <motion.button
                                key={time}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => handleTimeSelect(time)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  bookingData.time === time
                                    ? 'bg-[#E1B84A] text-[#0B2F5B]'
                                    : 'bg-neutral-100 dark:bg-white/10 text-slate dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-white/20'
                                }`}
                              >
                                {time}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-slate/70 dark:text-white/60 mb-4">
                        Tell us a bit about yourself
                      </p>
                      
                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40" />
                          <Input
                            value={bookingData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="John Doe"
                            className="pl-12 h-12 dark:bg-white/10 dark:border-white/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40" />
                          <Input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@example.com"
                            className="pl-12 h-12 dark:bg-white/10 dark:border-white/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40" />
                          <Input
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(555) 123-4567"
                            className="pl-12 h-12 dark:bg-white/10 dark:border-white/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary dark:text-white mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          value={bookingData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Any specific questions or requirements..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background dark:bg-white/10 dark:border-white/20 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E1B84A]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Review */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-slate/70 dark:text-white/60 mb-4">
                        Review your booking details
                      </p>
                      
                      <div className="bg-neutral-50 dark:bg-white/5 rounded-xl p-5 space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="text-slate/60 dark:text-white/60">Tour Type</span>
                          <span className="font-medium text-primary dark:text-white capitalize">
                            {bookingData.tourType?.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="text-slate/60 dark:text-white/60">Date</span>
                          <span className="font-medium text-primary dark:text-white">
                            {bookingData.date && formatDate(bookingData.date)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="text-slate/60 dark:text-white/60">Time</span>
                          <span className="font-medium text-primary dark:text-white">
                            {bookingData.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="text-slate/60 dark:text-white/60">Name</span>
                          <span className="font-medium text-primary dark:text-white">
                            {bookingData.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="text-slate/60 dark:text-white/60">Email</span>
                          <span className="font-medium text-primary dark:text-white">
                            {bookingData.email}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate/60 dark:text-white/60">Phone</span>
                          <span className="font-medium text-primary dark:text-white">
                            {bookingData.phone}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-start gap-3 p-4 bg-[#E1B84A]/10 rounded-xl">
                        <Sparkles className="w-5 h-5 text-[#E1B84A] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate/70 dark:text-white/60">
                          You'll receive a confirmation email with all the details and a calendar invite.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="flex items-center justify-between p-6 border-t border-neutral-200 dark:border-white/10">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className="bg-[#E1B84A] text-[#0B2F5B] hover:bg-[#F0C85A] font-semibold gap-2"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-[#0B2F5B] border-t-transparent rounded-full"
                  />
                ) : step === totalSteps ? (
                  <>Confirm Booking <Check className="w-4 h-4" /></>
                ) : (
                  <>Next <ChevronRight className="w-4 h-4" /></>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

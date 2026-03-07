import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  CreditCard, 
  Wrench, 
  FileText, 
  Bell, 
  LogOut, 
  User,
  ChevronDown,
  Lock,
  Mail,
  CheckCircle,
  Phone,
  Home,
  ArrowRight,
  Clock,
  Upload,
  MessageSquare,
  Settings,
  History,
  Shield,
  Menu,
  X,
  ChevronRight,
  AlertCircle,
  Zap,
  Download,
  MoreHorizontal,
  Receipt,
  FileCheck,
  Send,
  Paperclip,
  Camera,
  Calendar,

  Check,
  Loader2,
  FileUp,
  Eye,

  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// ============================================
// TYPES
// ============================================
interface Property {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  propertyId: string;
  unitNumber: string;
  balance: number;
  leaseEnd: string;
  autopayEnabled: boolean;
  insuranceUploaded: boolean;
  rentDue: string;
}

interface Activity {
  id: string;
  type: 'payment' | 'maintenance' | 'lease' | 'announcement';
  title: string;
  subtext: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
}

interface Notification {
  id: string;
  type: 'maintenance' | 'payment' | 'announcement';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'submitted' | 'in-review' | 'scheduled' | 'in-progress' | 'completed';
  date: string;
  category: string;
}

interface Message {
  id: string;
  from: 'tenant' | 'management';
  text: string;
  timestamp: string;
  read: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

// ============================================
// MOCK DATA
// ============================================
const MOCK_PROPERTIES: Property[] = [
  { id: '1', name: 'The French Quarter', slug: 'french-quarter', address: '1500 Lawrence Street', city: 'Denver', state: 'CO' },
  { id: '2', name: 'Royal Oak Apartments', slug: 'royal-oak', address: '500 West 6th Street', city: 'Austin', state: 'TX' },
  { id: '3', name: 'Skyline Tower', slug: 'skyline-tower', address: '1200 4th Avenue', city: 'Seattle', state: 'WA' },
];

const MOCK_USER: User = {
  id: 'usr_12345',
  email: 'john.smith@email.com',
  firstName: 'John',
  lastName: 'Smith',
  propertyId: '1',
  unitNumber: '4B',
  balance: 1850.00,
  leaseEnd: '2025-08-31',
  autopayEnabled: false,
  insuranceUploaded: false,
  rentDue: '2024-01-05',
};

const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', type: 'payment', title: 'Rent Paid', subtext: 'Dec 2023 • $1,850', date: 'Dec 1, 2023', status: 'completed' },
  { id: '2', type: 'maintenance', title: 'AC Repair Request', subtext: 'Request #2847 • Completed', date: 'Dec 15, 2023', status: 'completed' },
  { id: '3', type: 'maintenance', title: 'Leaky Faucet', subtext: 'Request #2851 • In Progress', date: 'Jan 2, 2024', status: 'in-progress' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'maintenance', title: 'Maintenance Update', message: 'Your AC repair has been completed', date: '2 hours ago', read: false },
  { id: '2', type: 'payment', title: 'Payment Reminder', message: 'Rent due in 3 days', date: '1 day ago', read: false },
  { id: '3', type: 'announcement', title: 'Community Notice', message: 'New gym equipment installed', date: '3 days ago', read: true },
];

const MOCK_MAINTENANCE: MaintenanceRequest[] = [
  { id: '2847', title: 'AC Repair', description: 'Air conditioning not cooling properly in living room', status: 'completed', date: 'Dec 15, 2023', category: 'HVAC' },
  { id: '2851', title: 'Leaky Faucet', description: 'Kitchen sink faucet dripping continuously', status: 'in-progress', date: 'Jan 2, 2024', category: 'Plumbing' },
];

const MOCK_MESSAGES: Message[] = [
  { id: '1', from: 'management', text: 'Hi John, your maintenance request #2851 has been scheduled for tomorrow between 9-11 AM.', timestamp: '2024-01-02T14:30:00', read: true },
  { id: '2', from: 'tenant', text: 'Perfect, thank you! I\'ll be home.', timestamp: '2024-01-02T14:35:00', read: true },
];

const MOCK_DOCUMENTS: Document[] = [
  { id: '1', name: 'Lease Agreement 2023-2024', type: 'PDF', date: 'Aug 1, 2023', size: '2.4 MB' },
  { id: '2', name: 'Community Rules & Regulations', type: 'PDF', date: 'Aug 1, 2023', size: '856 KB' },
  { id: '3', name: 'Move-In Checklist', type: 'PDF', date: 'Aug 1, 2023', size: '324 KB' },
];

// ============================================
// UTILITY COMPONENTS
// ============================================
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

function StatusBadge({ status, children }: { status: 'paid' | 'due-soon' | 'overdue'; children: React.ReactNode }) {
  const styles = {
    paid: 'bg-green-100 text-green-700 border-green-200',
    'due-soon': 'bg-amber-100 text-amber-700 border-amber-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status === 'paid' && <CheckCircle className="w-3.5 h-3.5" />}
      {status === 'due-soon' && <Clock className="w-3.5 h-3.5" />}
      {status === 'overdue' && <AlertCircle className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

// Action Tile Component
interface ActionTileProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'gold' | 'blue' | 'green';
  badge?: number;
}

function ActionTile({ icon: Icon, label, onClick, variant = 'default', badge }: ActionTileProps) {
  const variants = {
    default: 'bg-white hover:bg-gray-50 text-primary-blue',
    gold: 'bg-gold/10 hover:bg-gold/20 text-gold',
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
    green: 'bg-green-50 hover:bg-green-100 text-green-600',
  };
  
  return (
    <button onClick={onClick} className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200 active:scale-95 ${variants[variant]}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${variant === 'default' ? 'bg-gray-100' : 'bg-white/50'}`}>
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <span className="text-sm font-medium">{label}</span>
      {badge && badge > 0 && (
        <span className="absolute top-3 right-3 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

// Service List Item Component
function ServiceItem({ icon: Icon, title, onClick, badge }: { icon: React.ElementType; title: string; onClick?: () => void; badge?: string }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
        <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
      </div>
      <div className="flex-1 text-left">
        <span className="font-medium text-primary-blue">{title}</span>
      </div>
      {badge && <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-semibold rounded-full">{badge}</span>}
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gold transition-colors" />
    </button>
  );
}

// Activity Item Component
function ActivityItem({ activity, onClick }: { activity: Activity; onClick?: () => void }) {
  const icons = { payment: Receipt, maintenance: Wrench, lease: FileText, announcement: Bell };
  const statusColors = { completed: 'bg-green-100 text-green-600', pending: 'bg-amber-100 text-amber-600', 'in-progress': 'bg-blue-100 text-blue-600' };
  const Icon = icons[activity.type];
  
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${statusColors[activity.status]}`}>
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="font-medium text-primary-blue truncate">{activity.title}</p>
        <p className="text-sm text-muted-blue">{activity.subtext}</p>
      </div>
      <span className="text-xs text-muted-blue whitespace-nowrap">{activity.date}</span>
    </button>
  );
}

// ============================================
// OVERDUE BANNER COMPONENT
// ============================================
// ============================================
// PAYMENT MODAL
// ============================================
function PaymentModal({ isOpen, onClose, balance, onPaymentComplete }: { 
  isOpen: boolean; 
  onClose: () => void; 
  balance: number;
  onPaymentComplete: () => void;
}) {
  const [step, setStep] = useState<'amount' | 'method' | 'confirm' | 'processing' | 'success'>('amount');
  const [amount, setAmount] = useState(balance.toString());
  const [method, setMethod] = useState<'card' | 'bank' | null>(null);
  const [saveMethod, setSaveMethod] = useState(false);
  const [enableAutopay, setEnableAutopay] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('amount');
      setAmount(balance.toString());
      setMethod(null);
    }
  }, [isOpen, balance]);

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onPaymentComplete();
    }, 2000);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => setStep('amount'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetAndClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 top-[5%] bg-white rounded-2xl z-50 max-w-md mx-auto overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {step !== 'amount' && step !== 'success' && (
                  <button onClick={() => setStep(step === 'confirm' ? 'method' : 'amount')} className="w-8 h-8 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-lg font-display font-semibold text-primary-blue">
                  {step === 'amount' && 'Pay Rent'}
                  {step === 'method' && 'Payment Method'}
                  {step === 'confirm' && 'Confirm Payment'}
                  {step === 'processing' && 'Processing...'}
                  {step === 'success' && 'Payment Complete!'}
                </h2>
              </div>
              <button onClick={resetAndClose} className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Amount Step */}
              {step === 'amount' && (
                <div className="space-y-6">
                  <div className="text-center py-6">
                    <p className="text-muted-blue mb-2">Amount to Pay</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-4xl font-display font-bold text-primary-blue">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-4xl font-display font-bold text-primary-blue w-40 text-center border-b-2 border-gold focus:outline-none bg-transparent"
                      />
                    </div>
                    <p className="text-sm text-muted-blue mt-2">Balance Due: ${balance.toLocaleString()}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary-blue">Quick Amounts</p>
                    <div className="flex gap-3">
                      {['Full', 'Half', 'Custom'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAmount(opt === 'Full' ? balance.toString() : opt === 'Half' ? (balance / 2).toString() : '')}
                          className="flex-1 py-2 px-4 border border-gray-200 rounded-xl text-sm font-medium hover:border-gold hover:text-gold transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => setStep('method')} className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold rounded-xl">
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {/* Method Step */}
              {step === 'method' && (
                <div className="space-y-4">
                  <button
                    onClick={() => setMethod('card')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${method === 'card' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-primary-blue">Credit/Debit Card</p>
                      <p className="text-sm text-muted-blue">Visa, Mastercard, Amex</p>
                    </div>
                    {method === 'card' && <CheckCircle className="w-5 h-5 text-gold" />}
                  </button>

                  <button
                    onClick={() => setMethod('bank')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${method === 'bank' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-primary-blue">Bank Account</p>
                      <p className="text-sm text-muted-blue">ACH bank transfer</p>
                    </div>
                    {method === 'bank' && <CheckCircle className="w-5 h-5 text-gold" />}
                  </button>

                  <label className="flex items-center gap-3 p-4">
                    <input type="checkbox" checked={saveMethod} onChange={(e) => setSaveMethod(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold" />
                    <span className="text-sm text-muted-blue">Save this payment method for future payments</span>
                  </label>

                  <Button 
                    onClick={() => setStep('confirm')} 
                    disabled={!method}
                    className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold rounded-xl disabled:opacity-50"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {/* Confirm Step */}
              {step === 'confirm' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Amount</span>
                      <span className="font-semibold text-primary-blue">${parseFloat(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Payment Method</span>
                      <span className="font-semibold text-primary-blue">{method === 'card' ? 'Credit Card' : 'Bank Account'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Processing Fee</span>
                      <span className="font-semibold text-primary-blue">{method === 'card' ? '$35.00' : 'Free'}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="font-semibold text-primary-blue">Total</span>
                      <span className="font-bold text-primary-blue">${(parseFloat(amount) + (method === 'card' ? 35 : 0)).toLocaleString()}</span>
                    </div>
                  </div>

                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={enableAutopay} 
                      onChange={(e) => setEnableAutopay(e.target.checked)} 
                      className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold" 
                    />
                    <span className="text-sm text-muted-blue">Enable AutoPay for future rent payments</span>
                  </label>

                  <Button onClick={handlePay} className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold rounded-xl">
                    Confirm Payment
                    <Lock className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-blue text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Secure 256-bit SSL encrypted payment
                  </p>
                </div>
              )}

              {/* Processing */}
              {step === 'processing' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
                  <p className="text-primary-blue font-medium">Processing your payment...</p>
                  <p className="text-sm text-muted-blue">Please do not close this window</p>
                </div>
              )}

              {/* Success */}
              {step === 'success' && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-primary-blue mb-2">Payment Successful!</h3>
                  <p className="text-muted-blue mb-6">Thank you for your payment of ${parseFloat(amount).toLocaleString()}</p>
                  <div className="bg-gray-50 rounded-xl p-4 w-full mb-6 text-left">
                    <p className="text-sm"><span className="text-muted-blue">Confirmation #:</span> <span className="font-mono font-medium">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></p>
                    <p className="text-sm mt-1"><span className="text-muted-blue">Date:</span> <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
                  </div>
                  <div className="flex gap-3 w-full">
                    <Button onClick={resetAndClose} variant="outline" className="flex-1 h-12 border-2">
                      <Download className="w-4 h-4 mr-2" />
                      Receipt
                    </Button>
                    <Button onClick={resetAndClose} className="flex-1 h-12 bg-gold text-primary-blue hover:bg-gold-light">
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAINTENANCE REQUEST MODAL
// ============================================
function MaintenanceModal({ isOpen, onClose, requests, onNewRequest }: { 
  isOpen: boolean; 
  onClose: () => void; 
  requests: MaintenanceRequest[];
  onNewRequest: (request: MaintenanceRequest) => void;
}) {
  const [view, setView] = useState<'list' | 'detail' | 'new'>('list');
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [newRequest, setNewRequest] = useState({ title: '', category: '', description: '', permission: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) setView('list');
  }, [isOpen]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const request: MaintenanceRequest = {
        id: Math.random().toString(36).substr(2, 4).toUpperCase(),
        title: newRequest.title,
        description: newRequest.description,
        category: newRequest.category,
        status: 'submitted',
        date: new Date().toISOString(),
      };
      onNewRequest(request);
      setIsSubmitting(false);
      setNewRequest({ title: '', category: '', description: '', permission: false });
      setView('list');
      toast.success('Maintenance request submitted successfully!');
    }, 1500);
  };

  const getStatusStep = (status: string) => {
    const steps = ['submitted', 'in-review', 'scheduled', 'in-progress', 'completed'];
    return steps.indexOf(status);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-3xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {(view === 'detail' || view === 'new') && (
                  <button 
                    onClick={() => setView('list')} 
                    className="w-8 h-8 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-lg font-display font-semibold text-primary-blue">
                  {view === 'list' && 'Maintenance Requests'}
                  {view === 'detail' && 'Request Details'}
                  {view === 'new' && 'New Request'}
                </h2>
              </div>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* List View */}
              {view === 'list' && (
                <div className="p-4 space-y-4">
                  <button
                    onClick={() => setView('new')}
                    className="w-full flex items-center gap-4 p-4 bg-gold/10 rounded-xl border-2 border-dashed border-gold/30 hover:border-gold transition-colors"
                  >
                    <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-primary-blue">Submit New Request</p>
                      <p className="text-sm text-muted-blue">Report a new maintenance issue</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold" />
                  </button>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-blue uppercase tracking-wider">Your Requests</p>
                    {requests.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => { setSelectedRequest(req); setView('detail'); }}
                        className="w-full bg-white border border-gray-100 rounded-xl p-4 text-left hover:border-gold/50 transition-colors shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-primary-blue">{req.title}</p>
                            <p className="text-sm text-muted-blue">#{req.id} • {req.category}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            req.status === 'completed' ? 'bg-green-100 text-green-700' :
                            req.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {req.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-blue line-clamp-2">{req.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Detail View */}
              {view === 'detail' && selectedRequest && (
                <div className="p-4 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      selectedRequest.status === 'completed' ? 'bg-green-100' :
                      selectedRequest.status === 'in-progress' ? 'bg-blue-100' : 'bg-amber-100'
                    }`}>
                      <Wrench className={`w-7 h-7 ${
                        selectedRequest.status === 'completed' ? 'text-green-600' :
                        selectedRequest.status === 'in-progress' ? 'text-blue-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-primary-blue text-lg">{selectedRequest.title}</h3>
                      <p className="text-sm text-muted-blue">Request #{selectedRequest.id}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-primary-blue mb-4">Request Status</p>
                    <div className="space-y-4">
                      {['Submitted', 'In Review', 'Scheduled', 'In Progress', 'Complete'].map((label, idx) => {
                        const step = getStatusStep(selectedRequest.status);
                        const isActive = idx <= step;
                        const isCurrent = idx === step;
                        return (
                          <div key={label} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isActive ? 'bg-gold text-primary-blue' : 'bg-gray-200 text-gray-400'
                            }`}>
                              {isActive ? <Check className="w-4 h-4" /> : <span className="text-xs">{idx + 1}</span>}
                            </div>
                            <span className={`font-medium ${isCurrent ? 'text-primary-blue' : isActive ? 'text-primary-blue/70' : 'text-muted-blue'}`}>
                              {label}
                            </span>
                            {isCurrent && <span className="ml-auto text-xs text-gold font-medium">Current</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary-blue">Description</p>
                    <p className="text-muted-blue bg-gray-50 rounded-xl p-4">{selectedRequest.description}</p>
                  </div>

                  {selectedRequest.status === 'in-progress' && (
                    <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Technician Scheduled</p>
                        <p className="text-sm text-blue-700">A technician will arrive tomorrow between 9:00 AM - 11:00 AM</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* New Request View */}
              {view === 'new' && (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-blue mb-2">Issue Category</label>
                    <select 
                      value={newRequest.category}
                      onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:border-gold focus:outline-none"
                    >
                      <option value="">Select category...</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="HVAC">Heating / AC</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Appliance">Appliance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-blue mb-2">Issue Title</label>
                    <Input
                      value={newRequest.title}
                      onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                      placeholder="e.g., Kitchen sink leaking"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-blue mb-2">Description</label>
                    <textarea
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                      placeholder="Please describe the issue in detail..."
                      rows={4}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:border-gold focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-blue mb-2">Photos (Optional)</label>
                    <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold/50 transition-colors">
                      <Camera className="w-5 h-5 text-muted-blue" />
                      <span className="text-muted-blue">Add Photos</span>
                    </button>
                  </div>

                  <label className="flex items-start gap-3 p-3">
                    <input 
                      type="checkbox" 
                      checked={newRequest.permission}
                      onChange={(e) => setNewRequest({...newRequest, permission: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold mt-0.5" 
                    />
                    <span className="text-sm text-muted-blue">I give permission for maintenance staff to enter my unit if I'm not home</span>
                  </label>

                  <Button 
                    onClick={handleSubmit}
                    disabled={!newRequest.title || !newRequest.category || !newRequest.description || isSubmitting}
                    className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Request</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MESSAGES MODAL
// ============================================
function MessagesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      const msg: Message = {
        id: Date.now().toString(),
        from: 'tenant',
        text: newMessage,
        timestamp: new Date().toISOString(),
        read: true,
      };
      setMessages([...messages, msg]);
      setNewMessage('');
      setIsSending(false);
      
      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          from: 'management',
          text: 'Thank you for your message. Our team will get back to you shortly.',
          timestamp: new Date().toISOString(),
          read: true,
        }]);
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-3xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-primary-blue">Property Management</h2>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Online
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'tenant' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.from === 'tenant' ? 'bg-gold text-primary-blue rounded-br-md' : 'bg-gray-100 text-primary-blue rounded-bl-md'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === 'tenant' ? 'text-primary-blue/60' : 'text-muted-blue'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 h-12 px-4 border border-gray-200 rounded-full focus:border-gold focus:outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={!newMessage.trim() || isSending}
                  className="w-12 h-12 bg-gold text-primary-blue rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-gold-light transition-colors"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// DOCUMENTS MODAL
// ============================================
function DocumentsModal({ isOpen, onClose, documents }: { isOpen: boolean; onClose: () => void; documents: Document[] }) {
  const [activeTab, setActiveTab] = useState<'documents' | 'insurance'>('documents');
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    if (!insuranceFile) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setInsuranceFile(null);
      toast.success('Insurance document uploaded successfully!');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-[15%] bg-white rounded-t-3xl z-50 overflow-hidden flex flex-col"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'text-gold border-b-2 border-gold' : 'text-muted-blue'}`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab('insurance')}
                className={`flex-1 py-4 text-sm font-medium ${activeTab === 'insurance' ? 'text-gold border-b-2 border-gold' : 'text-muted-blue'}`}
              >
                Insurance Upload
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'documents' && (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary-blue truncate">{doc.name}</p>
                        <p className="text-xs text-muted-blue">{doc.type} • {doc.size} • {doc.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-gold rounded-full hover:bg-white transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-gold rounded-full hover:bg-white transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Tax Statement */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-primary-blue mb-3">Tax Documents</p>
                    <button className="w-full flex items-center gap-4 p-4 bg-gold/10 rounded-xl border border-gold/20 hover:border-gold transition-colors">
                      <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                        <Receipt className="w-6 h-6 text-primary-blue" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-primary-blue">2023 Tax Statement (1099)</p>
                        <p className="text-xs text-muted-blue">Available for download</p>
                      </div>
                      <Download className="w-5 h-5 text-gold" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'insurance' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Renter's Insurance Required</p>
                      <p className="text-sm text-blue-700">Please upload your current renter's insurance policy. Minimum $100,000 liability coverage required.</p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-muted-blue" />
                    </div>
                    <p className="font-medium text-primary-blue mb-1">Upload Insurance Document</p>
                    <p className="text-sm text-muted-blue mb-4">PDF, JPG, or PNG up to 10MB</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setInsuranceFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="insurance-upload"
                    />
                    <label
                      htmlFor="insurance-upload"
                      className="inline-flex items-center px-4 py-2 bg-gold text-primary-blue rounded-lg font-medium cursor-pointer hover:bg-gold-light transition-colors"
                    >
                      <FileUp className="w-4 h-4 mr-2" />
                      Select File
                    </label>
                    {insuranceFile && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gold" />
                        <span className="text-sm text-primary-blue flex-1 truncate">{insuranceFile.name}</span>
                        <button onClick={() => setInsuranceFile(null)} className="text-red-500 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleUpload}
                    disabled={!insuranceFile || isUploading}
                    className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold rounded-xl disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>Upload Document</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// LEASE MODAL
// ============================================
function LeaseModal({ isOpen, onClose, leaseEnd }: { isOpen: boolean; onClose: () => void; leaseEnd: string }) {
  const leaseInfo = {
    startDate: 'Aug 1, 2023',
    endDate: leaseEnd,
    monthlyRent: '$1,850',
    securityDeposit: '$1,850',
    unit: '4B',
    squareFeet: '1,050',
    beds: 2,
    baths: 2,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-3xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-display font-semibold text-primary-blue">Your Lease</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Lease Status */}
              <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Lease Active</p>
                  <p className="text-sm text-green-700">Expires {new Date(leaseEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {Math.ceil((new Date(leaseEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                </span>
              </div>

              {/* Lease Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-muted-blue uppercase tracking-wider mb-1">Monthly Rent</p>
                  <p className="text-xl font-display font-bold text-primary-blue">{leaseInfo.monthlyRent}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-muted-blue uppercase tracking-wider mb-1">Security Deposit</p>
                  <p className="text-xl font-display font-bold text-primary-blue">{leaseInfo.securityDeposit}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-muted-blue uppercase tracking-wider mb-1">Unit</p>
                  <p className="text-xl font-display font-bold text-primary-blue">{leaseInfo.unit}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-muted-blue uppercase tracking-wider mb-1">Square Feet</p>
                  <p className="text-xl font-display font-bold text-primary-blue">{leaseInfo.squareFeet}</p>
                </div>
              </div>

              {/* Important Dates */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold text-muted-blue uppercase tracking-wider">Important Dates</p>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span className="text-primary-blue">Lease Start</span>
                  </div>
                  <span className="font-medium text-primary-blue">{leaseInfo.startDate}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span className="text-primary-blue">Lease End</span>
                  </div>
                  <span className="font-medium text-primary-blue">{new Date(leaseEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-blue uppercase tracking-wider">Actions</p>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gold" />
                    <span className="text-primary-blue">Download Lease Agreement</span>
                  </div>
                  <Download className="w-5 h-5 text-muted-blue" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-gold" />
                    <span className="text-primary-blue">Renewal Options</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-blue" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gold" />
                    <span className="text-primary-blue">Submit Move-Out Notice</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-blue" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// HEADER COMPONENT
// ============================================
interface HeaderProps {
  property: Property;
  user: User;
  notificationCount: number;
  onMenuClick: () => void;
  onNotificationsClick: () => void;
}

function Header({ property, user, notificationCount, onMenuClick, onNotificationsClick }: HeaderProps) {
  return (
    <header className="bg-primary-blue fixed top-0 left-0 right-0 z-40">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-gold" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-display font-semibold text-sm leading-tight">{property.name}</p>
              <p className="text-white/60 text-xs">Unit {user.unitNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onNotificationsClick}
              className="relative w-10 h-10 flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/10 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
            
            <div className="w-9 h-9 bg-gold rounded-full flex items-center justify-center">
              <span className="text-primary-blue font-semibold text-sm">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            
            <button
              onClick={onMenuClick}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================
// ACCOUNT SNAPSHOT COMPONENT
// ============================================
interface AccountSnapshotProps {
  user: User;
  onPayRent: () => void;
  onViewLedger: () => void;
  isLoading?: boolean;
  isOverdue: boolean;
}

function AccountSnapshot({ user, onPayRent, onViewLedger, isLoading, isOverdue }: AccountSnapshotProps) {
  const isPaid = user.balance === 0;
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-32 mb-2" />
        <Skeleton className="h-12 w-full mt-4" />
      </div>
    );
  }
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden">
      <div className={`rounded-3xl p-6 ${isPaid ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-100'} shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-muted-blue uppercase tracking-wider">
            {isPaid ? 'Account Status' : 'Current Balance'}
          </span>
          <StatusBadge status={isPaid ? 'paid' : isOverdue ? 'overdue' : 'due-soon'}>
            {isPaid ? 'Paid' : isOverdue ? 'Overdue' : 'Due Soon'}
          </StatusBadge>
        </div>
        
        <div className="mb-1">
          <span className={`text-4xl font-display font-bold ${isPaid ? 'text-green-700' : 'text-primary-blue'}`}>
            {isPaid ? '$0' : `$${user.balance.toLocaleString()}`}
          </span>
          {!isPaid && <span className="text-muted-blue text-sm ml-1">due {new Date(user.rentDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
        </div>
        
        <div className="mt-6 space-y-3">
          {isPaid ? (
            <>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">No Balance Due</span>
              </div>
              <Button variant="outline" onClick={onViewLedger} className="w-full h-12 border-2 border-gray-200 text-primary-blue hover:border-gold hover:text-gold font-semibold rounded-xl">
                View Ledger
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onPayRent} className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold text-base rounded-xl shadow-lg shadow-gold/25">
                Pay Rent
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <button onClick={onViewLedger} className="w-full text-center text-sm text-muted-blue hover:text-gold font-medium transition-colors">
                View Ledger
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// QUICK ACTIONS COMPONENT
// ============================================
function QuickActions({ onMaintenance, onLease, onMessages, onDocuments, isLoading, messageCount }: { 
  onMaintenance: () => void;
  onLease: () => void;
  onMessages: () => void;
  onDocuments: () => void;
  isLoading?: boolean;
  messageCount?: number;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
      </div>
    );
  }
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <div className="grid grid-cols-4 gap-3">
        <ActionTile icon={Wrench} label="Maintenance" onClick={onMaintenance} variant="gold" />
        <ActionTile icon={FileText} label="Lease" onClick={onLease} variant="blue" />
        <ActionTile icon={MessageSquare} label="Messages" onClick={onMessages} variant="green" badge={messageCount} />
        <ActionTile icon={Upload} label="Documents" onClick={onDocuments} variant="default" />
      </div>
    </motion.div>
  );
}

// ============================================
// ACCOUNT & SERVICES COMPONENT
// ============================================
function AccountServices({ user, onPaymentHistory, onAutopay, onMoveOut, onInsurance, onSettings, isLoading }: { 
  user: User; 
  onPaymentHistory: () => void;
  onAutopay: () => void;
  onMoveOut: () => void;
  onInsurance: () => void;
  onSettings: () => void;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 m-2" />)}
      </div>
    );
  }
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <h2 className="text-sm font-semibold text-muted-blue uppercase tracking-wider mb-3 px-1">Account & Services</h2>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <ServiceItem icon={History} title="Payment History" onClick={onPaymentHistory} />
        <div className="border-b border-gray-100 mx-4" />
        <ServiceItem icon={Zap} title="AutoPay Settings" onClick={onAutopay} badge={user.autopayEnabled ? 'Active' : 'Setup'} />
        <div className="border-b border-gray-100 mx-4" />
        <ServiceItem icon={Home} title="Move-Out / Transfer" onClick={onMoveOut} />
        <div className="border-b border-gray-100 mx-4" />
        <ServiceItem icon={Shield} title="Insurance Upload" onClick={onInsurance} badge={user.insuranceUploaded ? 'Uploaded' : 'Required'} />
        <div className="border-b border-gray-100 mx-4" />
        <ServiceItem icon={Settings} title="Account Settings" onClick={onSettings} />
      </div>
    </motion.div>
  );
}

// ============================================
// RECENT ACTIVITY COMPONENT
// ============================================
function RecentActivity({ activities, onViewAll, onActivityClick, isLoading }: { 
  activities: Activity[];
  onViewAll: () => void;
  onActivityClick: (activity: Activity) => void;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden p-4">
        <Skeleton className="h-4 w-32 mb-4" />
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 my-2" />)}
      </div>
    );
  }
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-muted-blue uppercase tracking-wider">Recent Activity</h2>
        <button onClick={onViewAll} className="text-xs text-gold hover:text-gold-dark font-medium">View All</button>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {activities.slice(0, 3).map((activity, index) => (
          <div key={activity.id}>
            <ActivityItem activity={activity} onClick={() => onActivityClick(activity)} />
            {index < Math.min(activities.length, 3) - 1 && <div className="border-b border-gray-100 mx-4" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// BOTTOM NAVIGATION
// ============================================
type NavTab = 'home' | 'payments' | 'maintenance' | 'messages' | 'more';

function BottomNav({ activeTab, onTabChange, onPaymentClick, onMaintenanceClick, onMessagesClick }: { 
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onPaymentClick: () => void;
  onMaintenanceClick: () => void;
  onMessagesClick: () => void;
}) {
  const tabs: { id: NavTab; icon: React.ElementType; label: string; onClick?: () => void }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'payments', icon: CreditCard, label: 'Payments', onClick: onPaymentClick },
    { id: 'maintenance', icon: Wrench, label: 'Maintenance', onClick: onMaintenanceClick },
    { id: 'messages', icon: MessageSquare, label: 'Messages', onClick: onMessagesClick },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  tab.onClick?.();
                }}
                className={`flex flex-col items-center justify-center py-2 px-4 min-h-[56px] flex-1 transition-colors ${isActive ? 'text-gold' : 'text-muted-blue hover:text-primary-blue'}`}
              >
                <tab.icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ============================================
// NOTIFICATIONS DRAWER
// ============================================
function NotificationsDrawer({ isOpen, onClose, notifications, onMarkAllRead }: { 
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAllRead: () => void;
}) {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-display font-semibold text-primary-blue">Notifications</h2>
                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {unreadCount > 0 && (
                <button onClick={onMarkAllRead} className="px-4 py-3 text-sm text-gold hover:text-gold-dark font-medium text-left border-b border-gray-100">
                  Mark all as read
                </button>
              )}
              
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Bell className="w-12 h-12 text-gray-200 mb-4" />
                    <p className="text-muted-blue">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-gold/5' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notification.read ? 'bg-gold' : 'bg-gray-200'}`} />
                        <div className="flex-1">
                          <p className="font-medium text-primary-blue text-sm">{notification.title}</p>
                          <p className="text-sm text-muted-blue mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-blue/70 mt-2">{notification.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// SIDE MENU DRAWER
// ============================================
function SideMenu({ isOpen, onClose, user, onLogout }: { isOpen: boolean; onClose: () => void; user: User; onLogout: () => void }) {
  const menuItems = [
    { icon: User, label: 'Profile', onClick: () => toast.info('Profile coming soon!') },
    { icon: FileCheck, label: 'Tax Statements', onClick: () => toast.info('Tax statements coming soon!') },
    { icon: Download, label: 'Documents', onClick: () => toast.info('Documents coming soon!') },
    { icon: Phone, label: 'Contact Support', onClick: () => window.location.href = 'tel:+17135551234' },
    { icon: Settings, label: 'Settings', onClick: () => toast.info('Settings coming soon!') },
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="bg-primary-blue p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/70 text-sm uppercase tracking-wider">Menu</span>
                  <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-gold rounded-full hover:bg-white/10 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-primary-blue font-display font-bold text-lg">{user.firstName[0]}{user.lastName[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-white/60 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 py-4">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { item.onClick(); onClose(); }}
                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-muted-blue" strokeWidth={1.5} />
                    <span className="text-primary-blue font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => { onClose(); onLogout(); }}
                  className="w-full flex items-center gap-4 px-6 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STICKY PAY BUTTON
// ============================================
function StickyPayButton({ user, onPayRent, isVisible }: { user: User; onPayRent: () => void; isVisible: boolean }) {
  if (user.balance === 0 || !isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-20 left-4 right-4 z-40 max-w-lg mx-auto"
        >
          <Button onClick={onPayRent} className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold text-base rounded-xl shadow-xl shadow-gold/30">
            Pay Rent — ${user.balance.toLocaleString()}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// AUTOPAY MODAL
// ============================================
function AutopayModal({ isOpen, onClose, isEnabled, onToggle }: { isOpen: boolean; onClose: () => void; isEnabled: boolean; onToggle: (enabled: boolean) => void }) {
  const [step, setStep] = useState<'info' | 'setup' | 'confirm'>('info');
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (isOpen) setStep(isEnabled ? 'info' : 'setup');
  }, [isOpen, isEnabled]);

  const handleEnable = () => {
    if (step === 'setup') {
      setStep('confirm');
    } else {
      onToggle(true);
      onClose();
      toast.success('AutoPay enabled successfully!');
    }
  };

  const handleDisable = () => {
    onToggle(false);
    onClose();
    toast.success('AutoPay disabled');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50" />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-[20%] bg-white rounded-t-3xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-display font-semibold text-primary-blue">AutoPay Settings</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-muted-blue hover:text-primary-blue rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {isEnabled && step === 'info' ? (
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">AutoPay is Active</p>
                      <p className="text-sm text-green-700">Your rent will be paid automatically on the 1st of each month</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Payment Method</span>
                      <span className="font-medium text-primary-blue">•••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Payment Date</span>
                      <span className="font-medium text-primary-blue">1st of each month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Next Payment</span>
                      <span className="font-medium text-primary-blue">Feb 1, 2024</span>
                    </div>
                  </div>

                  <Button onClick={handleDisable} variant="outline" className="w-full h-14 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                    Disable AutoPay
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gold/10 rounded-xl p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-primary-blue">Never Miss a Payment</p>
                      <p className="text-sm text-muted-blue">AutoPay automatically pays your rent on the 1st of each month. No late fees, no worries.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-blue mb-3">Select Payment Method</label>
                    <div className="space-y-3">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-gray-200'}`}
                      >
                        <CreditCard className="w-6 h-6 text-gold" />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-primary-blue">Credit Card ending in 4242</p>
                          <p className="text-sm text-muted-blue">Visa • Expires 12/25</p>
                        </div>
                        {paymentMethod === 'card' && <CheckCircle className="w-5 h-5 text-gold" />}
                      </button>

                      <button
                        onClick={() => setPaymentMethod('bank')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${paymentMethod === 'bank' ? 'border-gold bg-gold/5' : 'border-gray-200'}`}
                      >
                        <Building2 className="w-6 h-6 text-gold" />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-primary-blue">Add Bank Account</p>
                          <p className="text-sm text-muted-blue">Free ACH transfer</p>
                        </div>
                        {paymentMethod === 'bank' && <CheckCircle className="w-5 h-5 text-gold" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-primary-blue mb-2">How it works:</p>
                    <ul className="text-sm text-muted-blue space-y-2">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Rent paid automatically on the 1st</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Email confirmation sent after payment</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Cancel anytime before the 1st</li>
                    </ul>
                  </div>

                  <Button onClick={handleEnable} className="w-full h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold rounded-xl">
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
              
              {step === 'confirm' && (
                <div className="space-y-6">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-primary-blue mb-2">Confirm AutoPay Setup</h3>
                    <p className="text-muted-blue">Please review your AutoPay settings</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Payment Method</span>
                      <span className="font-medium text-primary-blue">{paymentMethod === 'card' ? 'Credit Card ending in 4242' : 'Bank Account'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Payment Amount</span>
                      <span className="font-medium text-primary-blue">$1,850/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-blue">Payment Date</span>
                      <span className="font-medium text-primary-blue">1st of each month</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={() => setStep('setup')} variant="outline" className="flex-1 h-14 border-2">
                      Back
                    </Button>
                    <Button onClick={handleEnable} className="flex-1 h-14 bg-gold text-primary-blue hover:bg-gold-light font-semibold">
                      Confirm
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// STEP 1: PROPERTY SELECTION
// ============================================
function PropertySelect({ onSelect, onAdminLogin }: { onSelect: (property: Property) => void; onAdminLogin: () => void }) {
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const selectedPropertyData = MOCK_PROPERTIES.find(p => p.id === selectedProperty);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
      <div className="w-full max-w-sm py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-primary-blue px-6 py-6 text-center">
            <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-gold" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Resident Portal</h1>
            <p className="text-white/70 text-sm mt-2">Select your community</p>
          </div>

          <div className="p-5">
            <div className="relative mb-4">
              <label className="block text-xs font-medium text-muted-blue mb-2 uppercase tracking-wide">Your Property</label>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:border-gold transition-colors bg-white text-left"
              >
                <span className={`text-sm ${selectedProperty ? 'text-primary-blue' : 'text-gray-400'}`}>
                  {selectedPropertyData ? selectedPropertyData.name : 'Select property'}
                </span>
                <ChevronDown className={`w-4 h-4 text-muted-blue transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {MOCK_PROPERTIES.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => { setSelectedProperty(property.id); setIsOpen(false); }}
                      className="w-full px-4 py-3 text-left hover:bg-gold/5 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="font-medium text-primary-blue text-sm">{property.name}</div>
                      <div className="text-xs text-muted-blue">{property.city}, {property.state}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <Button onClick={() => selectedPropertyData && onSelect(selectedPropertyData)} disabled={!selectedProperty} className="w-full bg-gold text-primary-blue hover:bg-gold-light font-semibold h-12 rounded-xl disabled:opacity-50">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-xs text-muted-blue">or</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            <button onClick={onAdminLogin} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gold/50 rounded-xl text-gold hover:bg-gold/5 hover:border-gold transition-colors text-sm font-medium">
              <User className="w-4 h-4" />
              Demo Login
            </button>

            <a href="tel:+17135551234" className="mt-5 text-sm text-muted-blue hover:text-gold flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4" />
              Need Help?
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// STEP 2: LOGIN AUTHENTICATION
// ============================================
function LoginScreen({ property, onLogin }: { property: Property; onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onLogin();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
      <div className="w-full max-w-sm py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-primary-blue px-6 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-gold" />
              <span className="text-xs text-white/70 uppercase tracking-wide">Resident Portal</span>
            </div>
            <h1 className="text-xl font-display font-bold text-white">{property.name}</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-5">
            <div className="mb-4">
              <label className="block text-xs font-medium text-muted-blue mb-2 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-blue" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="pl-10 h-11 text-sm border-gray-200 focus:border-gold rounded-xl" required />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-muted-blue mb-2 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-blue" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 h-11 text-sm border-gray-200 focus:border-gold rounded-xl" required />
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <a href="#" className="text-xs text-gold hover:text-gold-dark font-medium">Forgot Password?</a>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-gold text-primary-blue hover:bg-gold-light font-semibold h-11 rounded-xl">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center">Login<ArrowRight className="w-4 h-4 ml-2" /></span>
              )}
            </Button>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-sm text-muted-blue">New resident? <a href="#" className="text-gold hover:text-gold-dark font-medium">Register</a></p>
            </div>
          </form>
        </div>

        <a href="tel:+17135551234" className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted-blue hover:text-gold">
          <Phone className="w-4 h-4" />
          Contact Leasing Office
        </a>
      </div>
    </motion.div>
  );
}

// ============================================
// STEP 3: REDESIGNED RESIDENT DASHBOARD
// ============================================
function Dashboard({ property, initialUser, onLogout }: { property: Property; initialUser: User; onLogout: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
  const [isAutopayModalOpen, setIsAutopayModalOpen] = useState(false);
  const [showStickyPay, setShowStickyPay] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [maintenanceRequests, setMaintenanceRequests] = useState(MOCK_MAINTENANCE);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [user, setUser] = useState(initialUser);
  const mainRef = useRef<HTMLDivElement>(null);

  const isOverdue = user.balance > 0 && new Date() > new Date(user.rentDue);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollTop = mainRef.current.scrollTop;
        setShowStickyPay(scrollTop > 300 && user.balance > 0);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, [user.balance]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handlePaymentComplete = () => {
    setUser({ ...user, balance: 0 });
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'payment',
      title: 'Rent Paid',
      subtext: `Jan 2024 • $${initialUser.balance.toLocaleString()}`,
      date: 'Just now',
      status: 'completed',
    };
    setActivities([newActivity, ...activities]);
  };

  const handleNewMaintenanceRequest = (request: MaintenanceRequest) => {
    setMaintenanceRequests([request, ...maintenanceRequests]);
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'maintenance',
      title: request.title,
      subtext: `Request #${request.id} • Submitted`,
      date: 'Just now',
      status: 'pending',
    };
    setActivities([newActivity, ...activities]);
  };

  const handleToggleAutopay = (enabled: boolean) => {
    setUser({ ...user, autopayEnabled: enabled });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <Header
        property={property}
        user={user}
        notificationCount={unreadCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
      />

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto pt-20 pb-28 px-4">
        <div className="max-w-lg mx-auto space-y-6">
          <AccountSnapshot
            user={user}
            onPayRent={() => setIsPaymentModalOpen(true)}
            onViewLedger={() => toast.info('Ledger view coming soon!')}
            isLoading={isLoading}
            isOverdue={isOverdue}
          />

          <QuickActions
            onMaintenance={() => setIsMaintenanceModalOpen(true)}
            onLease={() => setIsLeaseModalOpen(true)}
            onMessages={() => setIsMessagesModalOpen(true)}
            onDocuments={() => setIsDocumentsModalOpen(true)}
            isLoading={isLoading}
            messageCount={2}
          />

          <AccountServices
            user={user}
            onPaymentHistory={() => toast.info('Payment history coming soon!')}
            onAutopay={() => setIsAutopayModalOpen(true)}
            onMoveOut={() => toast.info('Move-out form coming soon!')}
            onInsurance={() => setIsDocumentsModalOpen(true)}
            onSettings={() => setIsMenuOpen(true)}
            isLoading={isLoading}
          />

          <RecentActivity
            activities={activities}
            onViewAll={() => toast.info('Full activity history coming soon!')}
            onActivityClick={(activity) => {
              if (activity.type === 'maintenance') setIsMaintenanceModalOpen(true);
            }}
            isLoading={isLoading}
          />

          {!user.autopayEnabled && !isLoading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-gradient-to-r from-primary-blue to-secondary-blue rounded-2xl p-5 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg mb-1">Never Miss a Payment</h3>
                  <p className="text-white/70 text-sm mb-3">Set up AutoPay and enjoy peace of mind.</p>
                  <button onClick={() => setIsAutopayModalOpen(true)} className="text-gold font-semibold text-sm hover:text-gold-light transition-colors">Set Up AutoPay →</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onPaymentClick={() => setIsPaymentModalOpen(true)}
        onMaintenanceClick={() => setIsMaintenanceModalOpen(true)}
        onMessagesClick={() => setIsMessagesModalOpen(true)}
      />

      <StickyPayButton user={user} onPayRent={() => setIsPaymentModalOpen(true)} isVisible={showStickyPay} />

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} user={user} onLogout={onLogout} />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        balance={initialUser.balance}
        onPaymentComplete={handlePaymentComplete}
      />

      <MaintenanceModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        requests={maintenanceRequests}
        onNewRequest={handleNewMaintenanceRequest}
      />

      <MessagesModal isOpen={isMessagesModalOpen} onClose={() => setIsMessagesModalOpen(false)} />

      <DocumentsModal isOpen={isDocumentsModalOpen} onClose={() => setIsDocumentsModalOpen(false)} documents={MOCK_DOCUMENTS} />

      <LeaseModal isOpen={isLeaseModalOpen} onClose={() => setIsLeaseModalOpen(false)} leaseEnd={user.leaseEnd} />

      <AutopayModal
        isOpen={isAutopayModalOpen}
        onClose={() => setIsAutopayModalOpen(false)}
        isEnabled={user.autopayEnabled}
        onToggle={handleToggleAutopay}
      />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function ResidentsPage() {
  const [step, setStep] = useState<'select' | 'login' | 'dashboard'>('select');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('resident_session');
    if (session) {
      setSelectedProperty(MOCK_PROPERTIES[0]);
      setStep('dashboard');
    }
  }, []);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setStep('login');
  };

  const handleLogin = () => {
    localStorage.setItem('resident_session', JSON.stringify({ userId: MOCK_USER.id }));
    setStep('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('resident_session');
    setStep('select');
    setSelectedProperty(null);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 'select' && <PropertySelect key="select" onSelect={handlePropertySelect} onAdminLogin={handleLogin} />}
      {step === 'login' && selectedProperty && <LoginScreen key="login" property={selectedProperty} onLogin={handleLogin} />}
      {step === 'dashboard' && selectedProperty && <Dashboard key="dashboard" property={selectedProperty} initialUser={MOCK_USER} onLogout={handleLogout} />}
    </AnimatePresence>
  );
}

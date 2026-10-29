import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle2, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { validateContactForm, ContactFormData, ValidationErrors } from '../utils/validation';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    enquiry: '',
    selectedService: initialService || 'AI Voice Agents',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    id: string;
    timestamp: string;
    data: ContactFormData;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Update selectedService when prop changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, selectedService: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate brief client confirmation processing
    setTimeout(() => {
      const receiptId = `SCC-${Math.floor(100000 + Math.random() * 900000)}`;
      const timestamp = new Date().toLocaleString();
      
      const receipt = {
        id: receiptId,
        timestamp,
        data: { ...formData },
      };

      // Persist in localStorage for user session reference
      try {
        const stored = JSON.parse(localStorage.getItem('scc_enquiries') || '[]');
        stored.push(receipt);
        localStorage.setItem('scc_enquiries', JSON.stringify(stored));
      } catch (err) {
        console.error('Local persistence notice:', err);
      }

      setSubmissionReceipt(receipt);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmissionReceipt(null);
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      enquiry: '',
      selectedService: 'AI Voice Agents',
    });
    setErrors({});
  };

  const copyReceiptDetails = () => {
    if (!submissionReceipt) return;
    const text = `Saan Code n Convert Enquiry Receipt\nID: ${submissionReceipt.id}\nName: ${submissionReceipt.data.name}\nBusiness: ${submissionReceipt.data.businessName}\nService: ${submissionReceipt.data.selectedService}\nEmail: ${submissionReceipt.data.email}\nPhone: ${submissionReceipt.data.phone}\nTimestamp: ${submissionReceipt.timestamp}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#05070d] border-t border-slate-900 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span>04. Direct Consultation</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-4">
            Contact Saan Code n Convert
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Tell us about your current enquiry process and the automation tools you need. Every submission is recorded and verified.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-xl border border-slate-800 bg-[#0a0f1d]">
              <h3 className="text-xl font-bold text-white mb-6 font-display">
                Agency Contact Channels
              </h3>
              
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Enquiry Email</div>
                    <a
                      href="mailto:contact@saancodennconvert.com"
                      className="text-white hover:text-cyan-400 font-medium transition-colors"
                    >
                      contact@saancodennconvert.com
                    </a>
                    <div className="text-xs text-slate-500 mt-0.5">Direct inbox for coaching inquiries</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Voice / WhatsApp Line</div>
                    <a
                      href="tel:+919876543210"
                      className="text-white hover:text-blue-400 font-medium transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <div className="text-xs text-slate-500 mt-0.5">Available for voice agent live demo testing</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">Consultation Hours</div>
                    <div className="text-white font-medium">Monday – Saturday: 9:00 AM – 7:30 PM</div>
                    <div className="text-xs text-slate-500 mt-0.5">Automated AI systems operate 24/7/365</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-950/40 text-xs text-slate-400 space-y-2">
              <div className="font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Transparent Submission Policy
              </div>
              <p className="leading-relaxed">
                Your enquiry data is validated on this client device and stored in local session storage with a generated confirmation ID. We never display fake deliveries or unconfirmed dispatch statuses.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form or Receipt */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-xl border border-slate-800 bg-[#0a0f1d] shadow-xl">
              
              {!submissionReceipt ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  {/* Service Preference Dropdown */}
                  <div>
                    <label
                      htmlFor="selectedService"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                    >
                      Target AI Solution
                    </label>
                    <select
                      id="selectedService"
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                    >
                      <option value="AI Voice Agents">AI Voice Agents (Call answering & follow-ups)</option>
                      <option value="WhatsApp AI Automation">WhatsApp AI Automation (24/7 messaging workflows)</option>
                      <option value="Lead Management Systems">Lead Management Systems (Capture, routing & alerts)</option>
                      <option value="Comprehensive Agency Suite">All Three Integrated Systems</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Sharma"
                        className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Business Name Field */}
                    <div>
                      <label
                        htmlFor="businessName"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                      >
                        Business / Institute Name *
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Apex Academy"
                        className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                          errors.businessName
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.businessName && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.businessName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                      >
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ramesh@apexacademy.com"
                        className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white text-sm focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enquiry Description */}
                  <div>
                    <label
                      htmlFor="enquiry"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2"
                    >
                      Enquiry Requirements & Current Process *
                    </label>
                    <textarea
                      id="enquiry"
                      name="enquiry"
                      rows={4}
                      value={formData.enquiry}
                      onChange={handleChange}
                      placeholder="Describe your current enquiry flow (e.g. how many student calls you receive, who follows up, bottlenecks you face)..."
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900 border text-white text-sm focus:outline-none transition-colors resize-none ${
                        errors.enquiry
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.enquiry && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.enquiry}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Validating & Recording Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Honest Success State / Receipt Summary */
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/50 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white font-display">
                        Enquiry Successfully Registered
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Your consultation request has been validated and recorded locally.
                      </div>
                    </div>
                  </div>

                  {/* Receipt Card */}
                  <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-slate-400">Reference ID:</span>
                      <span className="font-bold text-cyan-400">{submissionReceipt.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Registered Name:</span>
                      <span className="text-white">{submissionReceipt.data.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Institute / Business:</span>
                      <span className="text-white">{submissionReceipt.data.businessName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Selected Solution:</span>
                      <span className="text-cyan-300">{submissionReceipt.data.selectedService}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Contact Email:</span>
                      <span className="text-white">{submissionReceipt.data.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span className="text-white">{submissionReceipt.data.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-slate-300">{submissionReceipt.timestamp}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400 block mb-1">Enquiry Note:</span>
                      <p className="text-slate-300 font-sans text-xs bg-slate-950 p-3 rounded border border-slate-800/80">
                        {submissionReceipt.data.enquiry}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={copyReceiptDetails}
                      className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copied Details</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Reference Slip</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Submit Another Enquiry</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

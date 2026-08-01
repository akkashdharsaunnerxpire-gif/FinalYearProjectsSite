import { useState } from 'react';
import { 
  QrCode, 
  Mail, 
  MessageCircle, 
  IndianRupee, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { QRCodeCanvas } from "qrcode.react";

interface PaymentSectionProps {
  price: number;
}

export default function PaymentSection({ price }: PaymentSectionProps) {
  const upiId = 'akkashdharsaun02-2@okicici';
  const upiName = 'AkkashDharsaun';
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${price}&cu=INR`;
  const whatsappNumber = '+91 8015874936';
  const email = 'akkashdharsaun02@gmail.com';

  const [copied, setCopied] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-5 sm:p-8 border border-blue-200/80 dark:border-slate-800 shadow-xl transition-colors duration-500">
      
      {/* Background Animated Glowing Orbs */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-13 sm:h-13 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Purchase This Project
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Instant Access & Full Source Code Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure UPI Payment</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - QR Code & Price (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Pay via Any UPI App
                </h3>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  GPay / PhonePe / Paytm
                </span>
              </div>

              {/* QR Code Canvas */}
              <div className="bg-slate-50 dark:bg-slate-950/80 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center group relative">
                <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-200/60">
                  <QRCodeCanvas
                    value={upiLink}
                    size={210}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Scan with GPay, PhonePe, or Paytm
                </p>
              </div>

              {/* Amount Display */}
              <div className="flex items-center justify-center gap-1 mt-5 mb-4">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Price:</span>
                <div className="flex items-center text-3xl font-extrabold text-slate-900 dark:text-white ml-2">
                  <IndianRupee className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  <span>{price}</span>
                </div>
              </div>

              {/* Copy UPI ID Bar */}
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 mb-3">
                <div className="truncate text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 pl-1">
                  {upiId}
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy UPI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Pay Button for Mobile Devices */}
            <a
              href={upiLink}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all sm:hidden"
            >
              <span>Tap to Pay Directly with App</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column - Instructions & Contact Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Steps */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                How to get instant access?
              </h3>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1",
                    title: "Complete the Payment",
                    desc: "Scan the QR code using Google Pay, PhonePe, or any UPI app and complete the transaction."
                  },
                  {
                    step: "2",
                    title: "Take a Screenshot",
                    desc: "Capture a screenshot of your successful transaction receipt or UTR number."
                  },
                  {
                    step: "3",
                    title: "Send Proof & Receive Files",
                    desc: "Send the screenshot via WhatsApp or Email. You will receive source code & setup files within 24 hours."
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 backdrop-blur-xs"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-600/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Send screenshot via:
              </p>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I've paid ₹${price} for the project. Here is my payment screenshot.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl font-semibold transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg group text-xs sm:text-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] opacity-80 uppercase tracking-wider font-bold">WhatsApp Support</div>
                    <div className="font-bold">{whatsappNumber}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent(`Payment Confirmation - ₹${price}`)}&body=${encodeURIComponent(`Hi, I have completed the payment of ₹${price}. Please find my attached screenshot.`)}`}
                className="flex items-center justify-between w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-5 py-3.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg group text-xs sm:text-sm active:scale-[0.99] border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] opacity-80 uppercase tracking-wider font-bold">Email Support</div>
                    <div className="font-bold truncate max-w-[180px] sm:max-w-none">{email}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
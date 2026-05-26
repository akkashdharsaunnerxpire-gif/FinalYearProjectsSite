import { QrCode, Mail, MessageCircle, IndianRupee, ArrowRight } from 'lucide-react';
import { QRCodeCanvas } from "qrcode.react";
interface PaymentSectionProps {
  price: number;// optional custom QR code image URL
}

export default function PaymentSection({ price }: PaymentSectionProps) {
  const upiLink = `upi://pay?pa=akkashdharsaun02-2@okicici&pn=AkkashDharsaun&am=${price}&cu=INR`;
  const whatsappNumber = '+91 8015874936';
  const email = 'akkashdharsaun02@gmail.com';

  // Determine which image to display: custom URL > imported default > icon

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-blue-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-purple-300 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Purchase This Project
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - QR Code */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Pay with Google Pay
            </h3>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 flex items-center justify-center">
  <div className="text-center">
  <QRCodeCanvas
  value={upiLink}
  size={260}
  className="mx-auto mb-2"
/>
    <p className="text-xs sm:text-sm text-gray-500">Scan QR Code to Pay</p>
  </div>
</div>

            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              <IndianRupee className="w-6 h-6 sm:w-8 sm:h-8" />
              {price}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-blue-800">
              Scan the QR code above using Google Pay or any UPI app to complete the payment.
            </div>
          </div>

          {/* Right Column - Instructions */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              After Payment
            </h3>

            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                  <span className="text-blue-600 font-bold text-xs sm:text-sm">1</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Take a screenshot of your payment confirmation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                  <span className="text-blue-600 font-bold text-xs sm:text-sm">2</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Send the screenshot to us via WhatsApp or Email
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                  <span className="text-blue-600 font-bold text-xs sm:text-sm">3</span>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Receive all project files within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all hover:shadow-lg group text-sm sm:text-base"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>WhatsApp: {whatsappNumber}</span>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all hover:shadow-lg group text-sm sm:text-base"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{email}</span>
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
import { Link } from "react-router";
import { QrCode, ArrowLeft } from "lucide-react";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#10B981] rounded-lg flex items-center justify-center">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#111827]" style={{ fontWeight: 600 }}>The Dom Review App</span>
          </div>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-[#111827] mb-8" style={{ fontSize: "2rem", fontWeight: 700 }}>
          Terms of Service
        </h1>
        <div className="prose prose-gray max-w-none space-y-6 text-[#111827]" style={{ lineHeight: 1.8 }}>
          <p>
            By using The Dom Review App, you agree to these terms of service.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Usage</h2>
          <p>
            You are responsible for using your Google Review QR code properly and in accordance with Google's terms. Do not use QR codes to solicit fake or incentivized reviews.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Free Trial</h2>
          <p>
            Your free trial lasts 10 days from the date of your first login. After the trial period, a paid subscription is required to continue using the service.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Payments</h2>
          <p>
            Paid subscriptions are billed monthly through Stripe. You can cancel at any time from your account settings.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Disclaimer</h2>
          <p>
            The Dom Review App is not affiliated with Google. Google and Google Reviews are trademarks of Google LLC.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Contact</h2>
          <p>
            For questions about these terms, contact us at support@thedomreview.com.
          </p>
          <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
            Last updated: March 9, 2026
          </p>
        </div>
      </div>
    </div>
  );
}

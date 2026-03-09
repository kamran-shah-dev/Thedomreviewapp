import { Link } from "react-router";
import { QrCode, ArrowLeft } from "lucide-react";

export function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <div className="prose prose-gray max-w-none space-y-6 text-[#111827]" style={{ lineHeight: 1.8 }}>
          <p>
            At The Dom Review App, your privacy is important to us. This policy explains what data we collect and how we use it.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>What We Collect</h2>
          <p>
            We only collect your email address and your business Google review link to generate QR codes and track scan counts. We do not collect personal data from people who scan your QR code.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To create and manage your QR code</li>
            <li>To display scan analytics on your dashboard</li>
            <li>To send you important account-related emails</li>
          </ul>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Data Sharing</h2>
          <p>
            We do not share, sell, or rent your personal data to third parties. Your data stays with us.
          </p>
          <h2 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>Contact</h2>
          <p>
            If you have questions about this policy, contact us at support@thedomreview.com.
          </p>
          <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
            Last updated: March 9, 2026
          </p>
        </div>
      </div>
    </div>
  );
}

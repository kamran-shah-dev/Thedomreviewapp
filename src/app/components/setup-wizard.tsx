import { useState } from "react";
import { useNavigate } from "react-router";
import {
  QrCode,
  ArrowRight,
  Link as LinkIcon,
  Store,
  Loader2,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "./auth-context";

export function SetupWizard() {
  const { profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState(profile?.businessName || "");
  const [reviewLink, setReviewLink] = useState(profile?.reviewLink || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      if (!businessName.trim()) {
        setError("Please enter your business name");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      if (!reviewLink.trim()) {
        setError("Please paste your Google review link");
        return;
      }
      setError("");
      setStep(3);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    const result = await updateProfile({
      businessName: businessName.trim(),
      reviewLink: reviewLink.trim(),
      setupComplete: true,
    });
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1
            className="text-[#111827] mb-2"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            Let's set up your QR code
          </h1>
          <p className="text-[#6B7280]">
            Just 2 quick steps and you're ready to collect reviews
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 max-w-xs mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                  step >= s
                    ? "bg-[#10B981] text-white"
                    : "bg-gray-200 text-[#6B7280]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 rounded-full ${
                    step > s ? "bg-[#10B981]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Store className="w-7 h-7 text-[#10B981]" />
              </div>
              <div className="text-center">
                <h2
                  className="text-[#111827] mb-1"
                  style={{ fontWeight: 600 }}
                >
                  What's your business name?
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
                  This will appear above your QR code
                </p>
              </div>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Joe's Pizza"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 outline-none transition-all text-center"
                style={{ fontSize: "1.125rem" }}
                autoFocus
              />
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#047857] text-white py-3 rounded-xl transition-colors"
                style={{ fontWeight: 600 }}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="w-14 h-14 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <LinkIcon className="w-7 h-7 text-[#10B981]" />
              </div>
              <div className="text-center">
                <h2
                  className="text-[#111827] mb-1"
                  style={{ fontWeight: 600 }}
                >
                  Paste your Google review link
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
                  We'll link your QR code directly to this page
                </p>
              </div>
              <input
                type="url"
                value={reviewLink}
                onChange={(e) => setReviewLink(e.target.value)}
                placeholder="https://search.google.com/local/writereview?placeid=..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 outline-none transition-all"
                style={{ fontSize: "0.875rem" }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center gap-1.5 text-[#10B981] hover:text-[#047857] mx-auto"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                <HelpCircle className="w-4 h-4" />
                How do I find my Google review link?
              </button>
              {showHelp && (
                <div className="bg-[#10B981]/5 rounded-xl border border-[#10B981]/20 p-4 text-sm text-[#047857] space-y-2">
                  <p style={{ fontWeight: 500 }}>Follow these steps:</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Search for your business on Google Maps</li>
                    <li>Click on your business listing</li>
                    <li>Click the "Write a Review" button</li>
                    <li>Copy the URL from your browser's address bar</li>
                  </ol>
                  <p className="text-[#6B7280]">
                    Or search "Google Place ID Finder" to get your Place ID, then
                    use: https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
                  </p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-200 text-[#111827] py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#047857] text-white py-3 rounded-xl transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2
                  className="text-[#111827] mb-1"
                  style={{ fontWeight: 600 }}
                >
                  Your QR code is ready!
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
                  Here's a preview of what your customers will see
                </p>
              </div>
              <div className="text-center">
                <p className="text-[#111827] mb-1" style={{ fontWeight: 600 }}>
                  {businessName}
                </p>
                <p
                  className="text-[#6B7280] mb-4"
                  style={{ fontSize: "0.875rem" }}
                >
                  Scan to leave a Google Review
                </p>
                <div className="inline-block p-4 bg-white rounded-2xl border-2 border-[#10B981]/20 shadow-lg shadow-[#10B981]/10 mb-4">
                  <QRCodeSVG
                    value={reviewLink}
                    size={180}
                    fgColor="#111827"
                    bgColor="#ffffff"
                    level="H"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-gray-200 text-[#111827] py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#047857] disabled:opacity-50 text-white py-3 rounded-xl transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

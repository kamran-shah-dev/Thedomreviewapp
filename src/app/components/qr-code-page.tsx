import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Download,
  Copy,
  Check,
  Pencil,
  Printer,
} from "lucide-react";

export function QRCodePage() {
  const [businessName, setBusinessName] = useState("Joe's Pizza");
  const [reviewLink, setReviewLink] = useState(
    "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          My QR Code
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
          Manage your review QR code and business settings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center">
            <h3 className="text-[#111827] mb-1" style={{ fontWeight: 600 }}>
              {businessName}
            </h3>
            <p className="text-[#6B7280] mb-6" style={{ fontSize: "0.875rem" }}>
              Scan to leave a Google Review
            </p>
            <div className="inline-block p-5 bg-white rounded-2xl border-2 border-[#10B981]/20 shadow-lg shadow-[#10B981]/10 mb-6">
              <QRCodeSVG
                value={reviewLink}
                size={220}
                fgColor="#111827"
                bgColor="#ffffff"
                level="H"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#047857] text-white px-6 py-2.5 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download PNG
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 text-[#111827] px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Business Setup */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#111827]" style={{ fontWeight: 600 }}>
                Business Details
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#10B981] hover:text-[#047857] flex items-center gap-1"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                <Pencil className="w-4 h-4" />
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#111827] mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Business Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 outline-none transition-all"
                  />
                ) : (
                  <p className="text-[#111827] px-4 py-2.5 bg-gray-50 rounded-lg">
                    {businessName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[#111827] mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Google Review Link
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={reviewLink}
                    onChange={(e) => setReviewLink(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 outline-none transition-all"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="flex-1 text-[#6B7280] px-4 py-2.5 bg-gray-50 rounded-lg truncate" style={{ fontSize: "0.875rem" }}>
                      {reviewLink}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#6B7280]" />
                      )}
                    </button>
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-[#10B981] hover:bg-[#047857] text-white py-2.5 rounded-lg transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#10B981]/5 rounded-xl border border-[#10B981]/20 p-6">
            <h3 className="text-[#047857] mb-3" style={{ fontWeight: 600 }}>
              💡 Tips for More Reviews
            </h3>
            <ul className="space-y-2 text-[#047857]" style={{ fontSize: "0.875rem" }}>
              <li className="flex items-start gap-2">
                <span>•</span>
                Place your QR code at the checkout counter
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                Print it on receipts and business cards
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                Add a small sign: "Enjoyed your visit? Scan to review!"
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                Use table tents in restaurants or waiting rooms
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
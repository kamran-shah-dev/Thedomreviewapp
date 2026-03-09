import { Link } from "react-router";
import { QRCodeSVG } from "qrcode.react";
import {
  QrCode,
  ScanLine,
  TrendingUp,
  Download,
  ArrowUpRight,
  Clock,
  Smartphone,
} from "lucide-react";

const recentScans = [
  { id: 1, time: "2 minutes ago", device: "iPhone", location: "In-store" },
  { id: 2, time: "18 minutes ago", device: "Android", location: "In-store" },
  { id: 3, time: "1 hour ago", device: "iPhone", location: "Receipt QR" },
  { id: 4, time: "3 hours ago", device: "Android", location: "Table tent" },
  { id: 5, time: "5 hours ago", device: "iPhone", location: "In-store" },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Welcome back, Joe! 👋
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
          Here's how your QR code is performing
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Scans",
            value: "247",
            change: "+12%",
            icon: ScanLine,
            color: "#10B981",
          },
          {
            label: "This Week",
            value: "38",
            change: "+8%",
            icon: TrendingUp,
            color: "#10B981",
          },
          {
            label: "Today",
            value: "7",
            change: "+3",
            icon: QrCode,
            color: "#F59E0B",
          },
          {
            label: "Avg. Daily",
            value: "5.4",
            change: "Steady",
            icon: Clock,
            color: "#047857",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span
                className="text-[#10B981] flex items-center gap-0.5"
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              {stat.value}
            </p>
            <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* QR Code Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-[#111827] mb-4" style={{ fontWeight: 600 }}>
            Your QR Code
          </h3>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl border-2 border-[#10B981]/20 shadow-sm shadow-[#10B981]/10">
              <QRCodeSVG
                value="https://search.google.com/local/writereview?placeid=EXAMPLE"
                size={140}
                fgColor="#111827"
              />
            </div>
          </div>
          <p className="text-center text-[#6B7280] mb-4" style={{ fontSize: "0.875rem" }}>
            Joe's Pizza
          </p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#047857] text-white py-2.5 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <Link
              to="/dashboard/qr-code"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-[#111827] py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Manage
            </Link>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#111827]" style={{ fontWeight: 600 }}>
              Recent Scans
            </h3>
            <Link
              to="/dashboard/analytics"
              className="text-[#10B981] hover:text-[#047857] flex items-center gap-1"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-[#111827]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {scan.device}
                    </p>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>
                      {scan.location}
                    </p>
                  </div>
                </div>
                <span className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>
                  {scan.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { Navigate } from "react-router";
import { useAuth } from "./auth-context";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#10B981] animate-spin mx-auto mb-3" />
          <p className="text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function SetupGuard({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#10B981] animate-spin mx-auto mb-3" />
          <p className="text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }

  if (profile && !profile.setupComplete) {
    return <Navigate to="/dashboard/setup" replace />;
  }

  return <>{children}</>;
}

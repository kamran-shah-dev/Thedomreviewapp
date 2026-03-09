import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/landing-page";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardHome } from "./components/dashboard-home";
import { QRCodePage } from "./components/qr-code-page";
import { AnalyticsPage } from "./components/analytics-page";
import { AccountPage } from "./components/account-page";
import { PrivacyPage } from "./components/privacy-page";
import { TermsPage } from "./components/terms-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "qr-code", Component: QRCodePage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "account", Component: AccountPage },
    ],
  },
  {
    path: "/privacy",
    Component: PrivacyPage,
  },
  {
    path: "/terms",
    Component: TermsPage,
  },
]);

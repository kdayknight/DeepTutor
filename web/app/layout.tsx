import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { GlobalProvider } from "@/context/GlobalContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "DeepTutor Platform",
  description: "Multi-Agent Teaching & Research Copilot",
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('deeptutor-theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={font.className}>
        <ErrorBoundary>
          <GlobalProvider>
            <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
                {children}
              </main>
            </div>
          </GlobalProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

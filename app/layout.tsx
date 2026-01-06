import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bug Testing Platform",
  description: "Platform for testing websites and reporting bugs",
};

// Check if Clerk keys are available
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only wrap with ClerkProvider if keys are set
  if (clerkPublishableKey) {
    return (
      <ClerkProvider>
        <html lang="mn">
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </html>
      </ClerkProvider>
    );
  }

  // If keys are missing, render without ClerkProvider
  return (
    <html lang="mn">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

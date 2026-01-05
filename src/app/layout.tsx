import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
// Adjust import path to relative if needed or use alias if configured. 
// Assuming @ points to src
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Accolades | Opp-Portal",
    description: "Futuristic Opportunity Discovery",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-black text-white antialiased`}>
                {/* Navbar is now logically linked to all routes */}
                <Navbar />
                <div className="min-h-screen">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}

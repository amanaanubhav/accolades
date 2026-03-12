import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
// Adjust import path to relative if needed or use alias if configured. 
// Assuming @ points to src
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Accolades | Opp-Portal by Aman Anubhav",
        template: "%s | Accolades by Aman Anubhav",
    },
    description: "Discover the best hackathons, internships, fellowships, and research programs for students. Curated by Aman Anubhav (www.amananubhav.com).",
    keywords: [
        "Aman Anubhav",
        "Aman Anubhav project",
        "Aman Anubhav website",
        "amananubhav",
        "www.amananubhav.com",
        "Accolades",
        "Accolades project",
        "Accolades portal",
        "Opp-Portal",
        "opportunities for students",
        "hackathons 2024",
        "hackathons for beginners",
        "student internships",
        "summer research programs",
        "undergraduate research opportunities",
        "open source programs",
        "fellowships for students",
        "tech student opportunities",
        "scholarships",
        "coding bootcamps",
        "student developer programs"
    ],
    authors: [{ name: "Aman Anubhav", url: "https://www.amananubhav.com" }],
    creator: "Aman Anubhav",
    publisher: "Aman Anubhav",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://accolades.vercel.app'),
    openGraph: {
        title: "Accolades | Discover Student Opportunities",
        description: "Accolades is a cutting-edge platform by Aman Anubhav connecting students with top hackathons, internships, and research programs globally.",
        url: "https://accolades.vercel.app",
        siteName: "Accolades Opportunity Portal",
        images: [
            {
                url: "/og-image.png", // Assuming an og-image will be added later or fallback to social media image
                width: 1200,
                height: 630,
                alt: "Accolades Opportunity Portal by Aman Anubhav",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Accolades | Opp-Portal by Aman Anubhav",
        description: "Discover top hackathons, internships, and summer research programs on Accolades by Aman Anubhav.",
        creator: "@amananubhav", // Placeholder handle, can adjust if known
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="google-tag-manager"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-PSHJDRN9');
                        `,
                    }}
                />
                {/* End Google Tag Manager */}
            </head>
            <body className={`${inter.className} bg-black text-white antialiased`}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PSHJDRN9"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}
                
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

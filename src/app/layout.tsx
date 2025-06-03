import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Kenneth Webber - Personal Portfolio",
  description: "Personal portfolio website showcasing my work and experience",
  icons: {
    icon: "https://us-west-2.graphassets.com/wygkxnzkbr0kxmwk52wnr9qo/cmbc66qkefzhf07llamdifjwj",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

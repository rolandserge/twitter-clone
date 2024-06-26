import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/layout/sidebar";
import FollowBar from "@/components/layout/follow";
import LoginModal from "@/components/modal/loginModal";
import RegisterModal from "@/components/modal/registerModal";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import EditUserModal from "@/components/modal/editUserModal";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <SessionProvider session={session}>      
      <html lang="en">
        <body>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <EditUserModal />
          <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
              <div className="grid grid-cols-4 h-full">
                  <SideBar />
                  <div 
                    className="
                      col-span-3
                      lg:col-span-2
                      border-x-[1px]
                      border-neurtal-800
                    "
                  >
                    {children}
                  </div>
                  <FollowBar />
              </div>
            </div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}

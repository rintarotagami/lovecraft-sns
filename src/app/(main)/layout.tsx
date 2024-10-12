import React from "react";
import SideMenu from "@/components/SideMenu/SideMenu";
import SidePhoneMenu from "@/components/SidePhoneMenu/SidePhoneMenu";
import PhoneHeader from "@/components/PhoneHeader/PhoneHeader";

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex md:flex-row flex-col h-screen">
            <span className="md:hidden block"><PhoneHeader /></span>
            <span className="md:block hidden"><SideMenu /></span>
            <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
            <span className="md:hidden block"><SidePhoneMenu /></span>
        </div>
    );
};

export default MainLayout;

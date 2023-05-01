import DropWrapper from "@/Components/DropWrapper";
import { usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import DropMenu from "./DropMenu";
import { Toaster } from "react-hot-toast";

function MainLayout({ children, type }) {
    // const {auth} = usePage().props
    return (
        <div>
          <Toaster/>
            <div className="fixed top-0 lef-0 right-0 w-screen z-30">
                <div
                    className={`text-white ${
                        type == "admin"
                            ? "bg-black"
                            : "bg-gradient-to-b from-blue-600 to-blue-700"
                    } shadow h-12 px-3 md:px-12 flex items-center justify-between`}
                >
                  <p className="text-lg font-bold">Contact App</p>
                    <DropMenu />
                </div>
            </div>
            <div className="w-screen mt-12 md:flex relative">
                <div className="flex-1 flex flex-col">
                    <div className="min-h-[100vh]">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;

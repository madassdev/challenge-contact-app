import DropWrapper from "@/Components/DropWrapper";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { BiChevronDown, BiCog, BiUser } from "react-icons/bi";

function DropMenu() {
    const [drop, setDrop] = useState(false);
    const { auth } = usePage().props;
    return (
        <div className="relative">
            <div
                onClick={() => setDrop(true)}
                className="rounded-full p-2 px-4 
                bg-primarys bg-opacity-10 text-xs cursor-pointer border border-gray-300 
                flex items-center justify-center space-x-2"
            >
                <BiUser />
                <span className="capitalize">{auth?.user?.name}</span>
                <BiChevronDown />
            </div>
            <AnimatePresence>
                {drop ? (
                    <>
                        <DropWrapper close={() => setDrop(false)}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ ease: "easeOut", duration: 0.2 }}
                                exit={{ opacity: 0 }}
                                className="p-2 bg-white shadow rounded-xl text-gray-600 absolute -right-4 top-12 space-y-1 text-xs min-w-[160px]"
                            >
                                <Link
                                    href={route("contacts.index")}
                                    className="p-2 inline-flex items-center justify-center space-x-2"
                                >
                                    <BiUser />
                                    <span>Contacts</span>
                                </Link>

                                <hr />
                                <Link
                                    href={route("logout")}
                                    className="p-2 inline-flex items-center justify-center space-x-2"
                                >
                                    <AiOutlineLogout />
                                    <span>Logout</span>
                                </Link>
                            </motion.div>
                        </DropWrapper>
                    </>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default DropMenu;

import { AppContext } from "@/context/AppContext";
import useEscape from "@/hooks/useEscape";
import React, { useCallback, useContext, useEffect } from "react";
import { BiX } from "react-icons/bi";
import "./modal.css";
import { AnimatePresence, motion } from "framer-motion";

function Modal() {
    const { modal, closeModal } = useContext(AppContext);
    useEscape(() => {
        if (!modal.noClose) {
            closeModal();
        }
    }, [modal]);
    function handleClose() {
        if (modal.reloadOnClose === true) {
            window.location.reload();
            closeModal();
        } else {
            closeModal();
        }
    }
    return (
        <AnimatePresence>
            {modal.show && (
                <motion.div
                    className="modal__container z-50"
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ease: "easeOut" }}
                    exit={{ opacity: 0, x: 500 }}
                >
                    <div
                        className={` ${
                            modal.size || "max-w-[600px] md:w-[50vw] md:max-w-[50vw]"
                        } rounded-2xl relative
                    flex flex-col my-16 mx-8 md:mx-auto ${
                        modal.transparent ? "bg-transparent" : "bg-white"
                    }`}
                    >
                        <div className="p-3">{modal.content}</div>
                        {modal.noClose ? (
                            <></>
                        ) : (
                            <div
                                className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow bg-white -top-12 right-2 cursor-pointer"
                                onClick={handleClose}
                            >
                                <BiX />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;

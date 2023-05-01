import useWindowDimensions from "@/hooks/useWindowDimensions";
import React, { createContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

export const AppContext = createContext();
function AppWrapper({ children }) {
   
    const [modal, setModal] = useState({
        show: false,
    });
    

    const closeModal = (val) => {
        setModal({ show: false });
        if (modal.reloadOnClose) {
            window.location.reload;
        }
    };

    
    return (
        <AppContext.Provider
            value={{
                modal,
                setModal,
                closeModal,
            }}
        >
            {children}
            <Modal />
        </AppContext.Provider>
    );
}

export default AppWrapper;

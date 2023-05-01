import React, { useEffect } from "react";

const useEscape = (onEscape,dependency=[]) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onEscape();
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, dependency);
};

export default useEscape;

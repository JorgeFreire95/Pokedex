
import React, { createContext, useContext, useState } from 'react';

const DPadContext = createContext({
    onLeft: null,
    onRight: null,
    setOnLeft: () => { },
    setOnRight: () => { }
});

export const DPadProvider = ({ children }) => {
    const [onLeft, setOnLeftState] = useState(null);
    const [onRight, setOnRightState] = useState(null);

    // We wrap the setters to ensure they are stable and can be used in useEffects
    const setOnLeft = (fn) => setOnLeftState(() => fn);
    const setOnRight = (fn) => setOnRightState(() => fn);

    return (
        <DPadContext.Provider value={{ onLeft, onRight, setOnLeft, setOnRight }}>
            {children}
        </DPadContext.Provider>
    );
};

export const useDPad = () => useContext(DPadContext);

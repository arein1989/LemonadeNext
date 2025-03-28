"use client";

import { createContext, useContext, useState,  } from "react";

const LemonContext = createContext<{
  lemon: number;
  setLemon: React.Dispatch<React.SetStateAction<number>>;
}>({
  lemon: 0,
  setLemon: () => {},
});

export const useLemon = () => useContext(LemonContext);

export const LemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [lemon, setLemon] = useState(0);

  return (
    <LemonContext.Provider value={{ lemon, setLemon }}>
      {children}
    </LemonContext.Provider>
  );
};
"use client";
import { FC, createContext, useContext, PropsWithChildren } from "react";
import { useInfoContextValue } from "./useInfoContextValue";

const InfoContext = createContext<
	ReturnType<typeof useInfoContextValue> | undefined
>(undefined);

export const InfoContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const value = useInfoContextValue();

	return (
		<InfoContext.Provider value={value}>{children}</InfoContext.Provider>
	);
};

export const useInfo = () => {
	const context = useContext(InfoContext);

	if (context === undefined) throw new Error("useInfo provider not defined");

	return context;
};

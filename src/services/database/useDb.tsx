"use client";
import { FC, createContext, useContext, PropsWithChildren } from "react";
import { useDbContextValue } from "./useDbContextValue";

const DbContext = createContext<
	ReturnType<typeof useDbContextValue> | undefined
>(undefined);

export const DatabaseContextProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const value = useDbContextValue();

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export const useDb = () => {
	const context = useContext(DbContext);

	if (context === undefined)
		throw new Error("useDb is not within DatabaseProvider");

	return context;
};

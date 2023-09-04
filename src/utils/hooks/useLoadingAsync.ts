"use client";
import { useEffect, useRef, useState } from "react";

/**
 * @summary Hook made for rendering components only when
 *          data has been loaded and is available
 * 
 * @param cb 
 * @param deps 
 * @returns loading && error
 */
export const useLoadingAsync = <T>(
    cb: () => Promise<T>,
    deps: unknown[],
): { loading: boolean, error: any } => {
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const activeRef = useRef(true);

    useEffect(() => {
        activeRef.current = true;
        return () => {
            activeRef.current = false;
        } 
    }, []);

    useEffect(() => {
        (async () => {
            try {
                await cb();

                if (!activeRef.current) return;

                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        })();
    }, [...deps]);

    return { loading: isLoading, error }
}
import { useState, useRef, useCallback } from "react";

export function useTimer(initialValue: number) {
    const [second, setSecond] = useState(initialValue);
    const intervalRef: any = useRef(null);

    const start = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setSecond(c => c - 1);
        }, 1000);
    }, []);

    const stop = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    const reset = useCallback(() => {
        setSecond(initialValue);
    }, []);


    return { second, start, stop, reset };

}
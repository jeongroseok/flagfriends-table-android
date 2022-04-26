import { useState, useRef, useCallback } from "react";

export function useTimer(endTime: number) {
    const nowTime = new Date().getTime();
    const [leftTime, setLeftTime] = useState(endTime - nowTime); //남은 시간
    const intervalRef: any = useRef(null);

    const start = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            let nownow = new Date().getTime();
            let cal = endTime - nownow;
            setLeftTime(cal);


        }, 1000);
    }, []);

    const stop = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    return { leftTime, start, stop };
}
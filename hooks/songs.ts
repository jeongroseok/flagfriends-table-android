import { useContext, useMemo } from "react";
import { requestSongByTableId, Song } from "../firebase/songs";
import { AppContext } from "./apps";

export function useSong() {
    const { table } = useContext(AppContext);
    return useMemo(() => {
        const request = async (
            songItem: Song
        ) => await requestSongByTableId(table!.id, songItem);

        return {
            ...table!,
            request
        }
    }, [table]);
}
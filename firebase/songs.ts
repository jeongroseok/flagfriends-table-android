import firebase from "firebase";
import { getTableById, Table } from "./tables";
import { nanoid } from 'nanoid';

export interface Song {
    id: string; // 키
    no: string; //노래 번호
    singer: string; //가수
    title: string; //제목
    tableId: string;
    storeId: string;
    readonly createdAt: firebase.firestore.Timestamp;
}

const songConverter = {
    toFirestore({ id, ...rest }: Song): firebase.firestore.DocumentData {
        return rest;
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ) {
        const data = snapshot.data(options)!;
        return { id: snapshot.id, ...data } as Song;
    },
};

const tableConverter = {
    toFirestore({ id, ...rest }: Table): firebase.firestore.DocumentData {
        return rest;
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ) {
        const data = snapshot.data(options)!;
        return { id: snapshot.id, ...data } as Table;
    },
};

const tablesRef = firebase
    .firestore()
    .collection("tables")
    .withConverter(tableConverter);

const songRef = firebase
    .firestore()
    .collection("songs")
    .withConverter(songConverter);

export const requestSongByTableId = async (
    tableId: Table["id"],
    song: Song
) => {
    const ref = getTableById(tableId);
    await tablesRef.firestore.runTransaction(async (transaction) => {
        const doc = await transaction.get(ref);
        const table = doc.data() as Table;
        if (!table.occupation)
            throw new Error("invalid operation, empty occupation");

        transaction.set(songRef.doc(), {
            id: nanoid(),
            no: song.no,
            singer: song.singer,
            title: song.title,
            tableId: tableId,
            storeId: table.storeId,
            createdAt: firebase.firestore.Timestamp.now()
        })
    })
}
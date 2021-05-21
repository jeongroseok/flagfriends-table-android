import firebase from "firebase";

type Status = "PREPARING" | "OPEN" | "CLOSED";

export interface Store {
  readonly id: string;
  readonly createdAt: firebase.firestore.Timestamp;
  name: { [code: string]: string };
  description: { [code: string]: string };
  staffUids: string[];
  status: Status;
  operationalHours: {
    openAt: string;
    closeAt: string;
  };
  message: string;
  // 주간 일정, 공휴일 일정, ...etc 추가
}

const storeConverter = {
  toFirestore({ id, ...rest }: Store): firebase.firestore.DocumentData {
    return rest;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as Store;
  },
};

export const storesRef = firebase
  .firestore()
  .collection("stores")
  .withConverter(storeConverter);

/* Queries */
export const listStores = () => storesRef;

export const getStoreById = (id: string) => storesRef.doc(id);

import firebase from "firebase";

type Status = "HIDDEN" | "SHOW";

export interface Notification {
  readonly id: string; // e.g. SNS 맥주 상시 이벤트: EVENT_ORDINARY_SNS_BEER
  readonly storeId: string;
  readonly createdAt:
    | firebase.firestore.Timestamp
    | firebase.firestore.FieldValue;
  name: string;
  status: Status;
  priority: number;
  content: { uri?: string } | string;
}

const converter = {
  toFirestore({ id, ...rest }: Notification): firebase.firestore.DocumentData {
    return rest;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as Notification;
  },
};

const notificationsRef = firebase
  .firestore()
  .collection("notifications")
  .withConverter(converter);

export const listNotificationsByStoreId = (storeId: string) =>
  notificationsRef.where("storeId", "==", storeId);

export const getNotificationById = (id: string) => notificationsRef.doc(id);

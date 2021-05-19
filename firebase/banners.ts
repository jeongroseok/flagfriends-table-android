import firebase from "firebase";

export interface Banner {
  readonly id: string; // e.g. SNS 맥주 상시 이벤트: EVENT_ORDINARY_SNS_BEER
  readonly storeId: string;
  readonly createdAt: firebase.firestore.Timestamp;
  name: string;
  status: "HIDDEN" | "SHOW";
  priority: number;
  content: { uri?: string } | string;
}

const converter = {
  toFirestore({ id, ...rest }: Banner): firebase.firestore.DocumentData {
    return rest;
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as Banner;
  },
};

const bannersRef = firebase
  .firestore()
  .collection("banners")
  .withConverter(converter);

export const listBannersByStoreId = (storeId: string) =>
  bannersRef.where("storeId", "==", storeId);

export const getBannerById = (id: string) => bannersRef.doc(id);

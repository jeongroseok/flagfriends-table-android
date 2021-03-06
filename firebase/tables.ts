import { Product } from "./products";
import { Store } from "./stores";
import firebase from "firebase";
import { nanoid } from "nanoid";
import produce from "immer";

export interface Order {
  readonly productId: Product["id"];
  readonly optionSelections: {
    [optionId: string]: { [selectionId: string]: boolean };
  };
  readonly createdAt: firebase.firestore.Timestamp;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  discounts: Product["price"][];
  // 다른 테이블 쏘기는 선물 반환시 문제가 생김, gifts domain으로 이동
  // payments: Payment[]; or paymentIds: Payment['id'][]; => domain 분리
}

export interface Occupation {
  readonly id: string;
  readonly createdAt: firebase.firestore.Timestamp;
  orders: { [orderId: string]: Order };
  // 서비스 내역, 쿠폰, 등...
  // participants: (Participant | AnonymousParticipant)[];
}

/**
 * e.g.
 * {
 *   krw/hour: 1000 // 1000krw or 1usd per hour
 *   krw/10minute: 100 // 100krw or 0.1usd per 10 minute
 *   usd/10minute: 0.1 // 100krw or 0.1usd per 10 minute
 * }
 */
export interface TableCharge {
  [unit: string]: { [code: string]: number };
}

export interface Table {
  readonly id: string;
  readonly storeId: Store["id"];
  name: string;
  seat: {
    default: number;
    minimum: number;
    maximum: number;
  };
  status: "UNUSED" | "PREPARING" | "READY" | "OCCUPIED"; // rules로 status 일관성 보장
  description: { [code: string]: string };
  charge: TableCharge;
  location?: { x: number; y: number };
  occupation?: Occupation;
}

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

export interface OccupationHistory {
  readonly id: string; // tableId-occupationId 합성키
  readonly createdAt: firebase.firestore.Timestamp;
  readonly orders: { [orderId: string]: Exclude<Order, "status"> };
}

const tablesRef = firebase
  .firestore()
  .collection("tables")
  .withConverter(tableConverter);
const occupationHistoryRef = firebase
  .firestore()
  .collection("occupationHistories");

export const listTablesByStoreId = (storeId: string) =>
  tablesRef.where("storeId", "==", storeId).orderBy("name");

export const getTableById = (id: string) => tablesRef.doc(id);

export const updateTable = async (
  table: Partial<Omit<Table, "occupation">> & Pick<Table, "id">
) => {
  const { id, storeId, occupation, ...data } = table as Table;
  if (occupation) {
    throw new Error(
      "unable to change the occupation. use the occupyTable or unoccupyTable method instead."
    );
  }
  await getTableById(id).update(data);
};

export const readyTable = async ({ id }: Pick<Table, "id">) => {
  await updateTable({ id, status: "READY" });
};

export const prepareTable = async ({ id }: Pick<Table, "id">) => {
  await updateTable({ id, status: "PREPARING" });
};

export const occupyTable = async ({ id }: Pick<Table, "id">) => {
  const occupation: Table["occupation"] = {
    id: nanoid(),
    createdAt: firebase.firestore.Timestamp.now(),
    orders: {},
  };
  await getTableById(id).update({
    occupation,
    status: "OCCUPIED" as Table["status"],
  });
  return occupation.id;
};

// 수정한 부분 admin에도 적용하기
export const unoccupyTable = async ({ id }: Pick<Table, "id">) => {
  const ref = getTableById(id);
  await tablesRef.firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    const table = doc.data() as Table;
    if (!table.occupation)
      throw new Error("invalid operation, empty occupation");

    const { id, ...occupation } = table.occupation as Occupation;

    transaction.set(occupationHistoryRef.doc(), {
      ...occupation,
      storeId: table.storeId,
      tableId: id,
      orders: Object.entries(occupation.orders).map(([id, { ...rest }]) => ({
        ...rest,
      })),
    });

    transaction.update(ref, {
      id,
      status: "PREPARING",
      occupation: firebase.firestore.FieldValue.delete() as any,
    });
  });
};

export const orderByTableId = async (
  tableId: Table["id"],
  orders: Omit<Order, "createdAt" | "status">[]
) => {
  const tableRef = getTableById(tableId);
  await tableRef.firestore.runTransaction(async (transaction) => {
    const tableDoc = await transaction.get(tableRef);
    const table = tableDoc.data() as Table;
    if (!table.occupation) {
      throw new Error("invalid operation, unoccupied table.");
    }

    const occupation = table.occupation;
    occupation.orders = {
      ...occupation.orders,
      ...Object.fromEntries(
        orders.map((order) => {
          const { createdAt, status, ...rest } = order as Order;
          return [
            nanoid(),
            {
              ...rest,
              status: "PENDING",
              createdAt: firebase.firestore.Timestamp.now(),
            },
          ];
        })
      ),
    };

    transaction.update(tableRef, { occupation });
  });
};

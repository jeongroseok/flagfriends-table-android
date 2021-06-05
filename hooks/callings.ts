import { Alert, AlertButton } from "react-native";
import { useCallback, useMemo } from "react";

import firebase from "firebase";
import { useStore } from "./stores";
import { useTable } from "./tables";

export function useCallingAlert() {
  const store = useStore();
  const table = useTable();

  const handleCreateCalling = useCallback(
    async (message) => {
      const callingsRef = firebase.database().ref("callings");
      await callingsRef.push({
        storeId: store.id,
        tableId: table.id,
        message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    },
    [store, table]
  );

  const buttons: AlertButton[] = useMemo(
    () => [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "default",
        onPress: () => handleCreateCalling("호출"),
      },
    ],
    [handleCreateCalling]
  );

  return { alert: () => Alert.alert("알림", "호출하시겠습니까?", buttons) };
}

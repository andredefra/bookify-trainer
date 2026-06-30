import { useEffect, useState } from "react";
import {
  DemoTransaction,
  getDemoTransactions,
  subscribeDemoTransactions,
} from "@/lib/demoTransactionsBridge";

export function useDemoTransactions(): DemoTransaction[] {
  const [list, setList] = useState<DemoTransaction[]>(() => getDemoTransactions());

  useEffect(() => {
    const refresh = () => setList(getDemoTransactions());
    refresh();
    const unsub = subscribeDemoTransactions(refresh);
    return unsub;
  }, []);

  return list;
}

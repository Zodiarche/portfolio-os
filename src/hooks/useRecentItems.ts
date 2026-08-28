import { useCallback, useState } from "react";
import type { UseRecentItemsReturn } from "../types/hooks";

const RECENT_LIMIT = 4;

/** Session-only history of opened items, most recent first, without duplicates. */
export function useRecentItems(): UseRecentItemsReturn {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const recordOpen = useCallback((itemId: string) => {
    setRecentIds((previous) =>
      [itemId, ...previous.filter((candidate) => candidate !== itemId)].slice(0, RECENT_LIMIT),
    );
  }, []);

  return { recentIds, recordOpen };
}

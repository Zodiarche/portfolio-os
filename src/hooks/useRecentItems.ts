import { useCallback, useState } from "react";
import type { UseRecentItemsReturn } from "../types/hooks";

/**
 * Session-only history of opened items, most recent first, without duplicates.
 * Left unbounded here: the catalog only has 12 openable items and each id
 * appears once, so the list self-limits. Display-time trimming (how many to
 * show) is StartMenu's concern, not this journal's.
 */
export function useRecentItems(): UseRecentItemsReturn {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const recordOpen = useCallback((itemId: string) => {
    setRecentIds((previous) => [itemId, ...previous.filter((candidate) => candidate !== itemId)]);
  }, []);

  return { recentIds, recordOpen };
}

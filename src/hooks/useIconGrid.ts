import type { PanInfo } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { CELL_HEIGHT, CELL_WIDTH, GRID_PADDING, TASKBAR_HEIGHT } from "../constants/layout";
import type { UseIconGridReturn } from "../types/hooks";
import type { GridPosition, Position } from "../types/window";

function gridToPixel(position: GridPosition): Position {
  return {
    x: GRID_PADDING + position.col * CELL_WIDTH,
    y: GRID_PADDING + position.row * CELL_HEIGHT,
  };
}

function pixelToGrid(x: number, y: number): GridPosition {
  return {
    col: Math.round((x - GRID_PADDING) / CELL_WIDTH),
    row: Math.round((y - GRID_PADDING) / CELL_HEIGHT),
  };
}

function getMaxCols(): number {
  return Math.floor((window.innerWidth - GRID_PADDING * 2) / CELL_WIDTH);
}

function getMaxRows(): number {
  return Math.floor((window.innerHeight - TASKBAR_HEIGHT - GRID_PADDING * 2) / CELL_HEIGHT);
}

function isCellOccupied(
  col: number,
  row: number,
  positions: Map<string, GridPosition>,
  excludeId?: string,
): boolean {
  for (const [id, position] of positions) {
    if (id === excludeId) continue;
    if (position.col === col && position.row === row) return true;
  }
  return false;
}

/** Finds the closest unoccupied grid cell using Manhattan distance spiral search. */
function findNearestFreeCell(
  targetCol: number,
  targetRow: number,
  positions: Map<string, GridPosition>,
  excludeId: string,
): GridPosition {
  const maxCols = getMaxCols();
  const maxRows = getMaxRows();

  if (
    targetCol >= 0 &&
    targetCol < maxCols &&
    targetRow >= 0 &&
    targetRow < maxRows &&
    !isCellOccupied(targetCol, targetRow, positions, excludeId)
  ) {
    return { col: targetCol, row: targetRow };
  }

  for (let dist = 1; dist < maxCols + maxRows; dist++) {
    for (let dx = -dist; dx <= dist; dx++) {
      const dy = dist - Math.abs(dx);
      for (const sign of [1, -1]) {
        const col = targetCol + dx;
        const row = targetRow + dy * sign;
        if (col >= 0 && col < maxCols && row >= 0 && row < maxRows) {
          if (!isCellOccupied(col, row, positions, excludeId)) {
            return { col, row };
          }
        }
      }
    }
  }

  return { col: targetCol, row: targetRow };
}

function calculateInitialPositions(itemIds: string[]): Map<string, GridPosition> {
  const positions = new Map<string, GridPosition>();
  const maxRows = getMaxRows();

  itemIds.forEach((id, index) => {
    const col = Math.floor(index / maxRows);
    const row = index % maxRows;
    positions.set(id, { col, row });
  });

  return positions;
}

/** Manages desktop icon grid positions with drag-and-drop snap-to-grid and collision avoidance. */
export function useIconGrid(itemIds: string[]): UseIconGridReturn {
  const [gridPositions, setGridPositions] = useState<Map<string, GridPosition>>(() =>
    calculateInitialPositions(itemIds),
  );

  const iconPixelPositions = useMemo(() => {
    const pixelPositions = new Map<string, Position>();
    for (const [id, gridPosition] of gridPositions) {
      pixelPositions.set(id, gridToPixel(gridPosition));
    }
    return pixelPositions;
  }, [gridPositions]);

  const handleIconDragEnd = useCallback(
    (folderId: string, _event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setGridPositions((previous) => {
        const currentPosition = previous.get(folderId);
        if (!currentPosition) return previous;

        const currentPixel = gridToPixel(currentPosition);
        const newPixelX = currentPixel.x + info.offset.x;
        const newPixelY = currentPixel.y + info.offset.y;

        const targetGrid = pixelToGrid(newPixelX, newPixelY);
        const snappedPosition = findNearestFreeCell(
          targetGrid.col,
          targetGrid.row,
          previous,
          folderId,
        );

        const next = new Map(previous);
        next.set(folderId, snappedPosition);
        return next;
      });
    },
    [],
  );

  return { iconPixelPositions, handleIconDragEnd };
}

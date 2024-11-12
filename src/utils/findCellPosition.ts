import { Row } from "../types";

export function findCellPosition (rows: Row[], cellId: string) {
  const row = rows[Number(cellId[1])];

  return row.rowValue.find(cell => cell.id === cellId);
}

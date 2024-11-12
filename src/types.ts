export interface Cell {
  id: string
  value: number
}

export interface Row {
  rowId: number
  rowValue: Cell[]
}

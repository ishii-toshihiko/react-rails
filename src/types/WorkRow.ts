export type WorkRow = {
  no: number
  date: string
  period: string
  name: string
  note: string
  /** 担当・技術の短い補足（守秘のため概要のみ） */
  summary: string
}

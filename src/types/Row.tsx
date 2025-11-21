export interface ReadOnlyRatingProps {
  name: string;
  value: number;
  max?: number;
  precision?: number;
  readOnly?: boolean;
}

export type Row = {
  no: number;
  lang: string;
  period: string;
  note: ReadOnlyRatingProps;
};
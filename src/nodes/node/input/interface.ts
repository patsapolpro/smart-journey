export type InputField = {
  io: 'I' | 'O';
  field: string;
  mo: 'M' | 'O';
  length: number;
  dataType: string;
  location: string;
  remark?: string;
};
export type IMonths =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type IAcademicName = "summer" | "fall" | "winter" | "spring";
export type IAcademicCode = "01" | "02" | "03" | "04";

export interface IAcademicSemester {
  name: IAcademicName;
  year: Date;
  code: IAcademicCode;
  startMonth: IMonths;
  endMonth: IMonths;
  createdAt: Date;
  updatedAt: Date;
}

export default IAcademicSemester;

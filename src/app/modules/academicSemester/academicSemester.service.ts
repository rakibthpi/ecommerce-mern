import IAcademicSemester from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const academicSemesterIntoDb = async (payLOad: IAcademicSemester) => {
  console.log(payLOad);
  const result = await AcademicSemesterModel.create(payLOad);
  return result;
};

export const academicSemester = { academicSemesterIntoDb };

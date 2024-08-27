import IAcademicSemester from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const academicSemesterIntoDb = async (payLOad: IAcademicSemester) => {
  type TacademicSemester = {
    [key: string]: string;
  };
  const AcademicSemesterCode: TacademicSemester = {
    summer: "01",
    fall: "02",
    winter: "03",
    spring: "04",
  };
  if (AcademicSemesterCode[payLOad.name] !== payLOad.code) {
    throw new Error("Invalid semester code");
  }
  const result = await AcademicSemesterModel.create(payLOad);
  return result;
};

const getAllSemesters = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemester = async (
  id: string,
  payLOad: IAcademicSemester
) => {
  if (!id) {
    throw new Error("Id not found");
  }
  type TacademicSemester = {
    [key: string]: string;
  };
  const AcademicSemesterCode: TacademicSemester = {
    summer: "01",
    fall: "02",
    winter: "03",
    spring: "04",
  };
  if (AcademicSemesterCode[payLOad.name] !== payLOad.code) {
    throw new Error("Invalid semester code");
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(id, payLOad, {
    new: true,
  });
  return result;
};

export const academicSemester = {
  academicSemesterIntoDb,
  getAllSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};

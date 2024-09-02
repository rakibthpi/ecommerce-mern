import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const academicDepartmentIntoDb = (data: IAcademicDepartment) => {
  const result = AcademicDepartment.create(data);
  return result;
};

const getAllAcademicDepartments = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    "academicFaculty"
  );
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  data: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

export const academicDepartment = {
  academicDepartmentIntoDb,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};

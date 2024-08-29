import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async (data: IAcademicFaculty) => {
  try {
    const result = await AcademicFaculty.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

// Find all academic faculty from Database
const findAllAcademicFacultiesFromDb = async () => {
  try {
    const result = await AcademicFaculty.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Find single academic faculty from Database
const findSingleAcademicFacultyFromDb = async (id: string) => {
  try {
    const result = await AcademicFaculty.findById(id);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update Student from database
const updateAcademicFacultyFromDb = async (
  id: string,
  data: Partial<IAcademicFaculty>
) => {
  try {
    const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const academicFacultyService = {
  createAcademicFacultyIntoDb,
  findAllAcademicFacultiesFromDb,
  findSingleAcademicFacultyFromDb,
  updateAcademicFacultyFromDb,
};

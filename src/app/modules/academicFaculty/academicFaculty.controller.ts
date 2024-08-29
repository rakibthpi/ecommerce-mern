import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await academicFacultyService.createAcademicFacultyIntoDb(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty created successfully",
    data: result,
  });
});

const findAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyService.findAllAcademicFacultiesFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

// Find single academic faculty from Database
const findSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await academicFacultyService.findSingleAcademicFacultyFromDb(
    id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Data fetched successfully",
    data: result,
  });
});

// Update Student from database
const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await academicFacultyService.updateAcademicFacultyFromDb(
    id,
    data
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic faculty updated successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  findAllAcademicFaculties,
  findSingleAcademicFaculty,
  updateAcademicFaculty,
};

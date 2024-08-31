import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartment } from "./academicDepartment.service";

const createAcademicDepartmentController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicDepartment.academicDepartmentIntoDb(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic department created successfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await academicDepartment.getAllAcademicDepartments();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

// Find single academic department from Database
const findSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await academicDepartment.getSingleAcademicDepartment(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await academicDepartment.updateAcademicDepartment(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic department updated successfully",
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartmentController,
  getAllAcademicDepartments,
  findSingleAcademicDepartment,
  updateAcademicDepartment,
};

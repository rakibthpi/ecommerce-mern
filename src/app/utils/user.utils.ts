import IAcademicSemester from "../modules/academicSemester/academicSemester.interface";
import { User } from "../modules/users/user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ id: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined; // 0001
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  // console.log(await findLastStudentId());

  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudentId();
  // 2024 02 0002
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemeterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemeterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, "0");
  return `${payload.year}${payload.code}${incrementId}`;
};

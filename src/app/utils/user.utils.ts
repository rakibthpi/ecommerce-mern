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
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined; // 0001
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  // console.log(await findLastStudentId());
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, "0");
  return `${payload.year}${payload.code}${incrementId}`;
};

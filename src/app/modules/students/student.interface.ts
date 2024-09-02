import { Model, Document, Types } from "mongoose";
export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  FatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}
export interface IUserNameInterface {
  firstName: string;
  middleName: string;
  lastName: string;
}
export interface ILocalGuardian {
  name: string;
  relation: string;
  contactNo: string;
}
export interface IStudent {
  id: string;
  user: Types.ObjectId;
  name: IUserNameInterface;
  gender: "Male" | "Female";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage: string;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  isDeleted: boolean;
}

export interface StudentModel extends Model<IStudent> {
  isExistUser(id: string): Promise<IStudent | null>;
}

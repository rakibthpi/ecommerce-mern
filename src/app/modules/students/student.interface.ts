import { Model, Document } from "mongoose";
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
  name: IUserNameInterface;
  password: string;
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
  admissionDepartment: "CSE" | "ECE" | "EEE" | "MECH" | "CIVIL";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  isActive: "active" | "inactive";
  isDeleted: boolean;
}

export interface StudentModel extends Model<IStudent> {
  isExistUser(id: string): Promise<IStudent | null>;
}

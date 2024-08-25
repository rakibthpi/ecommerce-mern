import { z } from "zod";

// Guardian schema
const guardianSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" }),
  FatherContactNo: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "Father's contact number must contain only numbers",
    })
    .nonempty({ message: "Father's contact number is required" }),
  motherName: z.string().nonempty({ message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "Mother's contact number must contain only numbers",
    })
    .nonempty({ message: "Mother's contact number is required" }),
});

// UserNameInterface schema
const userNameInterfaceSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

// LocalGuardian schema
const localGuardianSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian's name is required" }),
  relation: z
    .string()
    .nonempty({ message: "Relation to the local guardian is required" }),
  contactNo: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "Local guardian's contact number must contain only numbers",
    })
    .nonempty({ message: "Local guardian's contact number is required" }),
});

// Student schema
const createStudentZodSchema = z.object({
  password: z.string().nonempty({ message: "Password is required" }),
  student: z.object({
    name: userNameInterfaceSchema,
    gender: z.enum(["Male", "Female"], {
      errorMap: () => ({ message: "Gender must be either Male or Female" }),
    }),
    email: z.string().email({ message: "Email must be a valid email address" }),
    dateOfBirth: z
      .string()
      .nonempty({ message: "Date of birth is required" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Date of birth must be a valid date",
      }),
    contactNo: z
      .string()
      .regex(/^[0-9]+$/, {
        message: "Contact number must contain only numbers",
      })
      .nonempty({ message: "Contact number is required" }),
    emergencyContactNo: z
      .string()
      .regex(/^[0-9]+$/, {
        message: "Emergency contact number must contain only numbers",
      })
      .nonempty({ message: "Emergency contact number is required" }),
    presentAddress: z
      .string()
      .nonempty({ message: "Present address is required" }),
    permanentAddress: z
      .string()
      .nonempty({ message: "Permanent address is required" }),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: z
      .string()
      .nonempty({ message: "Profile image URL is required" }),
    admissionDepartment: z.enum(["CSE", "ECE", "EEE", "MECH", "CIVIL"], {
      errorMap: () => ({
        message:
          "Admission department must be one of CSE, ECE, EEE, MECH, or CIVIL",
      }),
    }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      errorMap: () => ({
        message: "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
      }),
    }),
  }),
});

export const studentValidation = {
  createStudentZodSchema,
};

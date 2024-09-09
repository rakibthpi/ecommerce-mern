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
    academicSemester: z.string({
      invalid_type_error: " Academic Semester must be string",
      required_error: "Academic Semester is required",
    }),
    academicDepartment: z.string({
      invalid_type_error: "Student academic department must be string",
      required_error: "Student academic department is required",
    }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      errorMap: () => ({
        message: "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
      }),
    }),
  }),
});

// Updated Student schema for partial updates (all fields optional)
const updateStudentZodSchema = z.object({
  student: z
    .object({
      name: userNameInterfaceSchema.partial(),
      gender: z
        .enum(["Male", "Female"], {
          errorMap: () => ({ message: "Gender must be either Male or Female" }),
        })
        .optional(),
      email: z
        .string()
        .email({ message: "Email must be a valid email address" })
        .optional(),
      dateOfBirth: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "Date of birth must be a valid date",
        })
        .optional(),
      contactNo: z
        .string()
        .regex(/^[0-9]+$/, {
          message: "Contact number must contain only numbers",
        })
        .optional(),
      emergencyContactNo: z
        .string()
        .regex(/^[0-9]+$/, {
          message: "Emergency contact number must contain only numbers",
        })
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: guardianSchema.partial(),
      localGuardian: localGuardianSchema.partial(),
      profileImage: z.string().optional(),
      academicSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
          errorMap: () => ({
            message:
              "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
          }),
        })
        .optional(),
    })
    .partial(),
});

export const studentValidation = {
  createStudentZodSchema,
  updateStudentZodSchema,
};

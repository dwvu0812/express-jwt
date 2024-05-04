import { Student } from "../models/index.js";
import { faker } from "@faker-js/faker";

const getAllStudents = async ({ page, pageSize, searchString }) => {
  const filteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: {
              $regex: searchString,
              $options: "i", //ignore case
            },
          },
          {
            email: {
              $regex: searchString,
              $options: "i",
            },
          },
          {
            languages: {
              $regex: searchString,
              $options: "i",
            },
          },
          {},
        ],
      },
    },
    {
      $skip: (page - 1) * pageSize,
    },
    {
      $limit: pageSize,
    },
  ]);
  return filteredStudents;
};

const getStudentById = async (id) => {
  debugger;
  const student = await Student.findById(id);
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  // Insert student to database
  const student = await Student.create({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address,
  });
  debugger;
  return student.toObject();
};

const generateFakeStudent = async () => {
  for (let i = 0; i < 1000; i++) {
    const fakeStudent = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      languages: faker.helpers.arrayElements(["English", "Spanish", "French"]),
      gender: faker.helpers.arrayElement(["male", "female"]),
      phoneNumber: faker.phone.number(),
      address: faker.location.street(),
    };

    await Student.create(fakeStudent);
  }
};

export default {
  getAllStudents,
  getStudentById,
  insertStudent,
  generateFakeStudent,
};

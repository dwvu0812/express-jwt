import { DEFAULT_PAGE_SIZE } from "../consts.js";
import { studentRepository } from "../repositories/index.js";

const getAllStudents = async (req, res) => {
  try {
    let {
      page = 1,
      pageSize = DEFAULT_PAGE_SIZE,
      searchString = "",
    } = req.query;

    pageSize =
      pageSize >= DEFAULT_PAGE_SIZE ? DEFAULT_PAGE_SIZE : parseInt(pageSize);

    const students = await studentRepository.getAllStudents({
      page,
      pageSize,
      searchString,
    });
    res.status(200).json({
      message: "GET all students successfully",
      page,
      pageSize,
      searchString,
      total: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET all students failed",
      error: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentRepository.getStudentById(req.params.id);
    res.status(200).json({
      message: "GET student by id successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET student by id failed",
      error: error.message,
    });
  }
};

const insertStudent = async (req, res) => {
  try {
    const student = await studentRepository.insertStudent(req.body);
    res.status(201).json({
      message: "POST insert student successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "POST insert student failed",
      error: error.message,
    });
  }
};

const updateStudent = async (req, res) => {};

const insertFakeStudents = async (req, res) => {
  await studentRepository.generateFakeStudent();
  res.status(201).json({
    message: "POST generate fake student successfully",
  });
};

export default {
  getAllStudents,
  getStudentById,
  insertStudent,
  updateStudent,
  insertFakeStudents,
};

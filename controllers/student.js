const getAllStudents = async (req, res) => {
  res.send("GET all students");
};

const getStudentById = async (req, res) => {
  res.send("GET student by id: ");
};

const insertStudent = async (req, res) => {};

const updateStudent = async (req, res) => {};

export default { getAllStudents, getStudentById, insertStudent, updateStudent };

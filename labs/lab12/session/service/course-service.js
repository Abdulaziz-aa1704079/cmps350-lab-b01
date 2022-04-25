import CourseRepository from "../repository/course-repository.js";
const courseRepository = new CourseRepository();

export default class CourseService {
  constructor() {}

  async getPrograms(req, res) {
    try {
      const programs = await courseRepository.getPrograms();
      res.json(programs);
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async getCourses(req, res) {
    try {
      const programCode = req.params.programCode;
      const courses = await courseRepository.getCourses(programCode);
      res.json(courses);
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async renderHome(req, res) {
    try {
      res.render("home", {
        title: "Home",
        // layout: "simple",
        // layout: false,
      });
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async renderCourses(req, res) {
    try {
      const programs = await courseRepository.getPrograms();

      res.render("courses", {
        title: "Courses",
        programs,
      });
    } catch (e) {
      res.send(500).send(e);
    }
  }

  async renderCoursesPerProgram(req, res) {
    try {
      const programCode = req.params.programCode;
      const courses = await courseRepository.getCourses(programCode);

      res.render("courses-per-program", {
        layout: false,
        courses,
      });
    } catch (e) {
      res.send(500).send(e);
    }
  }
}

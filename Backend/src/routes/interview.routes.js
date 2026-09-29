import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import interviewController from "../controllers/interview.controller.js";
import { Upload } from "../middlewares/file.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST api/interview/
 * @description Generate interview report on the basis of user self description, resume and job description.
 * @access private
 */

interviewRouter.post("/", authMiddleware.authUser, Upload.single("resume"), interviewController.generateInterviewReportController);

/**
 * @route GET api/interview/:interviewId
 * @description Get user interview report by :interviewId.
 * @access private
 */

interviewRouter.get("/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);

/**
 * @route GET api/interview/
 * @description Get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);

/**
 * @route POST api/interview/resume/pdf/interviewId
 * @description Generate resume PDF based on user self description, resume & job description.
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewId", authMiddleware.authUser, interviewController.generateResumePdfController);


export default interviewRouter;
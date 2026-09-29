import { generateInterviewReport, generateResumePdf } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { PDFParse } from "pdf-parse";


/**
 * @description Controller to generate interview report on the basis of user self description, resume and job description.
 * @access private
 */

const generateInterviewReportController = async (req, res) => {

  const parser = new PDFParse({
    data: req.file.buffer
  });

  const result = await parser.getText();
  await parser.destroy();

  const resumeContent = result.text;


  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    success: true,
    interviewReport
  });

};


/**
 * @description Controller to get interview report by id.
 * @access private
 */

const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id, });
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
      success: false
    });
  }
  res.status(200).json({
    message: "Interview report fetched successfully",
    success: true,
    interviewReport
  });

}

/**
 * @description Controller to get all interview reports of logged in user.
 * @access private
 */

const getAllInterviewReportsController = async (req, res) => {

  const interviewReports = await interviewReportModel.find({ user: req.user.id, }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan ");

  res.status(200).json({
    message: "Interview reports fetched successfully",
    success: true,
    interviewReports
  });

}

/**
 * @description Controller to generate resume PDF based on user self description, resume & job descriprtion
 * @access private
 */

const generateResumePdfController = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findById(interviewId);
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
      success: false
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });
  res.set({
    "content-Type": "application/pdf",
    "content-Disposition": `attachment; filename=resume_${interviewReport._id}.pdf`
  });
  res.send(pdfBuffer);
}

export default { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController };
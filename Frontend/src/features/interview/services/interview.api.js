import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})

/**
 * @description Service to generate interview report on the basis of user self description, resume and job description.
 * @access private
 */

export const generateInterviewReport = async ({ selfDescription, jobDescription, resumeFile }) => {
  try {
    const formData = new FormData();
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;

  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Service to generate interview report on the basis of user self description, resume and job description.
 * @access private
 */

export const generateInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/${interviewId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Service to get all interview reports of logged in user.
 * @access private
 */

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Service to generate resume PDF based on user self description, resume and job description.
 * @access private
 */

export const generateResumePdf = async (interviewReportId) => {
  try {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
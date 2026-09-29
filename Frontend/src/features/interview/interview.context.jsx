import { createContext, useState } from "react";
import { generateInterviewReport, generateInterviewReportById, getAllInterviewReports } from "./services/interview.api.js";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <InterviewContext.Provider value={{ setLoading, loading, setReport, report, setReports, reports }}>
      {children}
    </InterviewContext.Provider>
  )
}
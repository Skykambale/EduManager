"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Star, Download } from "lucide-react"

interface Submission {
  id: number
  studentName: string
  taskTitle: string
  batch: string
  submissionDate: string
  fileUrl: string
  currentGrade?: string
  feedback?: string
  status: "Pending" | "Graded"
}

export default function TrainerGradingPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      studentName: "John Doe",
      taskTitle: "React Hooks Assignment",
      batch: "React Batch 1",
      submissionDate: "2024-01-27",
      fileUrl: "john_react_assignment.zip",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      taskTitle: "React Hooks Assignment",
      batch: "React Batch 1",
      submissionDate: "2024-01-28",
      fileUrl: "jane_react_assignment.zip",
      currentGrade: "A",
      feedback: "Excellent work! Great implementation of hooks.",
      status: "Graded",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      taskTitle: "Component Lifecycle Quiz",
      batch: "React Batch 1",
      submissionDate: "2024-01-29",
      fileUrl: "mike_quiz_answers.pdf",
      status: "Pending",
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      taskTitle: "JavaScript ES6 Features",
      batch: "Advanced JavaScript",
      submissionDate: "2024-01-26",
      fileUrl: "sarah_es6_project.zip",
      currentGrade: "B+",
      feedback: "Good understanding, but could improve error handling.",
      status: "Graded",
    },
  ])

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [gradeForm, setGradeForm] = useState({
    grade: "",
    feedback: "",
  })

  const handleGradeSubmission = (submission: Submission) => {
    setSelectedSubmission(submission)
    setGradeForm({
      grade: submission.currentGrade || "",
      feedback: submission.feedback || "",
    })
  }

  const handleSaveGrade = () => {
    if (!selectedSubmission) return

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission.id
          ? {
              ...sub,
              currentGrade: gradeForm.grade,
              feedback: gradeForm.feedback,
              status: "Graded" as const,
            }
          : sub,
      ),
    )

    setSelectedSubmission(null)
    setGradeForm({ grade: "", feedback: "" })
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    if (grade.startsWith("D") || grade.startsWith("F")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const pendingCount = submissions.filter((s) => s.status === "Pending").length
  const gradedCount = submissions.filter((s) => s.status === "Graded").length

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Grade Submissions</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Pending: {pendingCount}</span>
            <span>Graded: {gradedCount}</span>
          </div>
        </div>

        {/* Grading Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-2xl font-bold text-gray-900">{gradedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Student Submissions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.taskTitle}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        {submission.fileUrl}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.batch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(submission.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.currentGrade ? (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(submission.currentGrade)}`}
                        >
                          {submission.currentGrade}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Not graded</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleGradeSubmission(submission)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {submission.status === "Graded" ? "Edit Grade" : "Grade"}
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grading Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setSelectedSubmission(null)}
              />

              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Grade Submission: {selectedSubmission.studentName}
                  </h3>
                  <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Submission Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Submission Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Task:</span>
                        <p className="font-medium">{selectedSubmission.taskTitle}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Batch:</span>
                        <p className="font-medium">{selectedSubmission.batch}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Submitted:</span>
                        <p className="font-medium">
                          {new Date(selectedSubmission.submissionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">File:</span>
                        <p className="font-medium text-blue-600">{selectedSubmission.fileUrl}</p>
                      </div>
                    </div>
                  </div>

                  {/* Grading Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                      <select
                        value={gradeForm.grade}
                        onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Grade</option>
                        <option value="A+">A+ (Excellent)</option>
                        <option value="A">A (Very Good)</option>
                        <option value="A-">A- (Good)</option>
                        <option value="B+">B+ (Above Average)</option>
                        <option value="B">B (Average)</option>
                        <option value="B-">B- (Below Average)</option>
                        <option value="C+">C+ (Satisfactory)</option>
                        <option value="C">C (Needs Improvement)</option>
                        <option value="D">D (Poor)</option>
                        <option value="F">F (Fail)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                      <textarea
                        value={gradeForm.feedback}
                        onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Provide detailed feedback for the student..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setSelectedSubmission(null)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveGrade}
                      disabled={!gradeForm.grade}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Grade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

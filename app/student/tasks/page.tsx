"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import { Upload, Calendar, Clock, CheckCircle, AlertCircle, FileText, Eye } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  status: "Pending" | "Submitted" | "Overdue" | "Graded"
  grade?: string
  feedback?: string
  submissionDate?: string
  submittedFile?: string
}

export default function StudentTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "React Hooks Assignment",
      description:
        "Create a todo app using React hooks (useState, useEffect, useContext). Include add, delete, and toggle functionality.",
      dueDate: "2024-01-28",
      status: "Graded",
      grade: "A",
      feedback: "Excellent work! Great implementation of hooks and clean code structure.",
      submissionDate: "2024-01-27",
      submittedFile: "react_todo_app.zip",
    },
    {
      id: 2,
      title: "Component Lifecycle Quiz",
      description: "Complete the online quiz covering React component lifecycle methods and their use cases.",
      dueDate: "2024-01-30",
      status: "Submitted",
      submissionDate: "2024-01-29",
      submittedFile: "lifecycle_quiz_answers.pdf",
    },
    {
      id: 3,
      title: "Final Project Proposal",
      description: "Submit a detailed proposal for your final project including tech stack, features, and timeline.",
      dueDate: "2024-02-05",
      status: "Pending",
    },
    {
      id: 4,
      title: "JavaScript ES6 Features",
      description: "Implement examples demonstrating arrow functions, destructuring, promises, and async/await.",
      dueDate: "2024-01-25",
      status: "Overdue",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [submissionForm, setSubmissionForm] = useState({
    file: null as File | null,
    comments: "",
  })

  const handleSubmitTask = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionForm({ ...submissionForm, file: e.target.files[0] })
    }
  }

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask || !submissionForm.file) return

    // Update task status
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              status: "Submitted" as const,
              submissionDate: new Date().toISOString().split("T")[0],
              submittedFile: submissionForm.file?.name,
            }
          : task,
      ),
    )

    // Reset form and close modal
    setIsModalOpen(false)
    setSelectedTask(null)
    setSubmissionForm({ file: null, comments: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Graded":
        return "bg-blue-100 text-blue-800"
      case "Submitted":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Graded":
        return <CheckCircle className="h-4 w-4" />
      case "Submitted":
        return <CheckCircle className="h-4 w-4" />
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const pendingTasks = tasks.filter((t) => t.status === "Pending").length
  const submittedTasks = tasks.filter((t) => t.status === "Submitted").length
  const gradedTasks = tasks.filter((t) => t.status === "Graded").length
  const overdueTasks = tasks.filter((t) => t.status === "Overdue").length

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Task Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-gray-900">{submittedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-2xl font-bold text-gray-900">{gradedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{overdueTasks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}
                    >
                      {getStatusIcon(task.status)}
                      <span className="ml-1">{task.status}</span>
                    </span>
                    {task.grade && (
                      <span className={`text-lg font-bold ${getGradeColor(task.grade)}`}>{task.grade}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{task.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                {task.submissionDate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Submitted: {new Date(task.submissionDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {task.submittedFile && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>File: {task.submittedFile}</span>
                </div>
              )}

              {task.feedback && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-blue-900 mb-2">Feedback:</h4>
                  <p className="text-blue-800 text-sm">{task.feedback}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                {task.status === "Pending" || task.status === "Overdue" ? (
                  <button
                    onClick={() => handleSubmitTask(task)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Submit Task</span>
                  </button>
                ) : (
                  <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View Submission</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTask(null)
            setSubmissionForm({ file: null, comments: "" })
          }}
          title={`Submit: ${selectedTask?.title}`}
        >
          <form onSubmit={handleSubmission} className="space-y-4">
            {selectedTask && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Task Details</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedTask.description}</p>
                <p className="text-sm text-gray-600">Due Date: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.zip,.rar"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {submissionForm.file ? submissionForm.file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, ZIP files up to 10MB</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
              <textarea
                value={submissionForm.comments}
                onChange={(e) => setSubmissionForm({ ...submissionForm, comments: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any comments about your submission..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedTask(null)
                  setSubmissionForm({ file: null, comments: "" })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!submissionForm.file}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Task
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}

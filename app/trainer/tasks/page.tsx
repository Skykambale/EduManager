"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import { Plus, Eye, Calendar, Users, Clock } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  batch: string
  dueDate: string
  status: "Active" | "Completed" | "Overdue"
  submissions: number
  totalStudents: number
  createdDate: string
}

interface Submission {
  id: number
  studentName: string
  submissionDate: string
  status: "Submitted" | "Late" | "Pending"
  fileUrl?: string
  comments?: string
}

export default function TrainerTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "React Hooks Assignment",
      description: "Create a todo app using React hooks (useState, useEffect, useContext)",
      batch: "React Batch 1",
      dueDate: "2024-01-28",
      status: "Active",
      submissions: 18,
      totalStudents: 25,
      createdDate: "2024-01-20",
    },
    {
      id: 2,
      title: "Component Lifecycle Quiz",
      description: "Complete the quiz on React component lifecycle methods",
      batch: "React Batch 1",
      dueDate: "2024-01-30",
      status: "Active",
      submissions: 12,
      totalStudents: 25,
      createdDate: "2024-01-22",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      description: "Implement examples of arrow functions, destructuring, and async/await",
      batch: "Advanced JavaScript",
      dueDate: "2024-01-25",
      status: "Overdue",
      submissions: 15,
      totalStudents: 18,
      createdDate: "2024-01-18",
    },
  ])

  const [submissions] = useState<Submission[]>([
    {
      id: 1,
      studentName: "John Doe",
      submissionDate: "2024-01-27",
      status: "Submitted",
      fileUrl: "assignment1.zip",
      comments: "Completed all requirements",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      submissionDate: "2024-01-28",
      status: "Submitted",
      fileUrl: "assignment2.zip",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      submissionDate: "2024-01-29",
      status: "Late",
      fileUrl: "assignment3.zip",
      comments: "Sorry for the delay",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    batch: "",
    dueDate: "",
  })

  const [batches] = useState(["React Batch 1", "Advanced JavaScript", "Node.js Batch 2"])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTask: Task = {
      id: Date.now(),
      ...formData,
      status: new Date(formData.dueDate) < new Date() ? "Overdue" : "Active",
      submissions: 0,
      totalStudents: 25, // Default value
      createdDate: new Date().toISOString().split("T")[0],
    }
    setTasks([...tasks, newTask])

    setIsModalOpen(false)
    setFormData({ title: "", description: "", batch: "", dueDate: "" })
  }

  const handleViewSubmissions = (task: Task) => {
    setSelectedTask(task)
    setIsSubmissionsModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-800"
      case "Late":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Assign New Task</span>
          </button>
        </div>

        {/* Tasks Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter((t) => t.status === "Active").length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.filter((t) => t.status === "Overdue").length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Submissions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    tasks.reduce((acc, task) => acc + (task.submissions / task.totalStudents) * 100, 0) / tasks.length,
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{task.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Batch: {task.batch}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Submissions: {task.submissions}/{task.totalStudents}
                  </span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(task.submissions / task.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleViewSubmissions(task)}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Submissions</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setFormData({ title: "", description: "", batch: "", dueDate: "" })
          }}
          title="Assign New Task"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Batch</label>
              <select
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setFormData({ title: "", description: "", batch: "", dueDate: "" })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Assign Task
              </button>
            </div>
          </form>
        </Modal>

        {/* Submissions Modal */}
        <Modal
          isOpen={isSubmissionsModalOpen}
          onClose={() => {
            setIsSubmissionsModalOpen(false)
            setSelectedTask(null)
          }}
          title={`Submissions for: ${selectedTask?.title}`}
        >
          <div className="space-y-4">
            {selectedTask && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Task Details</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedTask.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Due Date: {new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                  <span>
                    Submissions: {selectedTask.submissions}/{selectedTask.totalStudents}
                  </span>
                </div>
              </div>
            )}

            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{submission.studentName}</h5>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getSubmissionStatusColor(submission.status)}`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                    </div>
                    {submission.fileUrl && <div className="text-sm text-blue-600 mb-2">📎 {submission.fileUrl}</div>}
                    {submission.comments && <div className="text-sm text-gray-600 italic">"{submission.comments}"</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}

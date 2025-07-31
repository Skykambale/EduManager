"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import { Plus, Edit, Trash2, Users, Calendar, Clock } from "lucide-react"

interface Batch {
  id: number
  courseName: string
  trainer: string
  schedule: string
  studentCount: number
  startDate: string
  endDate: string
  status: "Active" | "Completed" | "Upcoming"
}

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: 1,
      courseName: "React Development",
      trainer: "John Smith",
      schedule: "Mon-Wed-Fri 10:00-12:00",
      studentCount: 25,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      status: "Active",
    },
    {
      id: 2,
      courseName: "Node.js Backend",
      trainer: "Sarah Johnson",
      schedule: "Tue-Thu-Sat 14:00-16:00",
      studentCount: 20,
      startDate: "2024-01-20",
      endDate: "2024-04-20",
      status: "Active",
    },
    {
      id: 3,
      courseName: "Python Programming",
      trainer: "Mike Wilson",
      schedule: "Mon-Wed-Fri 16:00-18:00",
      studentCount: 30,
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      status: "Active",
    },
    {
      id: 4,
      courseName: "Java Development",
      trainer: "Emily Davis",
      schedule: "Tue-Thu-Sat 10:00-12:00",
      studentCount: 18,
      startDate: "2024-03-01",
      endDate: "2024-06-01",
      status: "Upcoming",
    },
  ])

  const [trainers] = useState(["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis", "Robert Brown"])
  const [students] = useState([
    "Alice Cooper",
    "Bob Johnson",
    "Charlie Brown",
    "Diana Prince",
    "Edward Norton",
    "Fiona Apple",
    "George Lucas",
    "Helen Hunt",
    "Ian McKellen",
    "Julia Roberts",
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null)

  const [formData, setFormData] = useState({
    courseName: "",
    trainer: "",
    schedule: "",
    startDate: "",
    endDate: "",
    selectedStudents: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingBatch) {
      setBatches(
        batches.map((batch) =>
          batch.id === editingBatch.id
            ? {
                ...batch,
                ...formData,
                studentCount: formData.selectedStudents.length,
                status: new Date(formData.startDate) > new Date() ? "Upcoming" : "Active",
              }
            : batch,
        ),
      )
    } else {
      const newBatch: Batch = {
        id: Date.now(),
        ...formData,
        studentCount: formData.selectedStudents.length,
        status: new Date(formData.startDate) > new Date() ? "Upcoming" : "Active",
      }
      setBatches([...batches, newBatch])
    }

    setIsModalOpen(false)
    setEditingBatch(null)
    setFormData({ courseName: "", trainer: "", schedule: "", startDate: "", endDate: "", selectedStudents: [] })
  }

  const handleEdit = (batch: Batch) => {
    setEditingBatch(batch)
    setFormData({
      courseName: batch.courseName,
      trainer: batch.trainer,
      schedule: batch.schedule,
      startDate: batch.startDate,
      endDate: batch.endDate,
      selectedStudents: [],
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter((batch) => batch.id !== id))
    }
  }

  const handleStudentToggle = (student: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(student)
        ? prev.selectedStudents.filter((s) => s !== student)
        : [...prev.selectedStudents, student],
    }))
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Batches</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Batch</span>
          </button>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{batch.courseName}</h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    batch.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : batch.status === "Upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {batch.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Trainer: {batch.trainer}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{batch.schedule}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    <Users className="h-4 w-4 inline mr-1" />
                    {batch.studentCount} students
                  </span>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(batch)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(batch.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Batch Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingBatch(null)
            setFormData({ courseName: "", trainer: "", schedule: "", startDate: "", endDate: "", selectedStudents: [] })
          }}
          title={editingBatch ? "Edit Batch" : "Add New Batch"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <input
                type="text"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
              <select
                value={formData.trainer}
                onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer} value={trainer}>
                    {trainer}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="e.g., Mon-Wed-Fri 10:00-12:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Students</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                {students.map((student) => (
                  <label key={student} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.selectedStudents.includes(student)}
                      onChange={() => handleStudentToggle(student)}
                      className="mr-2"
                    />
                    <span className="text-sm">{student}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">{formData.selectedStudents.length} students selected</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingBatch(null)
                  setFormData({
                    courseName: "",
                    trainer: "",
                    schedule: "",
                    startDate: "",
                    endDate: "",
                    selectedStudents: [],
                  })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingBatch ? "Update" : "Create"} Batch
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}

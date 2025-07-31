"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Calendar, Users, Check, X, Clock } from "lucide-react"

interface Student {
  id: number
  name: string
  status: "present" | "absent" | "late"
}

export default function TrainerAttendancePage() {
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const [batches] = useState(["React Development", "Advanced JavaScript", "Node.js Backend"])

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "John Doe", status: "present" },
    { id: 2, name: "Jane Smith", status: "present" },
    { id: 3, name: "Mike Johnson", status: "absent" },
    { id: 4, name: "Sarah Wilson", status: "late" },
    { id: 5, name: "Tom Brown", status: "present" },
    { id: 6, name: "Lisa Davis", status: "present" },
    { id: 7, name: "Chris Lee", status: "absent" },
    { id: 8, name: "Amy Chen", status: "present" },
  ])

  const handleStatusChange = (studentId: number, status: "present" | "absent" | "late") => {
    setStudents(students.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const handleSaveAttendance = () => {
    alert("Attendance saved successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-4 w-4" />
      case "absent":
        return <X className="h-4 w-4" />
      case "late":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  const presentCount = students.filter((s) => s.status === "present").length
  const absentCount = students.filter((s) => s.status === "absent").length
  const lateCount = students.filter((s) => s.status === "late").length

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date(selectedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Batch and Date Selection */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Batch</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a batch</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {selectedBatch && (
          <>
            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <Check className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <X className="h-8 w-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Late</p>
                    <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Attendance List */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">{selectedBatch} - Student Attendance</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${getStatusColor(student.status)}`}
                        >
                          {getStatusIcon(student.status)}
                          <span className="capitalize">{student.status}</span>
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(student.id, "present")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            student.status === "present"
                              ? "bg-green-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-green-100"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, "late")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            student.status === "late"
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
                          }`}
                        >
                          Late
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, "absent")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            student.status === "absent"
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-red-100"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveAttendance}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Save Attendance
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

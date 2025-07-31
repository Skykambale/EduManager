"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import { Plus, Edit, Trash2, Search, Building, TrendingUp } from "lucide-react"

interface Placement {
  id: number
  studentName: string
  company: string
  role: string
  package: number
  status: "PLACED" | "OFFERED" | "REJECTED" | "INTERVIEW"
  placementDate?: string
  batch: string
  contactEmail: string
}

export default function AdminPlacementsPage() {
  const [placements, setPlacements] = useState<Placement[]>([
    {
      id: 1,
      studentName: "John Doe",
      company: "Google",
      role: "Frontend Developer",
      package: 1200000,
      status: "PLACED",
      placementDate: "2024-01-15",
      batch: "React Batch 1",
      contactEmail: "john@example.com",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      company: "Microsoft",
      role: "Full Stack Developer",
      package: 1500000,
      status: "PLACED",
      placementDate: "2024-01-18",
      batch: "Node.js Batch 2",
      contactEmail: "jane@example.com",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      company: "Amazon",
      role: "Backend Developer",
      package: 1800000,
      status: "OFFERED",
      batch: "Python Batch 3",
      contactEmail: "mike@example.com",
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      company: "Meta",
      role: "React Developer",
      package: 1600000,
      status: "INTERVIEW",
      batch: "React Batch 1",
      contactEmail: "sarah@example.com",
    },
    {
      id: 5,
      studentName: "Tom Brown",
      company: "Netflix",
      role: "DevOps Engineer",
      package: 1400000,
      status: "REJECTED",
      batch: "Java Batch 4",
      contactEmail: "tom@example.com",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const [formData, setFormData] = useState({
    studentName: "",
    company: "",
    role: "",
    package: "",
    status: "INTERVIEW" as "PLACED" | "OFFERED" | "REJECTED" | "INTERVIEW",
    batch: "",
    contactEmail: "",
  })

  const batches = ["React Batch 1", "Node.js Batch 2", "Python Batch 3", "Java Batch 4"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPlacement) {
      setPlacements(
        placements.map((placement) =>
          placement.id === editingPlacement.id
            ? {
                ...placement,
                ...formData,
                package: Number.parseFloat(formData.package),
                placementDate: formData.status === "PLACED" ? new Date().toISOString().split("T")[0] : undefined,
              }
            : placement,
        ),
      )
    } else {
      const newPlacement: Placement = {
        id: Date.now(),
        ...formData,
        package: Number.parseFloat(formData.package),
        placementDate: formData.status === "PLACED" ? new Date().toISOString().split("T")[0] : undefined,
      }
      setPlacements([...placements, newPlacement])
    }

    setIsModalOpen(false)
    setEditingPlacement(null)
    setFormData({
      studentName: "",
      company: "",
      role: "",
      package: "",
      status: "INTERVIEW",
      batch: "",
      contactEmail: "",
    })
  }

  const handleEdit = (placement: Placement) => {
    setEditingPlacement(placement)
    setFormData({
      studentName: placement.studentName,
      company: placement.company,
      role: placement.role,
      package: placement.package.toString(),
      status: placement.status,
      batch: placement.batch,
      contactEmail: placement.contactEmail,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this placement record?")) {
      setPlacements(placements.filter((placement) => placement.id !== id))
    }
  }

  const filteredPlacements = placements.filter((placement) => {
    const matchesSearch =
      placement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || placement.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-green-100 text-green-800"
      case "OFFERED":
        return "bg-blue-100 text-blue-800"
      case "INTERVIEW":
        return "bg-yellow-100 text-yellow-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const placedCount = placements.filter((p) => p.status === "PLACED").length
  const averagePackage =
    placements.filter((p) => p.status === "PLACED").reduce((sum, p) => sum + p.package, 0) / placedCount || 0
  const highestPackage = Math.max(...placements.filter((p) => p.status === "PLACED").map((p) => p.package), 0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Placement Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Placement</span>
          </button>
        </div>

        {/* Placement Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Placed</p>
                <p className="text-2xl font-bold text-gray-900">{placedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Package</p>
                <p className="text-2xl font-bold text-gray-900">₹{(averagePackage / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Highest Package</p>
                <p className="text-2xl font-bold text-gray-900">₹{(highestPackage / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Building className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Placement Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((placedCount / placements.length) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, companies, or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="PLACED">Placed</option>
              <option value="OFFERED">Offered</option>
              <option value="INTERVIEW">Interview</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("")
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Placements Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlacements.map((placement) => (
                  <tr key={placement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{placement.studentName}</div>
                        <div className="text-sm text-gray-500">{placement.contactEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{placement.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{placement.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{(placement.package / 100000).toFixed(1)}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{placement.batch}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(placement.status)}`}
                      >
                        {placement.status}
                      </span>
                      {placement.placementDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(placement.placementDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(placement)} className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(placement.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Placement Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingPlacement(null)
            setFormData({
              studentName: "",
              company: "",
              role: "",
              package: "",
              status: "INTERVIEW",
              batch: "",
              contactEmail: "",
            })
          }}
          title={editingPlacement ? "Edit Placement" : "Add New Placement"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package (₹)</label>
              <input
                type="number"
                value={formData.package}
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "PLACED" | "OFFERED" | "REJECTED" | "INTERVIEW",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="INTERVIEW">Interview</option>
                <option value="OFFERED">Offered</option>
                <option value="PLACED">Placed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingPlacement(null)
                  setFormData({
                    studentName: "",
                    company: "",
                    role: "",
                    package: "",
                    status: "INTERVIEW",
                    batch: "",
                    contactEmail: "",
                  })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingPlacement ? "Update" : "Add"} Placement
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}

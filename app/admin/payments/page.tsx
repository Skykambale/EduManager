"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import { Plus, Edit, Trash2, Search, Filter, CreditCard, DollarSign } from "lucide-react"

interface Payment {
  id: number
  studentName: string
  course: string
  amount: number
  method: "CASH" | "CARD" | "ONLINE"
  status: "PENDING" | "COMPLETED" | "FAILED"
  dueDate: string
  paidDate?: string
  transactionId?: string
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      studentName: "John Doe",
      course: "React Development",
      amount: 25000,
      method: "ONLINE",
      status: "COMPLETED",
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      transactionId: "TXN123456789",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      course: "Node.js Backend",
      amount: 30000,
      method: "CARD",
      status: "COMPLETED",
      dueDate: "2024-01-20",
      paidDate: "2024-01-18",
      transactionId: "TXN987654321",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      course: "Python Programming",
      amount: 28000,
      method: "CASH",
      status: "PENDING",
      dueDate: "2024-01-25",
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      course: "Java Development",
      amount: 32000,
      method: "ONLINE",
      status: "FAILED",
      dueDate: "2024-01-22",
      transactionId: "TXN456789123",
    },
    {
      id: 5,
      studentName: "Tom Brown",
      course: "Full Stack Development",
      amount: 45000,
      method: "CARD",
      status: "COMPLETED",
      dueDate: "2024-01-30",
      paidDate: "2024-01-28",
      transactionId: "TXN789123456",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [methodFilter, setMethodFilter] = useState("")

  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    amount: "",
    method: "ONLINE" as "CASH" | "CARD" | "ONLINE",
    dueDate: "",
  })

  const courses = [
    "React Development",
    "Node.js Backend",
    "Python Programming",
    "Java Development",
    "Full Stack Development",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPayment) {
      setPayments(
        payments.map((payment) =>
          payment.id === editingPayment.id
            ? {
                ...payment,
                ...formData,
                amount: Number.parseFloat(formData.amount),
              }
            : payment,
        ),
      )
    } else {
      const newPayment: Payment = {
        id: Date.now(),
        ...formData,
        amount: Number.parseFloat(formData.amount),
        status: "PENDING",
      }
      setPayments([...payments, newPayment])
    }

    setIsModalOpen(false)
    setEditingPayment(null)
    setFormData({ studentName: "", course: "", amount: "", method: "ONLINE", dueDate: "" })
  }

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment)
    setFormData({
      studentName: payment.studentName,
      course: payment.course,
      amount: payment.amount.toString(),
      method: payment.method,
      dueDate: payment.dueDate,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment record?")) {
      setPayments(payments.filter((payment) => payment.id !== id))
    }
  }

  const handleStatusUpdate = (id: number, newStatus: "PENDING" | "COMPLETED" | "FAILED") => {
    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: newStatus,
              paidDate: newStatus === "COMPLETED" ? new Date().toISOString().split("T")[0] : undefined,
              transactionId: newStatus === "COMPLETED" ? `TXN${Date.now()}` : payment.transactionId,
            }
          : payment,
      ),
    )
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || payment.status === statusFilter
    const matchesMethod = methodFilter === "" || payment.method === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "FAILED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedAmount = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "PENDING").reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Payment</span>
          </button>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">₹{completedAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students or courses..."
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
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Methods</option>
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="ONLINE">Online</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("")
                setMethodFilter("")
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
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
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                      {payment.transactionId && (
                        <div className="text-sm text-gray-500">ID: {payment.transactionId}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{new Date(payment.dueDate).toLocaleDateString()}</div>
                      {payment.paidDate && (
                        <div className="text-xs text-green-600">
                          Paid: {new Date(payment.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={payment.status}
                        onChange={(e) =>
                          handleStatusUpdate(payment.id, e.target.value as "PENDING" | "COMPLETED" | "FAILED")
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(payment.status)}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(payment)} className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(payment.id)} className="text-red-600 hover:text-red-900">
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

        {/* Add/Edit Payment Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingPayment(null)
            setFormData({ studentName: "", course: "", amount: "", method: "ONLINE", dueDate: "" })
          }}
          title={editingPayment ? "Edit Payment" : "Add New Payment"}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value as "CASH" | "CARD" | "ONLINE" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="ONLINE">Online</option>
                <option value="CARD">Card</option>
                <option value="CASH">Cash</option>
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
                  setEditingPayment(null)
                  setFormData({ studentName: "", course: "", amount: "", method: "ONLINE", dueDate: "" })
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingPayment ? "Update" : "Add"} Payment
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}

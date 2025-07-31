"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { CreditCard, Calendar, CheckCircle, Clock, AlertCircle, Download } from "lucide-react"

interface Payment {
  id: number
  description: string
  amount: number
  dueDate: string
  paidDate?: string
  method?: string
  status: "PAID" | "PENDING" | "OVERDUE"
  transactionId?: string
  receiptUrl?: string
}

export default function StudentPaymentsPage() {
  const [payments] = useState<Payment[]>([
    {
      id: 1,
      description: "Course Fee - React Development (1st Installment)",
      amount: 25000,
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      method: "Online Banking",
      status: "PAID",
      transactionId: "TXN123456789",
      receiptUrl: "receipt_jan_2024.pdf",
    },
    {
      id: 2,
      description: "Course Fee - React Development (2nd Installment)",
      amount: 25000,
      dueDate: "2024-02-15",
      paidDate: "2024-02-14",
      method: "Credit Card",
      status: "PAID",
      transactionId: "TXN987654321",
      receiptUrl: "receipt_feb_2024.pdf",
    },
    {
      id: 3,
      description: "Course Fee - React Development (3rd Installment)",
      amount: 25000,
      dueDate: "2024-03-15",
      status: "PENDING",
    },
    {
      id: 4,
      description: "Lab Fee",
      amount: 5000,
      dueDate: "2024-01-20",
      status: "OVERDUE",
    },
  ])

  const [courseInfo] = useState({
    courseName: "React Development",
    totalFee: 80000,
    paidAmount: 50000,
    pendingAmount: 30000,
    installments: 4,
    paidInstallments: 2,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "OVERDUE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="h-4 w-4" />
      case "PENDING":
        return <Clock className="h-4 w-4" />
      case "OVERDUE":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const paidPayments = payments.filter((p) => p.status === "PAID")
  const pendingPayments = payments.filter((p) => p.status === "PENDING")
  const overduePayments = payments.filter((p) => p.status === "OVERDUE")

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Course Payment Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Payment Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{courseInfo.courseName}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Course Fee:</span>
                  <span className="text-sm font-medium text-gray-900">₹{courseInfo.totalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount Paid:</span>
                  <span className="text-sm font-medium text-green-600">₹{courseInfo.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending Amount:</span>
                  <span className="text-sm font-medium text-red-600">₹{courseInfo.pendingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Installments:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {courseInfo.paidInstallments}/{courseInfo.installments} paid
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Payment Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round((courseInfo.paidAmount / courseInfo.totalFee) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(courseInfo.paidAmount / courseInfo.totalFee) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {courseInfo.pendingAmount > 0 ? (
                    <span>₹{courseInfo.pendingAmount.toLocaleString()} remaining</span>
                  ) : (
                    <span className="text-green-600">Payment completed!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">{paidPayments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{overduePayments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">₹{courseInfo.paidAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                        {payment.transactionId && (
                          <div className="text-sm text-gray-500">ID: {payment.transactionId}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{new Date(payment.dueDate).toLocaleDateString()}</div>
                      {payment.paidDate && (
                        <div className="text-xs text-green-600">
                          Paid: {new Date(payment.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}
                      >
                        {getStatusIcon(payment.status)}
                        <span className="ml-1">{payment.status}</span>
                      </span>
                      {payment.method && <div className="text-xs text-gray-500 mt-1">{payment.method}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {payment.status === "PAID" && payment.receiptUrl && (
                          <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>Receipt</span>
                          </button>
                        )}
                        {(payment.status === "PENDING" || payment.status === "OVERDUE") && (
                          <button className="text-green-600 hover:text-green-900">Pay Now</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Online Banking</h4>
                <p className="text-sm text-gray-600 mt-1">Pay securely through your bank</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Credit/Debit Card</h4>
                <p className="text-sm text-gray-600 mt-1">Visa, MasterCard, RuPay accepted</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">UPI</h4>
                <p className="text-sm text-gray-600 mt-1">Pay using UPI apps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Need Help with Payments?</h3>
          <p className="text-blue-800 text-sm mb-4">
            If you have any questions about your payments or need assistance, please contact our finance team.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
            <div className="flex items-center text-blue-800">
              <span className="font-medium">Email:</span>
              <span className="ml-1">finance@institute.com</span>
            </div>
            <div className="flex items-center text-blue-800">
              <span className="font-medium">Phone:</span>
              <span className="ml-1">+91 9876543210</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

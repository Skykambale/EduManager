"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Download, Eye, Filter } from "lucide-react"
import Layout from "@/components/Layout"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function StudentPayments() {
  const [filterStatus, setFilterStatus] = useState("all")

  const paymentStats = [
    {
      title: "Total Paid",
      value: "$2,450",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Pending",
      value: "$850",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Overdue",
      value: "$200",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "Next Due",
      value: "Jan 25",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
  ]

  const paymentHistory = [
    {
      id: 1,
      description: "Course Fee - React Fundamentals",
      amount: 850,
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      status: "paid",
      method: "Credit Card",
      invoiceNumber: "INV-2024-001",
    },
    {
      id: 2,
      description: "Course Fee - JavaScript Advanced",
      amount: 750,
      dueDate: "2024-01-25",
      paidDate: null,
      status: "pending",
      method: null,
      invoiceNumber: "INV-2024-002",
    },
    {
      id: 3,
      description: "Lab Fee - Database Systems",
      amount: 200,
      dueDate: "2024-01-10",
      paidDate: null,
      status: "overdue",
      method: null,
      invoiceNumber: "INV-2024-003",
    },
    {
      id: 4,
      description: "Course Fee - Web Design",
      amount: 650,
      dueDate: "2023-12-20",
      paidDate: "2023-12-18",
      status: "paid",
      method: "Bank Transfer",
      invoiceNumber: "INV-2023-045",
    },
    {
      id: 5,
      description: "Registration Fee",
      amount: 200,
      dueDate: "2023-12-01",
      paidDate: "2023-11-28",
      status: "paid",
      method: "Credit Card",
      invoiceNumber: "INV-2023-030",
    },
  ]

  const filteredPayments = paymentHistory.filter((payment) => {
    return filterStatus === "all" || payment.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Layout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment History</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your course payments and manage your billing</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${stat.bgColor} p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Summary</h2>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <CreditCard className="h-5 w-5 text-blue-500" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">$2,450</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Paid</div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-2"
              >
                <div className="bg-green-500 h-2 rounded-full w-full" />
              </motion.div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">$850</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2 mt-2"
              >
                <div className="bg-yellow-500 h-2 rounded-full w-full" />
              </motion.div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">$200</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Overdue</div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "15%" }}
                transition={{ duration: 1.5, delay: 0.9 }}
                className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2 mt-2"
              >
                <div className="bg-red-500 h-2 rounded-full w-full" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    className="transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{payment.description}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{payment.invoiceNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <Download className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

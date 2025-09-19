"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, BookOpen } from "lucide-react"
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

export default function StudentAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01")

  const attendanceStats = [
    {
      title: "Total Classes",
      value: "45",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Present",
      value: "38",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Absent",
      value: "5",
      icon: XCircle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "Attendance Rate",
      value: "84%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  const attendanceRecords = [
    {
      id: 1,
      date: "2024-01-15",
      course: "React Fundamentals",
      time: "10:00 AM - 12:00 PM",
      status: "present",
      instructor: "John Doe",
    },
    {
      id: 2,
      date: "2024-01-14",
      course: "JavaScript Advanced",
      time: "2:00 PM - 4:00 PM",
      status: "present",
      instructor: "Jane Smith",
    },
    {
      id: 3,
      date: "2024-01-13",
      course: "Database Systems",
      time: "9:00 AM - 11:00 AM",
      status: "absent",
      instructor: "Mike Johnson",
    },
    {
      id: 4,
      date: "2024-01-12",
      course: "Web Design",
      time: "3:00 PM - 5:00 PM",
      status: "present",
      instructor: "Sarah Wilson",
    },
    {
      id: 5,
      date: "2024-01-11",
      course: "React Fundamentals",
      time: "10:00 AM - 12:00 PM",
      status: "late",
      instructor: "John Doe",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "late":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "late":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Layout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Attendance Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your class attendance and track your progress</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attendanceStats.map((stat, index) => {
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

        {/* Attendance Progress */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Monthly Progress</h2>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <TrendingUp className="h-5 w-5 text-green-500" />
            </motion.div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Overall Attendance Rate</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">84%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">38</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Late</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">5</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Absent</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="2024-01">January 2024</option>
              <option value="2023-12">December 2023</option>
              <option value="2023-11">November 2023</option>
              <option value="2023-10">October 2023</option>
            </select>
          </div>
        </motion.div>

        {/* Attendance Records */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Attendance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {attendanceRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    className="transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {record.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
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

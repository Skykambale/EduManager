"use client"

import { useState } from "react"
import Layout from "../../../components/Layout"
import {
  Users,
  ClipboardList,
  Award,
  Calendar,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
} from "lucide-react"
import { motion } from "framer-motion"

export default function TrainerDashboard() {
  const [stats] = useState({
    totalStudents: 45,
    activeTasks: 8,
    completedTasks: 23,
    averageGrade: 8.7,
    attendanceRate: 92,
    upcomingClasses: 3,
  })

  const [upcomingClasses] = useState([
    { id: 1, subject: "React Fundamentals", time: "10:00 AM", students: 15, room: "Room A1" },
    { id: 2, subject: "JavaScript Advanced", time: "2:00 PM", students: 12, room: "Room B2" },
    { id: 3, subject: "Node.js Basics", time: "4:00 PM", students: 18, room: "Room C3" },
  ])

  const [recentSubmissions] = useState([
    { id: 1, student: "John Doe", task: "React Component Assignment", submitted: "2 hours ago", status: "pending" },
    { id: 2, student: "Sarah Wilson", task: "JavaScript Quiz", submitted: "4 hours ago", status: "graded" },
    { id: 3, student: "Mike Johnson", task: "Portfolio Project", submitted: "1 day ago", status: "reviewed" },
  ])

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <Layout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trainer Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your classes and track student progress</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="font-semibold">Rating: 4.8/5</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "My Students",
              value: stats.totalStudents,
              icon: Users,
              color: "from-blue-500 to-blue-600",
              change: "+5 this month",
            },
            {
              title: "Active Tasks",
              value: stats.activeTasks,
              icon: ClipboardList,
              color: "from-purple-500 to-purple-600",
              change: "2 due today",
            },
            {
              title: "Average Grade",
              value: stats.averageGrade,
              icon: Award,
              color: "from-green-500 to-green-600",
              change: "+0.3 this month",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Today's Classes
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{upcomingClasses.length} classes</span>
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((class_, index) => (
                <motion.div
                  key={class_.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{class_.subject}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {class_.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {class_.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {class_.room}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Start
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Submissions */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                Recent Submissions
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{recentSubmissions.length} pending</span>
            </div>
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{submission.student}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{submission.task}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{submission.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : submission.status === "graded"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {submission.status}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Overview */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Performance Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Attendance Rate", value: stats.attendanceRate, color: "bg-blue-500" },
              { label: "Task Completion", value: 89, color: "bg-green-500" },
              { label: "Student Satisfaction", value: 94, color: "bg-purple-500" },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200 dark:text-gray-700"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      initial={{ strokeDasharray: "0 100" }}
                      animate={{ strokeDasharray: `${metric.value} 100` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={metric.color.replace("bg-", "text-")}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

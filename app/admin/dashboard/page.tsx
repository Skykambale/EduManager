"use client"

import { useState } from "react"
import Layout from "../../../components/Layout"
import { Users, TrendingUp, DollarSign, Award, BookOpen, Target, ArrowUp, Plus } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 245,
    totalTrainers: 18,
    activeBatches: 12,
    totalRevenue: 125000,
    attendanceRate: 87,
    completionRate: 92,
    placementRate: 78,
    avgGrade: 8.4,
  })

  const [recentActivities] = useState([
    {
      id: 1,
      type: "enrollment",
      message: "New student John Doe enrolled in React Batch",
      time: "2 hours ago",
      icon: Users,
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received from Sarah Wilson - $2,500",
      time: "4 hours ago",
      icon: DollarSign,
    },
    {
      id: 3,
      type: "completion",
      message: "5 students completed JavaScript Fundamentals",
      time: "6 hours ago",
      icon: Award,
    },
    { id: 4, type: "placement", message: "Alice Johnson placed at TechCorp Inc.", time: "1 day ago", icon: Target },
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening at Sky Learners.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Quick Action
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Students",
              value: stats.totalStudents,
              change: "+12%",
              icon: Users,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Active Trainers",
              value: stats.totalTrainers,
              change: "+3%",
              icon: Award,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Active Batches",
              value: stats.activeBatches,
              change: "+8%",
              icon: BookOpen,
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "Total Revenue",
              value: `$${stats.totalRevenue.toLocaleString()}`,
              change: "+15%",
              icon: DollarSign,
              color: "from-yellow-500 to-yellow-600",
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
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                  </div>
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

        {/* Performance Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              {[
                { label: "Attendance Rate", value: stats.attendanceRate, color: "bg-blue-500" },
                { label: "Course Completion", value: stats.completionRate, color: "bg-green-500" },
                { label: "Placement Rate", value: stats.placementRate, color: "bg-purple-500" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-2 ${metric.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <activity.icon className="h-4 w-4 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Add Student", icon: Users, href: "/admin/students" },
              { label: "Create Batch", icon: BookOpen, href: "/admin/batches" },
              { label: "Add Trainer", icon: Award, href: "/admin/trainers" },
              { label: "View Reports", icon: TrendingUp, href: "/admin/reports" },
            ].map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <action.icon className="h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Award, TrendingUp, Calendar, CheckCircle } from "lucide-react"
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

export default function StudentDashboard() {
  const stats = [
    {
      title: "Active Courses",
      value: "3",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Hours Studied",
      value: "124",
      icon: Clock,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Assignments",
      value: "8/12",
      icon: Award,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Progress",
      value: "67%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Completed React Fundamentals Quiz",
      time: "2 hours ago",
      type: "quiz",
      status: "completed",
    },
    {
      id: 2,
      title: "Submitted JavaScript Assignment",
      time: "1 day ago",
      type: "assignment",
      status: "submitted",
    },
    {
      id: 3,
      title: "Attended Web Development Workshop",
      time: "2 days ago",
      type: "workshop",
      status: "attended",
    },
    {
      id: 4,
      title: "Started Node.js Course",
      time: "3 days ago",
      type: "course",
      status: "in-progress",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "JavaScript Advanced Concepts",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "lecture",
    },
    {
      id: 2,
      title: "React Project Submission",
      date: "Dec 25",
      time: "11:59 PM",
      type: "deadline",
    },
    {
      id: 3,
      title: "Database Design Workshop",
      date: "Dec 28",
      time: "2:00 PM",
      type: "workshop",
    },
  ]

  return (
    <Layout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Student! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your learning journey today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-500"
                        : activity.status === "submitted"
                          ? "bg-blue-500"
                          : activity.status === "attended"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Events</h2>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Calendar className="h-5 w-5 text-blue-500" />
              </motion.div>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: -5, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                  className="flex items-center justify-between p-3 rounded-lg transition-all duration-200"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === "lecture"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        : event.type === "deadline"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    }`}
                  >
                    {event.type}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Progress</h2>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <TrendingUp className="h-5 w-5 text-green-500" />
            </motion.div>
          </div>
          <div className="space-y-4">
            {[
              { name: "React Fundamentals", progress: 85, color: "bg-blue-500" },
              { name: "JavaScript Advanced", progress: 60, color: "bg-green-500" },
              { name: "Node.js Basics", progress: 30, color: "bg-purple-500" },
            ].map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{course.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-2 ${course.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  ExternalLink,
  FileText,
  Download,
  Star,
  Clock,
} from "lucide-react"
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

export default function StudentPlacement() {
  const [activeTab, setActiveTab] = useState("opportunities")

  const placementStats = [
    {
      title: "Applications Sent",
      value: "12",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Interviews Scheduled",
      value: "5",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Offers Received",
      value: "2",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Success Rate",
      value: "42%",
      icon: Star,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  const jobOpportunities = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$75,000 - $95,000",
      type: "Full-time",
      posted: "2 days ago",
      description: "Looking for a skilled React developer to join our growing team.",
      requirements: ["React", "JavaScript", "CSS", "Git"],
      status: "open",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$80,000 - $100,000",
      type: "Full-time",
      posted: "1 week ago",
      description: "Join our innovative team building the next generation of web applications.",
      requirements: ["React", "Node.js", "MongoDB", "AWS"],
      status: "applied",
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Digital Agency",
      location: "New York, NY",
      salary: "$60,000 - $75,000",
      type: "Full-time",
      posted: "3 days ago",
      description: "Perfect opportunity for recent graduates to start their career.",
      requirements: ["HTML", "CSS", "JavaScript", "WordPress"],
      status: "open",
    },
  ]

  const interviews = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Frontend Developer",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Video Call",
      status: "scheduled",
      interviewer: "John Smith",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Developer",
      date: "2024-01-18",
      time: "2:00 PM",
      type: "In-person",
      status: "completed",
      interviewer: "Sarah Johnson",
    },
    {
      id: 3,
      company: "Digital Agency",
      position: "Junior Web Developer",
      date: "2024-01-25",
      time: "11:00 AM",
      type: "Phone Call",
      status: "scheduled",
      interviewer: "Mike Wilson",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Layout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Placement Portal</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore job opportunities and track your placement progress
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placementStats.map((stat, index) => {
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

        {/* Tabs */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex space-x-1">
            {[
              { id: "opportunities", label: "Job Opportunities", icon: Briefcase },
              { id: "interviews", label: "Interviews", icon: Calendar },
              { id: "documents", label: "Documents", icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "opportunities" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {jobOpportunities.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                    {job.status === "applied" ? "Applied" : "Open"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.posted}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.map((req, reqIndex) => (
                    <span
                      key={reqIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">{job.salary}</span>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Details</span>
                    </motion.button>
                    {job.status === "open" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Apply Now
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "interviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Interview Schedule</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {interviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className="p-6 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{interview.position}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{interview.company}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {interview.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {interview.interviewer}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(interview.status)}`}
                      >
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{interview.type}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "documents" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Placement Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Resume", status: "uploaded", date: "2024-01-10" },
                { name: "Cover Letter", status: "uploaded", date: "2024-01-10" },
                { name: "Portfolio", status: "pending", date: null },
                { name: "Certificates", status: "uploaded", date: "2024-01-08" },
              ].map((doc, index) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                      {doc.date && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Uploaded: {new Date(doc.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                      {doc.status === "uploaded" && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Download className="h-4 w-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  )
}

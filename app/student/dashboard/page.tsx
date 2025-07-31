"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { BookOpen, Calendar, CheckCircle, Clock, TrendingUp, Award } from "lucide-react"

export default function StudentDashboard() {
  const [studentInfo] = useState({
    name: "John Doe",
    batch: "React Development",
    trainer: "Sarah Johnson",
    attendancePercentage: 88,
    completedTasks: 12,
    totalTasks: 15,
    currentGrade: "A-",
  })

  const [upcomingTasks] = useState([
    { id: 1, title: "React Hooks Assignment", dueDate: "2024-01-28", status: "pending" },
    { id: 2, title: "Component Lifecycle Quiz", dueDate: "2024-01-30", status: "pending" },
    { id: 3, title: "Final Project Proposal", dueDate: "2024-02-05", status: "pending" },
  ])

  const [recentGrades] = useState([
    { task: "State Management Assignment", grade: "A", feedback: "Excellent work on Redux implementation" },
    { task: "JavaScript Fundamentals Quiz", grade: "B+", feedback: "Good understanding, minor improvements needed" },
    { task: "HTML/CSS Project", grade: "A-", feedback: "Great design, responsive layout implemented well" },
  ])

  const [attendanceData] = useState([
    { week: "Week 1", present: 3, total: 3 },
    { week: "Week 2", present: 2, total: 3 },
    { week: "Week 3", present: 3, total: 3 },
    { week: "Week 4", present: 3, total: 3 },
    { week: "Week 5", present: 2, total: 3 },
  ])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentInfo.name}!</h1>
            <p className="text-gray-600 mt-1">
              {studentInfo.batch} • Trainer: {studentInfo.trainer}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-2xl font-bold text-gray-900">{studentInfo.attendancePercentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {studentInfo.completedTasks}/{studentInfo.totalTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Grade</p>
                <p className="text-2xl font-bold text-gray-900">{studentInfo.currentGrade}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingTasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <a href="/student/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="/student/tasks"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View All Tasks
                </a>
              </div>
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Recent Grades</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{grade.task}</h4>
                      <span
                        className={`px-2 py-1 text-sm font-semibold rounded-full ${
                          grade.grade.startsWith("A")
                            ? "bg-green-100 text-green-800"
                            : grade.grade.startsWith("B")
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {grade.grade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{grade.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Attendance Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {attendanceData.map((week, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">{week.week}</div>
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">
                        {week.present}/{week.total}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{Math.round((week.present / week.total) * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href="/student/attendance"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Full Attendance Calendar
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/student/tasks"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Submit Assignment</h4>
                  <p className="text-sm text-gray-500">Upload your completed tasks</p>
                </div>
              </a>

              <a
                href="/student/attendance"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Calendar className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">View Attendance</h4>
                  <p className="text-sm text-gray-500">Check your attendance record</p>
                </div>
              </a>

              <a
                href="/student/payments"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Payment Status</h4>
                  <p className="text-sm text-gray-500">View payment history</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

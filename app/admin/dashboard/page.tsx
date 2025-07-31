"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Users, GraduationCap, ClipboardList, CreditCard, TrendingUp, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 245,
    totalTrainers: 18,
    totalBatches: 12,
    totalTasks: 89,
    totalPayments: 180000,
    activePlacements: 67,
  })

  const [attendanceData] = useState([
    { month: "Jan", rate: 85 },
    { month: "Feb", rate: 88 },
    { month: "Mar", rate: 92 },
    { month: "Apr", rate: 87 },
    { month: "May", rate: 90 },
    { month: "Jun", rate: 94 },
  ])

  const [taskCompletion] = useState([
    { batch: "React Batch 1", completed: 85, total: 100 },
    { batch: "Node.js Batch 2", completed: 92, total: 100 },
    { batch: "Python Batch 3", completed: 78, total: 100 },
    { batch: "Java Batch 4", completed: 88, total: 100 },
  ])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Trainers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTrainers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Batches</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBatches}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClipboardList className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalPayments.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Placements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activePlacements}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Rate Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Rate</h3>
            <div className="space-y-3">
              {attendanceData.map((data, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-8 text-sm text-gray-600">{data.month}</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data.rate}%` }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{data.rate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Completion Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Completion by Batch</h3>
            <div className="space-y-3">
              {taskCompletion.map((data, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-24 text-sm text-gray-600 truncate">{data.batch}</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${data.completed}%` }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{data.completed}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New student John Doe enrolled in React Batch 1</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Task "React Hooks Assignment" submitted by 15 students</span>
                <span className="text-xs text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Payment of ₹25,000 received from Jane Smith</span>
                <span className="text-xs text-gray-400">6 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New trainer Sarah Wilson added to Node.js Batch 2</span>
                <span className="text-xs text-gray-400">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

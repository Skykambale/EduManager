"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Users, ClipboardList, Calendar, CheckCircle, Clock, UserCheck } from "lucide-react"

export default function TrainerDashboard() {
  const [assignedBatches] = useState([
    { id: 1, name: "React Development", students: 25, schedule: "Mon-Wed-Fri 10:00-12:00", nextClass: "2024-01-25" },
    { id: 2, name: "Advanced JavaScript", students: 18, schedule: "Tue-Thu 14:00-16:00", nextClass: "2024-01-24" },
  ])

  const [recentTasks] = useState([
    {
      id: 1,
      title: "React Hooks Assignment",
      batch: "React Development",
      submissions: 20,
      total: 25,
      dueDate: "2024-01-26",
    },
    {
      id: 2,
      title: "JavaScript ES6 Quiz",
      batch: "Advanced JavaScript",
      submissions: 15,
      total: 18,
      dueDate: "2024-01-25",
    },
  ])

  const [todayAttendance] = useState([
    { batch: "React Development", present: 22, total: 25, percentage: 88 },
    { batch: "Advanced JavaScript", present: 16, total: 18, percentage: 89 },
  ])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Trainer Dashboard</h1>
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
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">43</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClipboardList className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">88%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Batches */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">My Batches</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignedBatches.map((batch) => (
                <div key={batch.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{batch.name}</h4>
                    <span className="text-sm text-gray-500">{batch.students} students</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Next class: {new Date(batch.nextClass).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <a
                      href="/trainer/attendance"
                      className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Take Attendance
                    </a>
                    <a
                      href="/trainer/tasks"
                      className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 text-sm"
                    >
                      Assign Task
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tasks & Today's Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <span className="text-xs text-gray-500">{task.batch}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Submissions: {task.submissions}/{task.total}
                      </div>
                      <div className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(task.submissions / task.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Attendance */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Today's Attendance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayAttendance.map((attendance, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{attendance.batch}</h4>
                      <span className="text-sm font-medium text-green-600">{attendance.percentage}%</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Present: {attendance.present}/{attendance.total} students
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${attendance.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
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
                href="/trainer/attendance"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <UserCheck className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Mark Attendance</h4>
                  <p className="text-sm text-gray-500">Take attendance for today's classes</p>
                </div>
              </a>

              <a
                href="/trainer/tasks"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ClipboardList className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Assign New Task</h4>
                  <p className="text-sm text-gray-500">Create and assign tasks to batches</p>
                </div>
              </a>

              <a
                href="/trainer/grading"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Grade Submissions</h4>
                  <p className="text-sm text-gray-500">Review and grade student submissions</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

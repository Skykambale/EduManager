"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Calendar, Check, X, Clock, TrendingUp } from "lucide-react"

export default function StudentAttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Mock attendance data
  const [attendanceData] = useState({
    totalClasses: 22,
    present: 19,
    absent: 2,
    late: 1,
    percentage: 86,
  })

  // Mock calendar data for the selected month
  const [calendarData] = useState([
    { date: 1, status: "present" },
    { date: 2, status: "present" },
    { date: 3, status: "absent" },
    { date: 5, status: "present" },
    { date: 8, status: "late" },
    { date: 9, status: "present" },
    { date: 10, status: "present" },
    { date: 12, status: "present" },
    { date: 15, status: "present" },
    { date: 16, status: "absent" },
    { date: 17, status: "present" },
    { date: 19, status: "present" },
    { date: 22, status: "present" },
    { date: 23, status: "present" },
    { date: 24, status: "present" },
    { date: 26, status: "present" },
    { date: 29, status: "present" },
    { date: 30, status: "present" },
    { date: 31, status: "present" },
  ])

  const [weeklyStats] = useState([
    { week: "Week 1", present: 3, total: 3, percentage: 100 },
    { week: "Week 2", present: 2, total: 3, percentage: 67 },
    { week: "Week 3", present: 3, total: 3, percentage: 100 },
    { week: "Week 4", present: 3, total: 3, percentage: 100 },
    { week: "Week 5", present: 2, total: 3, percentage: 67 },
  ])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-4 w-4 text-green-600" />
      case "absent":
        return <X className="h-4 w-4 text-red-600" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200"
      case "absent":
        return "bg-red-100 text-red-800 border-red-200"
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const attendanceRecord = calendarData.find((record) => record.date === day)
      const status = attendanceRecord?.status

      days.push(
        <div
          key={day}
          className={`h-12 flex items-center justify-center border rounded-lg relative ${
            status ? getStatusColor(status) : "bg-gray-50 border-gray-200"
          }`}
        >
          <span className="text-sm font-medium">{day}</span>
          {status && <div className="absolute top-1 right-1">{getStatusIcon(status)}</div>}
        </div>,
      )
    }

    return days
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceData.totalClasses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceData.present}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceData.absent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Percentage</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceData.percentage}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Attendance Calendar</h3>
              <div className="flex space-x-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded flex items-center justify-center">
                  <X className="h-3 w-3 text-red-600" />
                </div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded flex items-center justify-center">
                  <Clock className="h-3 w-3 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-600">Late</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Statistics */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Weekly Attendance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {weeklyStats.map((week, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="w-16 text-sm font-medium text-gray-900">{week.week}</span>
                    <span className="text-sm text-gray-600">
                      {week.present}/{week.total} classes
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          week.percentage >= 80
                            ? "bg-green-600"
                            : week.percentage >= 60
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }`}
                        style={{ width: `${week.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">{week.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Requirements */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Attendance Requirements</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Percentage:</span>
                    <span
                      className={`text-sm font-medium ${attendanceData.percentage >= 75 ? "text-green-600" : "text-red-600"}`}
                    >
                      {attendanceData.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Required Minimum:</span>
                    <span className="text-sm font-medium text-gray-900">75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`text-sm font-medium ${attendanceData.percentage >= 75 ? "text-green-600" : "text-red-600"}`}
                    >
                      {attendanceData.percentage >= 75 ? "Meeting Requirements" : "Below Requirements"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {attendanceData.percentage >= 75 ? (
                    <p>Great job! Keep maintaining regular attendance to stay above the minimum requirement.</p>
                  ) : (
                    <div>
                      <p className="text-red-600 mb-2">Your attendance is below the required 75%. Please:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Attend all upcoming classes</li>
                        <li>Contact your trainer if you have any issues</li>
                        <li>Make up for missed classes if possible</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

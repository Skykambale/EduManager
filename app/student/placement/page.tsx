"use client"

import { useState } from "react"
import Layout from "@/components/Layout"
import { Building, MapPin, Calendar, DollarSign, User, Mail, Phone, FileText, ExternalLink, Clock } from "lucide-react"

export default function StudentPlacementPage() {
  const [placementInfo] = useState({
    status: "PLACED", // PLACED, OFFERED, INTERVIEW, NOT_STARTED
    company: "Google",
    role: "Frontend Developer",
    package: 1200000,
    location: "Bangalore, India",
    joiningDate: "2024-03-01",
    offerDate: "2024-01-15",
    hrContact: {
      name: "Sarah Johnson",
      email: "sarah.johnson@google.com",
      phone: "+91 9876543210",
    },
  })

  const [placementHistory] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      status: "PLACED",
      date: "2024-01-15",
      package: 1200000,
      location: "Bangalore",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Full Stack Developer",
      status: "OFFERED",
      date: "2024-01-10",
      package: 1100000,
      location: "Hyderabad",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Software Engineer",
      status: "REJECTED",
      date: "2024-01-05",
      package: 1300000,
      location: "Chennai",
    },
  ])

  const [documents] = useState([
    { name: "Resume", status: "Approved", lastUpdated: "2024-01-10" },
    { name: "Cover Letter", status: "Pending Review", lastUpdated: "2024-01-12" },
    { name: "Portfolio", status: "Approved", lastUpdated: "2024-01-08" },
    { name: "Certificates", status: "Approved", lastUpdated: "2024-01-05" },
  ])

  const [upcomingInterviews] = useState([
    {
      id: 1,
      company: "Netflix",
      role: "React Developer",
      date: "2024-02-01",
      time: "10:00 AM",
      type: "Technical Round",
      interviewer: "John Smith",
    },
    {
      id: 2,
      company: "Spotify",
      role: "Frontend Engineer",
      date: "2024-02-03",
      time: "2:00 PM",
      type: "HR Round",
      interviewer: "Emily Davis",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-green-100 text-green-800"
      case "OFFERED":
        return "bg-blue-100 text-blue-800"
      case "INTERVIEW":
        return "bg-yellow-100 text-yellow-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      case "NOT_STARTED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Placement Status</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Current Placement Status */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Current Status</h3>
          </div>
          <div className="p-6">
            {placementInfo.status === "PLACED" ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-green-900">Congratulations! You're Placed!</h4>
                    <p className="text-green-700">You have been successfully placed at {placementInfo.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-green-800">
                      <Building className="h-5 w-5 mr-3" />
                      <div>
                        <span className="font-medium">Company:</span>
                        <span className="ml-2">{placementInfo.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-green-800">
                      <User className="h-5 w-5 mr-3" />
                      <div>
                        <span className="font-medium">Role:</span>
                        <span className="ml-2">{placementInfo.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-green-800">
                      <DollarSign className="h-5 w-5 mr-3" />
                      <div>
                        <span className="font-medium">Package:</span>
                        <span className="ml-2">₹{(placementInfo.package / 100000).toFixed(1)}L per annum</span>
                      </div>
                    </div>

                    <div className="flex items-center text-green-800">
                      <MapPin className="h-5 w-5 mr-3" />
                      <div>
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{placementInfo.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-green-800">
                      <Calendar className="h-5 w-5 mr-3" />
                      <div>
                        <span className="font-medium">Joining Date:</span>
                        <span className="ml-2">{new Date(placementInfo.joiningDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-green-800">
                      <Calendar className="h-5 w-5 mr-3" />
                      <div>
                        <span className="font-medium">Offer Date:</span>
                        <span className="ml-2">{new Date(placementInfo.offerDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h5 className="font-medium text-green-900 mb-2">HR Contact</h5>
                      <div className="space-y-1 text-sm text-green-800">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>{placementInfo.hrContact.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{placementInfo.hrContact.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{placementInfo.hrContact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Placement Process In Progress</h4>
                <p className="text-gray-600">We're working on finding the best opportunities for you.</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Interviews */}
        {upcomingInterviews.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Interviews</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{interview.company}</h4>
                          <p className="text-sm text-gray-600">{interview.role}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {interview.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span>{interview.interviewer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Placement History */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Application History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {placementHistory.map((placement) => (
                  <tr key={placement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{placement.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{placement.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{(placement.package / 100000).toFixed(1)}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{placement.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(placement.status)}`}
                      >
                        {placement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(placement.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Placement Documents</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getDocumentStatusColor(doc.status)}`}
                    >
                      {doc.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placement Support */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Placement Support</h3>
          <p className="text-blue-800 text-sm mb-4">
            Our placement team is here to help you throughout your job search journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Placement Coordinator</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Ms. Priya Sharma</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>placements@institute.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 9876543210</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Office Hours</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

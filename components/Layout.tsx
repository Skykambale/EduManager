"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Home,
  Users,
  GraduationCap,
  ClipboardList,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  BookOpen,
  Award,
  Calendar,
  DollarSign,
  Target,
  UserCheck,
  CreditCard,
  Briefcase,
  Sparkles,
} from "lucide-react"

interface User {
  email: string
  role: "admin" | "trainer" | "student"
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("theme")
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemDark)

    setDarkMode(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)

    // Check authentication
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch {
        localStorage.removeItem("user")
        router.push("/login")
        return
      }
    } else if (pathname !== "/login") {
      router.push("/login")
      return
    }

    setLoading(false)
  }, [router, pathname])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }

  const getNavItems = () => {
    if (!user) return []

    const base = [{ name: "Dashboard", href: `/${user.role}/dashboard`, icon: Home }]

    switch (user.role) {
      case "admin":
        return [
          ...base,
          { name: "Batches", href: "/admin/batches", icon: BookOpen },
          { name: "Students", href: "/admin/students", icon: Users },
          { name: "Trainers", href: "/admin/trainers", icon: Award },
          { name: "Attendance", href: "/admin/attendance", icon: Calendar },
          { name: "Tasks", href: "/admin/tasks", icon: ClipboardList },
          { name: "Payments", href: "/admin/payments", icon: DollarSign },
          { name: "Placements", href: "/admin/placements", icon: Target },
        ]
      case "trainer":
        return [
          ...base,
          { name: "Attendance", href: "/trainer/attendance", icon: UserCheck },
          { name: "Tasks", href: "/trainer/tasks", icon: ClipboardList },
          { name: "Grading", href: "/trainer/grading", icon: Award },
        ]
      default:
        return [
          ...base,
          { name: "Tasks", href: "/student/tasks", icon: ClipboardList },
          { name: "Attendance", href: "/student/attendance", icon: UserCheck },
          { name: "Payments", href: "/student/payments", icon: CreditCard },
          { name: "Placement", href: "/student/placement", icon: Briefcase },
        ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!user) return null

  const navItems = getNavItems()

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700 shadow-lg`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push(`/${user.role}/dashboard`)}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white text-sm" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sky Learners</h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </motion.div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex items-center w-full px-3 py-3 mb-1 text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-md ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            )
          })}

          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <div className="flex items-center justify-between h-16 px-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu className="h-6 w-6" />
            </motion.button>

            <div className="flex items-center space-x-4">
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <Bell className="h-5 w-5" />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-gray-700"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm font-medium">{user.email.charAt(0).toUpperCase()}</span>
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{user.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        >
          {children}
        </motion.main>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

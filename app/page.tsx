"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GraduationCap, Sparkles } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user")
      if (user) {
        try {
          const userData = JSON.parse(user)
          window.location.href = `/${userData.role}/dashboard`
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("user")
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
    }

    // Add a small delay to ensure localStorage is available
    const timeoutId = setTimeout(checkUser, 100)

    return () => clearTimeout(timeoutId)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <GraduationCap className="text-white text-2xl" />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
          animate={{
            background: ["linear-gradient(45deg, #3B82F6, #8B5CF6)", "linear-gradient(45deg, #8B5CF6, #3B82F6)"],
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Sky Learners
        </motion.h1>
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex justify-center"
        >
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your dashboard...</p>
      </motion.div>
    </div>
  )
}

"use client"

import { Mail, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

export default function SubscriptionBox() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    console.log("handleSubmit called with email:", email)
    
    if (!email || isSubmitting) {
      console.log("Early return - no email or already submitting")
      return
    }
    
    setIsSubmitting(true)
    setStatus(null)
    setMessage("")

    try {
      console.log("Making API call to /api/subscribe")
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      console.log("Response status:", response.status)
      
      const data = await response.json()
      console.log("Response data:", data)

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed! Check your email for confirmation.')
        setEmail("")
      } else {
        setStatus('error')
        if (data.details && data.details.title === 'Member Exists') {
          setMessage('This email is already subscribed.')
        } else {
          setMessage(data.error || 'Subscription failed. Please try again.')
        }
      }
    } catch (err) {
      console.error('Network error details:', err)
      setStatus('error')
      setMessage(`Network error: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center ">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Start Building
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-lg mx-auto">
          No clutter. No delays. No dev drama.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Your mail address"
              className="w-full pl-12 pr-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !email}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Getting Started..." : "Get Started"}
          </button>
        </div>

        {status && (
          <div className={`flex items-center justify-center gap-2 p-4 rounded-lg ${
            status === 'success' 
              ? 'bg-green-900/20 border border-green-700/30 text-green-400' 
              : 'bg-red-900/20 border border-red-700/30 text-red-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        )}


      </div>
    </div>
  )
}
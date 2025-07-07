"use client"

import type React from "react"
import { useState } from "react"
import type { MenteeSignupData } from "../types"

interface MenteeSignupFormCompleteProps {
  onBack: () => void
  onSubmit: (data: MenteeSignupData & { currentRole: string; companies: string }) => void
}

const MenteeSignupFormComplete = ({ onBack, onSubmit }: MenteeSignupFormCompleteProps) => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "",
    lookingFor: "Product Management",
    currentRole: "Senior Product Manager",
    companies: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <>
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px", color: "#1f2937" }}>
        Create Your Account
      </h2>
      <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "14px" }}>Enter your details</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Current Role</label>
          <input
            type="text"
            name="currentRole"
            className="form-input"
            placeholder="Senior Product Manager"
            value={formData.currentRole}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Companies</label>
          <input
            type="text"
            name="companies"
            className="form-input"
            placeholder="Google, Microsoft, etc."
            value={formData.companies}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
          Create Account
        </button>
      </form>
    </>
  )
}

export default MenteeSignupFormComplete

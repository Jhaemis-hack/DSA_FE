"use client"

import type React from "react"

import { useState } from "react"
import type { MenteeSignupData } from "../types"

interface MenteeSignupFormProps {
  onBack: () => void
  onSubmit: (data: MenteeSignupData) => void
}

const MenteeSignupForm = ({ onBack, onSubmit }: MenteeSignupFormProps) => {
  const [formData, setFormData] = useState<MenteeSignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    lookingFor: "",
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
              placeholder="John"
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
              placeholder="Doe"
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
            placeholder="john@example.com"
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
          <label className="form-label">What are you looking to learn?</label>
          <select
            name="lookingFor"
            className="form-select"
            value={formData.lookingFor}
            onChange={handleChange}
            required
          >
            <option value="">Select an area</option>
            <option value="Product Management">Product Management</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Leadership">Leadership</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
          Create Account
        </button>
      </form>
    </>
  )
}

export default MenteeSignupForm

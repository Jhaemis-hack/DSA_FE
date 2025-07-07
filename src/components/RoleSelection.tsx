"use client"

import type { UserRole } from "../types"

interface RoleSelectionProps {
  selectedRole: UserRole
  onRoleSelect: (role: UserRole) => void
  onContinue: () => void
}

const RoleSelection = ({ selectedRole, onRoleSelect, onContinue }: RoleSelectionProps) => {
  return (
    <>
      <button className="back-button">← Back</button>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px", color: "#1f2937" }}>
        Create Your Account
      </h2>
      <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "14px" }}>Choose your role</p>

      <div style={{ marginBottom: "24px" }}>
        <div
          className={`role-option ${selectedRole === "mentee" ? "selected" : ""}`}
          onClick={() => onRoleSelect("mentee")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "20px" }}>👤</div>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>I'm looking for a mentor</span>
          </div>
        </div>

        <div
          className={`role-option ${selectedRole === "mentor" ? "selected" : ""}`}
          onClick={() => onRoleSelect("mentor")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "20px" }}>⭐</div>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>I want to be a mentor</span>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onContinue} disabled={!selectedRole}>
        Continue
      </button>
    </>
  )
}

export default RoleSelection

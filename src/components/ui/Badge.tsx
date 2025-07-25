import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline"
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"

  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-200 text-gray-700",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return <span className={classes}>{children}</span>
}

export { Badge }

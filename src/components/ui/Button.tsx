import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
  const baseClasses = "btn"

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent",
    ghost: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export { Button }

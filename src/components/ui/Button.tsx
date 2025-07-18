import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "fire" | "good" | "danger"
  size?: "sm" | "md" | "lg" | "vs"
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
  const baseClasses = "btn"

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent",
    ghost: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
    fire: "bg-transparent text-gray-600 hover:text-neutral-100 hover:bg-red-400 ",
    good: "bg-green-600 text-white hover:text-neutral-100 hover:bg-green-400 ",
    danger: "bg-red-600 text-white hover:text-neutral-100 hover:bg-red-400 ",
  }

  const sizeClasses = {
    vs: "px-1 py-1 text-sm",
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

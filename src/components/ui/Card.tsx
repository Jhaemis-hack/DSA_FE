import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>{children}</div>
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
}

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription }

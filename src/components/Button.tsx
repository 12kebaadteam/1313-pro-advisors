import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'navy' | 'ghost' | 'cream'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-heading font-semibold transition-all duration-200 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  }

  const variantStyles = {
    primary:
      'bg-coral text-white hover:bg-coral-hover active:bg-coral-deep shadow-sm hover:shadow focus-visible:ring-coral focus-visible:ring-offset-cream',
    secondary:
      'bg-transparent text-navy border border-navy/20 hover:border-navy hover:bg-navy/5 active:bg-navy/10 focus-visible:ring-navy focus-visible:ring-offset-cream',
    navy:
      'bg-navy text-cream hover:bg-navy-light active:bg-navy-dark shadow-sm hover:shadow focus-visible:ring-navy focus-visible:ring-offset-cream',
    cream:
      'bg-cream text-navy hover:bg-white active:bg-cream-soft border border-cream-border focus-visible:ring-navy focus-visible:ring-offset-navy',
    ghost:
      'bg-transparent text-navy hover:text-coral hover:bg-navy/5 active:bg-navy/10 focus-visible:ring-navy',
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  )
}


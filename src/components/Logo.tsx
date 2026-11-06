import React from 'react'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
  showTagline?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showTagline = false
}) => {
  const isLight = variant === 'light'
  const textColor = isLight ? 'text-cream' : 'text-navy'
  const subtextColor = isLight ? 'text-cream/70' : 'text-navy/70'
  const badgeBg = isLight ? 'bg-cream/15 text-cream' : 'bg-navy text-cream'

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Geometric Mark */}
      <div className="relative flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
        <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
          {/* Background */}
          <rect width="44" height="44" rx="8" fill={isLight ? '#F4EDE0' : '#14213D'} />
          
          {/* '1' column */}
          <rect x="10" y="11" width="4.5" height="22" rx="1.5" fill={isLight ? '#14213D' : '#F4EDE0'} />
          
          {/* '3' structural geometry */}
          <path
            d="M18 12.5H27.5C29.9853 12.5 32 14.5147 32 17C32 18.8 30.8 20.3 29.2 21.1C31.5 21.9 33 24.1 33 26.8C33 30.2 30.2 32.5 26.5 32.5H18"
            stroke={isLight ? '#14213D' : '#F4EDE0'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Coral Signature Accent */}
          <circle cx="34.5" cy="32.5" r="3" fill="#FF6B5B" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-heading font-extrabold text-xl tracking-tight ${textColor}`}>
            1313
          </span>
          <span className={`font-heading font-semibold text-sm tracking-wider uppercase ${textColor}`}>
            Pro Advisors
          </span>
          <span className="text-[10px] font-bold tracking-widest text-coral uppercase ml-0.5">
            Ltd
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-1 ${subtextColor}`}>
            UK Business Administration
          </span>
        )}
      </div>
    </div>
  )
}


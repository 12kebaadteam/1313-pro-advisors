import React from 'react'
import { PageId, ServiceInfo } from '../types'
import { ArrowRight, BookOpen, Calculator, Clock, Briefcase, Check } from 'lucide-react'

interface ServiceCardProps {
  service: ServiceInfo
  index: number
  onNavigate: (page: PageId) => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onNavigate
}) => {
  const getIcon = () => {
    switch (service.id) {
      case 'bookkeeping':
        return <BookOpen className="w-5 h-5" />
      case 'payroll':
        return <Calculator className="w-5 h-5" />
      case 'timesheet-management':
        return <Clock className="w-5 h-5" />
      case 'back-office-services':
        return <Briefcase className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  // Asymmetric color distribution across the 4 cards:
  // Card 0: White card with Cream accents
  // Card 1: Warm Ivory card with Navy accents
  // Card 2: Navy card with Cream typography & Coral highlights (Featured)
  // Card 3: White card with clean borders
  const cardThemes = [
    {
      bg: 'bg-white',
      border: 'border-cream-border',
      text: 'text-navy',
      subtext: 'text-warmGrey',
      iconBg: 'bg-cream text-navy',
      tagBg: 'bg-cream text-navy',
      badge: 'Operational Foundation',
      isDark: false
    },
    {
      bg: 'bg-cream-ivory',
      border: 'border-cream-border',
      text: 'text-navy',
      subtext: 'text-warmGrey',
      iconBg: 'bg-navy/10 text-navy',
      tagBg: 'bg-white text-navy',
      badge: 'Workforce Remuneration',
      isDark: false
    },
    {
      bg: 'bg-navy',
      border: 'border-navy-light',
      text: 'text-cream',
      subtext: 'text-cream/70',
      iconBg: 'bg-navy-light text-coral',
      tagBg: 'bg-navy-light text-cream/90',
      badge: 'Hours Verification',
      isDark: true
    },
    {
      bg: 'bg-white',
      border: 'border-cream-border',
      text: 'text-navy',
      subtext: 'text-warmGrey',
      iconBg: 'bg-cream text-navy',
      tagBg: 'bg-cream text-navy',
      badge: 'Workflow Organisation',
      isDark: false
    }
  ]

  const theme = cardThemes[index % cardThemes.length]

  return (
    <div
      className={`relative group rounded-2xl p-7 transition-all duration-300 border ${theme.bg} ${theme.border} hover:-translate-y-1 hover:shadow-card flex flex-col justify-between`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${theme.iconBg}`}
          >
            {getIcon()}
          </div>
          <span
            className={`text-[11px] font-heading font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-transparent ${theme.tagBg}`}
          >
            {theme.badge}
          </span>
        </div>

        <h3 className={`text-xl font-heading font-bold mb-3 ${theme.text}`}>
          {service.title}
        </h3>

        <p className={`text-sm leading-relaxed mb-6 ${theme.subtext}`}>
          {service.shortDescription}
        </p>

        {/* Core Bullet points */}
        <div className="space-y-2 mb-8 pt-4 border-t border-cream-border/50">
          {service.coreActivities.slice(0, 3).map((activity, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                theme.isDark ? 'bg-navy-light text-coral' : 'bg-cream text-navy'
              }`}>
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className={`line-clamp-1 ${theme.isDark ? 'text-cream/80' : 'text-navy/80'}`}>
                {activity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-cream-border/40 flex items-center justify-between">
        <button
          onClick={() => onNavigate(service.id as PageId)}
          className={`inline-flex items-center gap-2 text-sm font-heading font-semibold transition-colors group/btn ${
            theme.isDark
              ? 'text-coral hover:text-white'
              : 'text-navy hover:text-coral'
          }`}
        >
          <span>Explore Service</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
        <span className={`text-[10px] font-mono uppercase tracking-widest ${theme.isDark ? 'text-cream/40' : 'text-warmGrey/60'}`}>
          0{index + 1}
        </span>
      </div>
    </div>
  )
}


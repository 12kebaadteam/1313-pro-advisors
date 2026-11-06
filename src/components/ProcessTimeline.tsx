import React from 'react'
import { ArrowRight, Search, Sliders, Play, LifeBuoy } from 'lucide-react'

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Understand Your Requirements',
      icon: <Search className="w-5 h-5" />,
      description:
        'We review your existing bookkeeping, payroll schedules, timesheet intake, and administrative routines to map your exact operational requirements.'
    },
    {
      num: '02',
      title: 'Organise the Process',
      icon: <Sliders className="w-5 h-5" />,
      description:
        'We establish structured workflows, secure document intake channels, and timetable milestones tailored to your business calendar.'
    },
    {
      num: '03',
      title: 'Manage the Work',
      icon: <Play className="w-5 h-5" />,
      description:
        'Our team directly executes daily bookkeeping, payroll cycle calculations, timesheet reviews, and back-office documentation with methodical precision.'
    },
    {
      num: '04',
      title: 'Provide Ongoing Support',
      icon: <LifeBuoy className="w-5 h-5" />,
      description:
        'We maintain regular administrative communication, provide reconciled records, and adapt operational capacity as your business evolves.'
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-cream border-t border-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-heading font-semibold uppercase tracking-wider mb-4 border border-cream-border">
            <span>Direct Operating Method</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy tracking-tight mb-4">
            How We Work Together
          </h2>
          <p className="text-warmGrey text-base leading-relaxed">
            A disciplined, four-stage approach designed to bring order, clarity, and continuity to your everyday business administration.
          </p>
        </div>

        {/* Timeline Grid: Desktop horizontal, Mobile vertical */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/4 left-12 right-12 h-0.5 bg-cream-border -z-0" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-cream-border hover:border-navy/40 transition-all duration-300 shadow-sm hover:shadow-card flex flex-col justify-between group z-10"
            >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading font-black text-2xl text-navy group-hover:text-coral transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-navy group-hover:bg-coral group-hover:text-white transition-colors duration-200">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-heading font-bold text-navy mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-warmGrey leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-border/60 flex items-center justify-between text-xs text-warmGrey">
                <span className="font-medium">Phase {idx + 1}</span>
                {idx < 3 ? (
                  <ArrowRight className="w-4 h-4 text-warmGrey/40 group-hover:text-coral transition-colors" />
                ) : (
                  <span className="text-coral font-semibold">Continuous</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}


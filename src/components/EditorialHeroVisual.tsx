import React from 'react'
import { CheckCircle2, Shield, Clock, FileCheck, Layers } from 'lucide-react'

export const EditorialHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none select-none">
      {/* Decorative background framing — hidden on mobile to prevent overflow and color bleeding */}
      <div className="hidden sm:block absolute -inset-4 bg-gradient-to-tr from-cream-soft via-cream-ivory to-cream rounded-3xl -rotate-1 border border-cream-border -z-10" />
      
      {/* Main architectural card container */}
      <div className="relative bg-white rounded-2xl border border-cream-border p-6 sm:p-8 shadow-card overflow-hidden">
        
        {/* Card Header with British Editorial Styling */}
        <div className="flex items-center justify-between pb-5 border-b border-cream-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center text-cream font-heading font-bold text-sm">
              13
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-navy">
                Operations Ledger
              </div>
              <div className="text-[11px] text-warmGrey">
                Direct UK Administrative Control
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream text-[11px] font-semibold text-navy border border-cream-border">
            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
            <span>Active Record</span>
          </div>
        </div>

        {/* Multi-tier Operational Data Visualization */}
        <div className="mt-6 space-y-4">
          
          {/* Row 1: Bookkeeping Ledger Entry */}
          <div className="p-4 rounded-xl bg-cream-ivory border border-cream-border/80 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-navy flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-coral" />
                <span>Financial Transaction Reconciliation</span>
              </span>
              <span className="text-[10px] font-mono text-warmGrey bg-white px-2 py-0.5 rounded border border-cream-border">
                REF: 1313-TXN
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="bg-white p-2 rounded-lg border border-cream-border">
                <div className="text-warmGrey text-[10px]">Ledger Entries</div>
                <div className="font-semibold text-navy text-xs mt-0.5">Verified Daily</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-cream-border">
                <div className="text-warmGrey text-[10px]">Audit Trail</div>
                <div className="font-semibold text-navy text-xs mt-0.5">Documented</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-cream-border">
                <div className="text-warmGrey text-[10px]">Status</div>
                <div className="font-semibold text-emerald-700 text-xs mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Complete
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Payroll & Timesheet Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Payroll Administration */}
            <div className="p-3.5 rounded-xl bg-white border border-cream-border hover:border-navy/30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-navy/10 flex items-center justify-center text-navy">
                  <Shield className="w-3.5 h-3.5 text-navy" />
                </div>
                <span className="text-xs font-heading font-semibold text-navy">Payroll Cycle</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-warmGrey">
                <div className="flex justify-between items-center">
                  <span>Cycle Schedule:</span>
                  <span className="font-medium text-navy">Monthly UK Cycle</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Records Handled:</span>
                  <span className="font-medium text-navy">Directly In-House</span>
                </div>
                <div className="w-full bg-cream-border/50 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-coral h-full w-4/5 rounded-full" />
                </div>
              </div>
            </div>

            {/* Timesheet Verification */}
            <div className="p-3.5 rounded-xl bg-white border border-cream-border hover:border-navy/30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-coral/10 flex items-center justify-center text-coral">
                  <Clock className="w-3.5 h-3.5 text-coral" />
                </div>
                <span className="text-xs font-heading font-semibold text-navy">Timesheets</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-warmGrey">
                <div className="flex justify-between items-center">
                  <span>Working Hours:</span>
                  <span className="font-medium text-navy">Reconciled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discrepancies:</span>
                  <span className="font-medium text-emerald-700">Zero Unresolved</span>
                </div>
                <div className="w-full bg-cream-border/50 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-navy h-full w-full rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Back-Office Coordination */}
          <div className="p-3.5 rounded-xl bg-navy text-cream flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-navy-light flex items-center justify-center text-coral">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-cream">
                  Back-Office Administrative Integrity
                </div>
                <div className="text-[11px] text-cream/70">
                  Organised workflow records &amp; operational filing
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-coral">
                Standard
              </div>
              <div className="text-xs font-semibold text-cream">Direct Care</div>
            </div>
          </div>
        </div>

        {/* Floating Confidence Badge */}
        <div className="absolute bottom-3 right-3 sm:-bottom-2 sm:-right-2 bg-coral text-white text-[11px] font-heading font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-1.5 sm:gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>UK Dedicated Team</span>
        </div>
      </div>
    </div>
  )
}


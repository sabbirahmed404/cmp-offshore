"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

// Types
type Seniority = "Junior" | "Mid" | "Senior" | "Lead"
type Duration = 1 | 3 | 6 | 12
type WorkModel = "Fixed team" | "Time & Materials" | "Retainer"
type Currency = "USD" | "Local"

interface Role {
  id: string
  name: string
  seniority: Seniority
  quantity: number
  monthlyRate: number
}

interface RoleTemplate {
  name: string
  defaultSeniority: Seniority
}

// Rate structure (example rates - editable)
const RATES = {
  BD: {
    Junior: 400,
    Mid: 800,
    Senior: 1500,
    Lead: 2500,
  },
  US: {
    Junior: 3000,
    Mid: 7000,
    Senior: 12000,
    Lead: 20000,
  },
}

// Default role templates
const ROLE_TEMPLATES: RoleTemplate[] = [
  { name: "Backend Engineer", defaultSeniority: "Mid" },
  { name: "Frontend Engineer", defaultSeniority: "Mid" },
  { name: "Full-stack Engineer", defaultSeniority: "Senior" },
  { name: "Mobile Engineer", defaultSeniority: "Mid" },
  { name: "Cloud Architect / DevOps", defaultSeniority: "Senior" },
  { name: "QA / Automation Engineer", defaultSeniority: "Mid" },
  { name: "UI/UX Designer", defaultSeniority: "Mid" },
  { name: "Product Manager", defaultSeniority: "Senior" },
  { name: "Data Scientist / ML Engineer", defaultSeniority: "Senior" },
  { name: "AI Engineer / LLM Specialist", defaultSeniority: "Senior" },
  { name: "Security Engineer", defaultSeniority: "Senior" },
  { name: "Technical Writer / Docs", defaultSeniority: "Mid" },
]

// Preset configurations
const PRESETS = [
  {
    name: "MVP Team",
    roles: [
      { name: "Backend Engineer", seniority: "Senior" as Seniority, quantity: 1 },
      { name: "Frontend Engineer", seniority: "Mid" as Seniority, quantity: 1 },
      { name: "UI/UX Designer", seniority: "Mid" as Seniority, quantity: 1 },
    ],
  },
  {
    name: "Scale Team",
    roles: [
      { name: "Backend Engineer", seniority: "Senior" as Seniority, quantity: 2 },
      { name: "Frontend Engineer", seniority: "Mid" as Seniority, quantity: 2 },
      { name: "Cloud Architect / DevOps", seniority: "Senior" as Seniority, quantity: 1 },
      { name: "QA / Automation Engineer", seniority: "Mid" as Seniority, quantity: 1 },
      { name: "Product Manager", seniority: "Senior" as Seniority, quantity: 1 },
    ],
  },
]

const CHART_COLORS = ["#FF8000", "#37322F", "#6B7280", "#9CA3AF", "#D1D5DB", "#E5E7EB", "#F3F4F6", "#F9FAFB"]

// Custom label renderer to ensure readable colors on dark background
const renderPieLabel = (props: any) => {
  const { x, y, index, payload } = props
  const sliceColor = CHART_COLORS[index % CHART_COLORS.length]
  // Default to white for readability on dark background
  let labelColor = "#FFFFFF"
  // If the slice is the orange one, use orange for the label
  if (sliceColor.toLowerCase() === "#ff8000") {
    labelColor = "#FF8000"
  }
  // For lighter gray slices, use a light gray label
  const graySet = new Set(["#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb", "#f3f4f6", "#f9fafb"])
  if (graySet.has(sliceColor.toLowerCase())) {
    labelColor = "#D1D5DB"
  }
  const name = (payload?.name || "").split(" ")[0]
  return (
    <text x={x} y={y} fill={labelColor} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {name}
    </text>
  )
}

export default function PricingSection() {
  const [duration, setDuration] = useState<Duration>(6)
  const [workModel, setWorkModel] = useState<WorkModel>("Fixed team")
  const [currency, setCurrency] = useState<Currency>("USD")
  const [showUSComparison, setShowUSComparison] = useState(true)
  const [roles, setRoles] = useState<Role[]>([])
  const [customRoleName, setCustomRoleName] = useState("")
  const [showAddRole, setShowAddRole] = useState(false)

  // Calculate costs
  const calculations = useMemo(() => {
    const monthlyCost = roles.reduce((sum, role) => {
      return sum + role.quantity * role.monthlyRate
    }, 0)

    const totalCost = monthlyCost * duration

    const usEquivalentMonthlyCost = roles.reduce((sum, role) => {
      const usRate = RATES.US[role.seniority]
      return sum + role.quantity * usRate
    }, 0)

    const usEquivalentTotalCost = usEquivalentMonthlyCost * duration

    const savings = usEquivalentTotalCost > 0 ? ((usEquivalentTotalCost - totalCost) / usEquivalentTotalCost) * 100 : 0

    return {
      monthlyCost,
      totalCost,
      usEquivalentMonthlyCost,
      usEquivalentTotalCost,
      savings,
    }
  }, [roles, duration])

  // Pie chart data
  const pieChartData = useMemo(() => {
    return roles
      .filter((role) => role.quantity > 0)
      .map((role) => ({
        name: role.name,
        value: role.quantity * role.monthlyRate,
      }))
  }, [roles])

  const addRole = (template: RoleTemplate) => {
    const newRole: Role = {
      id: `${template.name}-${Date.now()}`,
      name: template.name,
      seniority: template.defaultSeniority,
      quantity: 1,
      monthlyRate: RATES.BD[template.defaultSeniority],
    }
    setRoles([...roles, newRole])
  }

  const addCustomRole = () => {
    if (!customRoleName.trim()) return
    const newRole: Role = {
      id: `custom-${Date.now()}`,
      name: customRoleName,
      seniority: "Mid",
      quantity: 1,
      monthlyRate: RATES.BD.Mid,
    }
    setRoles([...roles, newRole])
    setCustomRoleName("")
    setShowAddRole(false)
  }

  const updateRole = (id: string, updates: Partial<Role>) => {
    setRoles(
      roles.map((role) => {
        if (role.id === id) {
          const updatedRole = { ...role, ...updates }
          // Update rate if seniority changed
          if (updates.seniority) {
            updatedRole.monthlyRate = RATES.BD[updates.seniority]
          }
          return updatedRole
        }
        return role
      })
    )
  }

  const removeRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const applyPreset = (preset: typeof PRESETS[0]) => {
    const newRoles = preset.roles.map((r) => ({
      id: `${r.name}-${Date.now()}-${Math.random()}`,
      name: r.name,
      seniority: r.seniority,
      quantity: r.quantity,
      monthlyRate: RATES.BD[r.seniority],
    }))
    setRoles(newRoles)
  }

  const exportPDF = () => {
    alert("PDF export functionality would be implemented here")
  }

  const exportCSV = () => {
    const csvContent = [
      ["Role", "Seniority", "Quantity", "Monthly Rate", "Total"],
      ...roles.map((r) => [r.name, r.seniority, r.quantity, r.monthlyRate, r.quantity * r.monthlyRate]),
      ["", "", "", "Total Monthly:", calculations.monthlyCost],
      ["", "", "", `Total ${duration} months:`, calculations.totalCost],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "team-estimate.csv"
    a.click()
  }

  return (
    <div id="pricing-section" className="w-full flex flex-col justify-center items-center gap-2">
      {/* Header Section */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-6 py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4 shadow-none">
          {/* Pricing Badge */}
          <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1V11M8.5 3H4.75C4.28587 3 3.84075 3.18437 3.51256 3.51256C3.18437 3.84075 3 4.28587 3 4.75C3 5.21413 3.18437 5.65925 3.51256 5.98744C3.84075 6.31563 4.28587 6.5 4.75 6.5H7.25C7.71413 6.5 8.15925 6.68437 8.48744 7.01256C8.81563 7.34075 9 7.78587 9 8.25C9 8.71413 8.81563 9.15925 8.48744 9.48744C8.15925 9.81563 7.71413 10 7.25 10H3.5"
                  stroke="#37322F"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
              Plans & Pricing
            </div>
          </div>

          {/* Title */}
          <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Transparent Pricing & Team Estimator
          </div>

          {/* Description */}
          <div className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans">
            Start with a free strategy session or build your custom team estimate with transparent, editable pricing.
          </div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="self-stretch border-b border-t border-[rgba(55,50,47,0.12)] flex justify-center items-center">
        <div className="flex justify-center items-start w-full">
          {/* Left Decorative Pattern */}
          <div className="w-12 self-stretch relative overflow-hidden hidden md:block">
            <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                ></div>
              ))}
            </div>
          </div>

          {/* Cards Container - Vertical Stack */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 py-12 px-6 max-w-7xl w-full">
            {/* Free Strategy & Consultation Card - Full Width */}
            <div className="w-full px-8 py-8 border border-[rgba(50,45,43,0.12)] border-[#E0DEDB] overflow-hidden bg-white rounded-lg">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 flex flex-col justify-start items-start gap-4">
                  {/* Free Badge */}
                  <div className="px-3 py-1 bg-[#FF8000] rounded-full">
                    <span className="text-white text-xs font-semibold uppercase tracking-wide">Free</span>
                </div>

                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="text-[rgba(55,50,47,0.90)] text-2xl font-semibold leading-8 font-sans">
                      Free Strategy & Consultation
                    </h3>
                    <p className="text-[rgba(41,37,35,0.70)] text-base font-normal leading-6 font-sans">
                      30 minute planning session,  hiring strategy, roadmap, and delivery plan at no charge.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:min-w-[280px]">
                  <button className="w-full px-6 py-3 bg-[#37322F] hover:bg-[#49423D] transition-colors shadow-[0px_2px_4px_rgba(55,50,47,0.12)] rounded-[99px] flex justify-center items-center">
                    <span className="text-[#FBFAF9] text-sm font-medium font-sans">Book Free Consultation</span>
                  </button>
                  <p className="text-center text-[#847971] text-xs font-normal leading-4 font-sans">
                    NDA available · No obligation
                  </p>
                    </div>
                  </div>
                </div>

            {/* Team Cost Estimator Card - Full Width */}
            <div className="w-full px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 bg-[#FAFAFA] border border-[rgba(50,45,43,0.12)] overflow-hidden flex flex-col justify-start items-start gap-4 sm:gap-6 md:gap-8 rounded-lg">
              <div className="self-stretch flex flex-col gap-2 sm:gap-3 md:gap-4">
                <h3 className="text-[rgba(55,50,47,0.90)] text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 font-sans">
                  Team Cost Estimator
                </h3>
                <p className="text-[rgba(41,37,35,0.70)] text-xs sm:text-sm font-normal leading-4 sm:leading-5 font-sans">
                  Configure roles, seniority, and duration to view instant, transparent cost estimates.
                </p>
            </div>

              {/* Quick Controls - Horizontal Layout */}
              <div className="self-stretch flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 items-start lg:items-end overflow-x-auto">
                {/* Duration Selector */}
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-[140px] sm:min-w-0">
                  <label className="text-[#37322F] text-xs sm:text-sm font-medium">Duration</label>
                  <div className="flex gap-1 sm:gap-2">
                    {([1, 3, 6, 12] as Duration[]).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                          duration === d
                            ? "bg-[#37322F] text-white border-[#37322F]"
                            : "bg-white text-[#605A57] border-[#E0DEDB] hover:border-[#37322F]"
                        }`}
                      >
                        {d} {d === 1 ? "mo" : "mos"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Model */}
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-[140px] sm:min-w-0">
                  <label className="text-[#37322F] text-xs sm:text-sm font-medium">Work Model</label>
                  <select
                    value={workModel}
                    onChange={(e) => setWorkModel(e.target.value as WorkModel)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-[#E0DEDB] rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
                  >
                    <option>Fixed team</option>
                    <option>Time & Materials</option>
                    <option>Retainer</option>
                  </select>
                </div>

                {/* Currency */}
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-[100px] sm:min-w-0">
                  <label className="text-[#37322F] text-xs sm:text-sm font-medium">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-[#E0DEDB] rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
                  >
                    <option>USD</option>
                    <option>Local</option>
                  </select>
                </div>

                {/* Presets */}
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-[180px] sm:min-w-0">
                  <label className="text-[#37322F] text-xs sm:text-sm font-medium">Quick Presets</label>
                  <div className="flex gap-1 sm:gap-2">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-[#E0DEDB] rounded-lg text-[10px] sm:text-xs font-medium text-[#605A57] hover:border-[#FF8000] hover:text-[#FF8000] transition-all whitespace-nowrap"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Role Chips */}
              {roles.length > 0 && (
                <div className="self-stretch flex flex-wrap gap-1.5 sm:gap-2">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white border border-[#E0DEDB] rounded-full flex items-center gap-1.5 sm:gap-2"
                    >
                      <span className="text-[10px] sm:text-xs font-medium text-[#37322F]">
                        {role.quantity}x {role.name} ({role.seniority})
                      </span>
                      <button
                        onClick={() => removeRole(role.id)}
                        className="text-[#9CA3AF] hover:text-[#37322F] transition-colors"
                        aria-label={`Remove ${role.name}`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                            stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Role Selection */}
              <div className="self-stretch flex flex-col gap-2 sm:gap-3">
                <label className="text-[#37322F] text-xs sm:text-sm font-medium">Add Team Members</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
                  {ROLE_TEMPLATES.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => addRole(template)}
                      className="px-2 sm:px-3 py-2 sm:py-2.5 bg-white border border-[#E0DEDB] rounded-lg text-left text-[10px] sm:text-xs text-[#37322F] hover:border-[#FF8000] hover:bg-[#FFF8F0] transition-all group"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium truncate">{template.name}</span>
                        <span className="text-[#FF8000] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">+</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* More Roles Dropdown */}
                {!showAddRole && (
                  <button
                    onClick={() => setShowAddRole(true)}
                    className="w-full px-4 py-2.5 border-2 border-dashed border-[#D1D5DB] rounded-lg text-sm font-medium text-[#6B7280] hover:border-[#FF8000] hover:text-[#FF8000] transition-all"
                  >
                    + Add Custom Role
                  </button>
                )}

                {showAddRole && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customRoleName}
                      onChange={(e) => setCustomRoleName(e.target.value)}
                      placeholder="Enter role name..."
                      className="flex-1 px-3 py-2 bg-white border border-[#E0DEDB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
                      onKeyDown={(e) => e.key === "Enter" && addCustomRole()}
                    />
                    <button
                      onClick={addCustomRole}
                      className="px-4 py-2 bg-[#FF8000] text-white rounded-lg text-sm font-medium hover:bg-[#E67300] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddRole(false)
                        setCustomRoleName("")
                      }}
                      className="px-4 py-2 bg-white border border-[#E0DEDB] text-[#6B7280] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Role Cards - More Compact */}
              {roles.length > 0 && (
                <div className="self-stretch flex flex-col gap-2 sm:gap-3">
                  <label className="text-[#37322F] text-xs sm:text-sm font-medium">Team Configuration</label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="p-2 sm:p-3 bg-white border border-[#E0DEDB] rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3"
                      >
                        <div className="flex-1 min-w-0 w-full sm:w-auto">
                          <h4 className="text-[10px] sm:text-xs font-semibold text-[#37322F] truncate">{role.name}</h4>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
                          {/* Seniority Dropdown */}
                          <select
                            value={role.seniority}
                            onChange={(e) => updateRole(role.id, { seniority: e.target.value as Seniority })}
                            className="px-1.5 sm:px-2 py-1 bg-white border border-[#E0DEDB] rounded text-[10px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF8000] flex-shrink-0"
                          >
                            <option>Junior</option>
                            <option>Mid</option>
                            <option>Senior</option>
                            <option>Lead</option>
                          </select>

                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-0 bg-white border border-[#E0DEDB] rounded flex-shrink-0">
                            <button
                              onClick={() => updateRole(role.id, { quantity: Math.max(0, role.quantity - 1) })}
                              className="px-1.5 sm:px-2 py-1 text-[#6B7280] hover:text-[#37322F] hover:bg-gray-50 transition-colors text-[10px] sm:text-xs"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-1.5 sm:px-2 text-[10px] sm:text-xs font-medium text-[#37322F] min-w-[1.5ch] text-center">
                              {role.quantity}
                            </span>
                            <button
                              onClick={() => updateRole(role.id, { quantity: Math.min(20, role.quantity + 1) })}
                              className="px-1.5 sm:px-2 py-1 text-[#6B7280] hover:text-[#37322F] hover:bg-gray-50 transition-colors text-[10px] sm:text-xs"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Monthly Rate */}
                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            <span className="text-[10px] sm:text-xs text-[#6B7280]">$</span>
                            <input
                              type="number"
                              value={role.monthlyRate}
                              onChange={(e) =>
                                updateRole(role.id, { monthlyRate: Math.max(0, parseInt(e.target.value) || 0) })
                              }
                              className="w-12 sm:w-16 px-1 py-1 bg-white border border-[#E0DEDB] rounded text-[10px] sm:text-xs text-right focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
                            />
                            <button
                              className="text-[#9CA3AF] hover:text-[#37322F]"
                              title="Example rate — click to edit"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
                                <path d="M7 10V7M7 4V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
              )}

              {/* Live Summary Panel - Larger */}
              {roles.length > 0 && (
                <div className="self-stretch p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#37322F] to-[#49423D] rounded-lg flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 text-white overflow-hidden">
                  {/* Cost Summary - Expanded */}
                  <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6 min-w-0">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold">Cost Summary</h4>
                    <div className="flex flex-col gap-2 sm:gap-3 md:gap-5">
                      <div className="flex justify-between items-baseline p-2 sm:p-3 md:p-4 bg-[rgba(255,255,255,0.05)] rounded-lg flex-wrap gap-2">
                        <span className="text-xs sm:text-sm md:text-base text-[#D2C6BF]">Monthly Cost:</span>
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold">${calculations.monthlyCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-baseline p-3 sm:p-4 md:p-5 bg-[rgba(255,128,0,0.1)] rounded-lg border-2 border-[#FF8000] flex-wrap gap-2">
                        <div className="flex flex-col gap-0.5 sm:gap-1">
                          <span className="text-sm sm:text-base md:text-lg text-[#D2C6BF]">Total for {duration} months:</span>
                          <span className="text-[10px] sm:text-xs text-[#B2AEA9]">{duration} × ${calculations.monthlyCost.toLocaleString()}/mo</span>
                  </div>
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF8000] break-all">
                          ${calculations.totalCost.toLocaleString()}
                        </span>
                </div>

                      {showUSComparison && calculations.usEquivalentMonthlyCost > 0 && (
                        <>
                          <div className="h-px bg-[rgba(255,255,255,0.1)] my-1 sm:my-2"></div>
                          <div className="flex justify-between items-baseline p-2 sm:p-3 md:p-4 bg-[rgba(255,255,255,0.03)] rounded-lg flex-wrap gap-2">
                            <span className="text-xs sm:text-sm md:text-base text-[#D2C6BF]">US Equivalent:</span>
                            <span className="text-lg sm:text-xl md:text-2xl text-[#D2C6BF] line-through break-all">
                              ${calculations.usEquivalentTotalCost.toLocaleString()}
                      </span>
                          </div>
                          <div className="p-3 sm:p-4 md:p-5 bg-[rgba(255,128,0,0.2)] rounded-lg border-2 border-[rgba(255,128,0,0.4)]">
                            <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-2">
                              <span className="text-sm sm:text-base md:text-lg font-semibold">You save:</span>
                              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FF8000]">
                                ~{Math.round(calculations.savings)}%
                      </span>
                    </div>
                            <div className="h-2 sm:h-3 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#FF8000] transition-all duration-500"
                                style={{ width: `${calculations.savings}%` }}
                              ></div>
                            </div>
                            <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-[#D2C6BF] break-words">
                              That's ${(calculations.usEquivalentTotalCost - calculations.totalCost).toLocaleString()} in savings
                    </div>
                  </div>
                        </>
                      )}
                </div>

                    {/* Compare Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer p-2 sm:p-3 bg-[rgba(255,255,255,0.05)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                      <input
                        type="checkbox"
                        checked={showUSComparison}
                        onChange={(e) => setShowUSComparison(e.target.checked)}
                        className="w-4 h-4 sm:w-5 sm:h-5 accent-[#FF8000] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm md:text-base text-[#D2C6BF]">Show US equivalent comparison</span>
                    </label>
                  </div>

                  {/* Pie Chart - Responsive */}
                  {pieChartData.length > 0 && (
                    <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4 min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[350px] min-w-0">
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">Cost Breakdown by Role</h4>
                      <div className="flex-1 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                          <PieChart>
                            <Pie
                              data={pieChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius="35%"
                              outerRadius="65%"
                              paddingAngle={2}
                              dataKey="value"
                              label={renderPieLabel}
                              labelLine={false}
                            >
                              {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: number) => [`$${value.toLocaleString()}`, "Monthly Cost"]}
                              contentStyle={{
                                backgroundColor: "#37322F",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "8px",
                                color: "#FFFFFF",
                                padding: "12px",
                              }}
                              labelStyle={{
                                color: "#FFFFFF",
                                fontWeight: "600",
                                marginBottom: "4px",
                              }}
                              itemStyle={{
                                color: "#FFFFFF",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                </div>
                  )}
              </div>
              )}

              {/* Action Buttons - hidden per request */}

              {/* CTA for empty state */}
              {roles.length === 0 && (
                <div className="self-stretch p-8 border-2 border-dashed border-[#D1D5DB] rounded-lg flex flex-col items-center justify-center gap-3 text-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#F3F4F6" />
                    <path
                      d="M24 18V30M18 24H30"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <h4 className="text-[#37322F] font-semibold mb-1">Build Your Team</h4>
                    <p className="text-sm text-[#6B7280]">
                      Add roles above or try a preset to see instant cost estimates
                    </p>
                    </div>
                  </div>
              )}

              {/* Bottom CTA - hidden per request */}

              {/* Footer Microcopy */}
              <p className="text-[#9CA3AF] text-xs leading-5 text-center">
                All numbers are estimates. Final pricing depends on scope, SLAs, and seniority. NDA available.
              </p>
            </div>
          </div>

          {/* Right Decorative Pattern */}
          <div className="w-12 self-stretch relative overflow-hidden hidden md:block">
            <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

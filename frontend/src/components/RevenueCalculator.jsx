import { useId, useMemo, useState } from 'react'
import { problem } from '../data/content'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import Reveal from './Reveal'

const WEEKS_PER_MONTH = 4.345

function formatCurrency(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

function Slider({ id, label, value, onChange, min, max, step, prefix, suffix }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <span className="text-lg font-semibold text-gold-500">
          {prefix}
          {value.toLocaleString('en-US')}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-navy-700 accent-gold-500"
      />
    </div>
  )
}

export default function RevenueCalculator() {
  const { inputs, outputLabels, disclaimer } = problem.calculator
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(inputs.missedCallsPerWeek.default)
  const [avgJobValue, setAvgJobValue] = useState(inputs.avgJobValue.default)
  const [bookElsewherePct, setBookElsewherePct] = useState(inputs.bookElsewherePct.default)

  const idPrefix = useId()

  const { monthlyLoss, yearlyLoss } = useMemo(() => {
    const missedPerMonth = missedCallsPerWeek * WEEKS_PER_MONTH
    const jobsLostPerMonth = missedPerMonth * (bookElsewherePct / 100)
    const monthly = Math.round(jobsLostPerMonth * avgJobValue)
    return { monthlyLoss: monthly, yearlyLoss: monthly * 12 }
  }, [missedCallsPerWeek, avgJobValue, bookElsewherePct])

  const animatedMonthly = useAnimatedNumber(monthlyLoss)
  const animatedYearly = useAnimatedNumber(yearlyLoss)

  return (
    <Reveal delay={0.1} className="mt-16">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-navy-800 to-navy-900 p-6 shadow-2xl shadow-black/40 sm:p-10">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {problem.calculator.title}
          </h3>
          <p className="mt-2 text-slate-400">{problem.calculator.subtitle}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-8">
            <Slider
              id={`${idPrefix}-missed-calls`}
              label={inputs.missedCallsPerWeek.label}
              value={missedCallsPerWeek}
              onChange={setMissedCallsPerWeek}
              min={inputs.missedCallsPerWeek.min}
              max={inputs.missedCallsPerWeek.max}
              step={inputs.missedCallsPerWeek.step}
            />
            <Slider
              id={`${idPrefix}-job-value`}
              label={inputs.avgJobValue.label}
              value={avgJobValue}
              onChange={setAvgJobValue}
              min={inputs.avgJobValue.min}
              max={inputs.avgJobValue.max}
              step={inputs.avgJobValue.step}
              prefix={inputs.avgJobValue.prefix}
            />
            <Slider
              id={`${idPrefix}-book-elsewhere`}
              label={inputs.bookElsewherePct.label}
              value={bookElsewherePct}
              onChange={setBookElsewherePct}
              min={inputs.bookElsewherePct.min}
              max={inputs.bookElsewherePct.max}
              step={inputs.bookElsewherePct.step}
              suffix={inputs.bookElsewherePct.suffix}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-gold-500/20 bg-navy-950/60 p-6 text-center sm:p-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
                {outputLabels.monthly}
              </p>
              <p
                className="mt-1 text-4xl font-bold tracking-tight text-gold-500 sm:text-5xl"
                aria-live="polite"
              >
                {formatCurrency(animatedMonthly)}
              </p>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
                {outputLabels.yearly}
              </p>
              <p
                className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl"
                aria-live="polite"
              >
                {formatCurrency(animatedYearly)}
              </p>
            </div>
            <p className="mt-2 text-xs text-slate-500">{disclaimer}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

import { useState } from 'react'
import { Bot, Check } from 'lucide-react'
import { Link } from 'react-router'
import Step1 from './Step1'
import Step2 from './Step2'

const STEPS = [
  { id: 1, label: 'Restaurant Details' },
  { id: 2, label: 'Menu Upload' },
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AIWaiter</span>
        </Link>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep > step.id
                      ? 'bg-orange-500 text-white'
                      : currentStep === step.id
                      ? 'bg-orange-500/20 border-2 border-orange-500 text-orange-400'
                      : 'bg-white/5 border border-white/10 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    currentStep >= step.id ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-20 mx-2 mb-5 transition-all duration-500 ${
                    currentStep > step.id ? 'bg-orange-500' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        {currentStep === 1 && <Step1 onNext={() => setCurrentStep(2)} />}
        {currentStep === 2 && <Step2 onBack={() => setCurrentStep(1)} />}
      </div>
    </div>
  )
}

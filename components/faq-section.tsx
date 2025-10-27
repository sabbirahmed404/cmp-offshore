"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What services do you provide?",
    answer:
      "Managed offshore development, AI automation and agents, SaaS, ERP CRM, low code solutions, and microservices.",
  },
  {
    question: "How does your pricing compare to U.S. teams?",
    answer:
      "Typical savings of 70 to 80% vs equivalent U.S. engineering rates, depending on scope and seniority.",
  },
  {
    question: "How do you ensure code quality and delivery?",
    answer:
      "U.S. grade processes: code reviews, CI/CD pipelines, automated tests, and scheduled demo milestones.",
  },
  {
    question: "Who will manage my project day to day?",
    answer:
      "A dedicated project manager timezone aligned plus engineering leads and QA. We handle hiring and coordination.",
  },
  {
    question: "How do you handle timezones and communication?",
    answer:
      "We align overlapping hours, provide Slack or Teams channels, weekly reports, and async updates for U.S. business hours.",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer:
      "Yes. We integrate with most stacks including cloud, CI, databases, and LLMs. We adapt to your tooling and standards.",
  },
  {
    question: "What about IP ownership and code rights?",
    answer:
      "All IP and deliverables are transferred to you under the contract. Full ownership is guaranteed.",
  },
  {
    question: "How do you secure our data and systems?",
    answer:
      "Secure by default practices: encrypted transport, secrets management, access control, and optional audits and pen tests.",
  },
  {
    question: "Do you comply with privacy and industry standards?",
    answer:
      "We can implement GDPR, SOC 2, and other compliance controls as part of scope or via add on engagements.",
  },
  {
    question: "Can I start with a pilot or short engagement?",
    answer:
      "Yes. We recommend a 4 to 8 week pilot to validate fit, deliverables, and processes before scale up.",
  },
  {
    question: "What is your hiring and retention approach?",
    answer:
      "We hire senior developers and provide continuous training, competitive compensation, and client embedded workflows to reduce churn.",
  },
  {
    question: "How do you price projects fixed T&M or retainer?",
    answer:
      "We offer flexible models: fixed price for well defined scopes, T&M for evolving work, and monthly retainers for long term teams.",
  },
  {
    question: "Will I have direct access to engineers?",
    answer:
      "Yes. You will get direct channels to engineers plus a single point of contact for coordination.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Onboarding typically takes 1 to 3 weeks for discovery, access, kickoff, and first sprint planning.",
  },
  {
    question: "How do you handle support and maintenance?",
    answer:
      "We provide SLA based support plans, bug fix windows, and optional 24/7 monitoring and incident response.",
  },
  {
    question: "Can you share case studies or references?",
    answer:
      "Absolutely. We will provide relevant case studies and client references tailored to your industry on request. Mail us at Admin@codemypixel.com",
  },
]

// Hide selected questions without deleting the source data
const hiddenQuestions = new Set<string>([
  "How do you secure our data and systems?",
  "How does your pricing compare to U.S. teams?",
  "Do you comply with privacy and industry standards?",
  "How do you handle support and maintenance?",
  "How long does onboarding take?",
])

const visibleFaqData = faqData.filter((item) => !hiddenQuestions.has(item.question))

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-foreground font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-muted-foreground text-base font-normal leading-7 font-sans">
            Get answers to common questions about our offshore
            <br className="hidden md:block" />
            development services and processes.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {visibleFaqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-border/16 overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-foreground/2 transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-foreground text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-muted-foreground/60 transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-muted-foreground text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

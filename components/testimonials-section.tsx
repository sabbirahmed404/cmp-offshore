"use client"

import { useState, useEffect } from "react"
import type React from "react"

// Badge component for consistency
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      quote:
        "Working with CodeMyPixel has been a game-changer. Their communication is clear, consistent, and proactive — and they truly treat your project like it's their own. The team doesn't just follow instructions, they bring creative insight, structure, and solutions that elevate the entire build. They're honest, hard-working, and deeply committed to delivering real value.",
      name: "Stephen Smith",
      country: "USA",
      time: "5 months ago",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2011_01_05%20AM-TBOe92trRxKn4G5So1m9D2h7LRH4PG.png",
    },
    {
      quote:
        "A great addition to any team with in-depth experience on many levels. Life Saver. Thanks again. The team comes highly recommended as I will continue working with CodeMyPixel.",
      name: "Ajani Rudisill",
      country: "USA",
      time: "10 months ago",
      image: "/testimonials-avatar/ajani.png",
    },
    {
      quote:
        "CodeMyPixel was a pleasure to work with on our website development project. Their professionalism shone through in the quality of their work, and they consistently delivered on time while maintaining proactive communication. Highly recommend! 👍",
      name: "Mathewh Iatt",
      country: "USA",
      time: "6 months ago",
      image: "/testimonials-avatar/Mathewh Iatt.png",
    },
    {
      quote:
        "Amazing work done here! Exceeded expectations. The team worked very hard and put their heart into it. They tried everything to make things work and in the end it did work. Thank you so much for this order! Will work together again for sure.",
      name: "Romeo Lombardi",
      country: "Romania",
      time: "4 months ago",
      image: "/testimonials-avatar/Romeo Lombardi.png",
    },
    {
      quote:
        "CodeMyPixel truly excelled with their work, demonstrating incredible professionalism and an unparalleled attention to detail that EXCEEDED all expectations. Working alongside them felt seamless thanks to their proactive communication and deep understanding of the project's nuances. Highly recommended!",
      name: "Sandeep Rudra",
      country: "Germany",
      time: "7 months ago",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Sep%2011%2C%202025%2C%2010_54_18%20AM-nbiecp92QNdTudmCrHr97uekrIPzCP.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveTestimonial((prev: number) => (prev + 1) % testimonials.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 300)
    }, 12000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNavigationClick = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTestimonial(index)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  return (
    <div className="w-full border-b border-border flex flex-col justify-center items-center">
      {/* Testimonial Content */}
      <div className="self-stretch px-2 overflow-hidden h-[560px] md:h-[470px] flex justify-start items-center bg-background border border-b border-l-0 border-r-0 border-t-0">
        <div className="flex-1 py-16 md:py-17 h-full min-h-0 flex flex-col md:flex-row justify-center items-center md:items-end gap-6">
          <div className="self-stretch px-3 md:px-12 justify-center items-center md:items-start gap-4 flex flex-col md:flex-row min-h-0">
            <img
              className="w-48 h-50 md:w-48 md:h-50 rounded-lg object-cover transition-all duration-700 ease-in-out mx-auto md:mx-0 self-center md:self-auto"
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transform: isTransitioning ? "scale(0.95)" : "scale(1)",
                transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
              }}
              src={testimonials[activeTestimonial].image || "/placeholder.svg"}
              alt={testimonials[activeTestimonial].name}
            />
            <div className="flex-1 px-6 py-6 shadow-[0px_0px_0px_0.75px_rgba(50,45,43,0.12)] overflow-y-auto h-full min-h-0 flex flex-col justify-start items-start gap-6 shadow-none pb-0 pt-0">
              <div
                className="self-stretch justify-start flex flex-col text-foreground text-[17px] md:text-[23px] font-medium leading-[29px] md:leading-[31px] font-sans transition-all duration-700 ease-in-out tracking-tight"
                style={{
                  filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  transition: "filter 0.7s ease-in-out",
                }}
              >
                "{testimonials[activeTestimonial].quote}"
              </div>
              <div
                className="self-stretch flex flex-col justify-start items-start gap-1 transition-all duration-700 ease-in-out"
                style={{
                  filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  transition: "filter 0.7s ease-in-out",
                }}
              >
                <div className="self-stretch justify-center flex flex-col text-foreground/90 text-lg font-medium leading-[26px] font-sans">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="self-stretch justify-center flex flex-col text-foreground/70 text-lg font-medium leading-[26px] font-sans">
                  {testimonials[activeTestimonial].country} • {testimonials[activeTestimonial].time}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="pr-6 justify-start items-start gap-[14px] flex">
            <button
              onClick={() => handleNavigationClick((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-border justify-center items-center gap-2 flex hover:bg-muted transition-colors"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            <button
              onClick={() => handleNavigationClick((activeTestimonial + 1) % testimonials.length)}
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-border justify-center items-center gap-2 flex hover:bg-muted transition-colors"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

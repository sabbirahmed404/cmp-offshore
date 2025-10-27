"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

export default function CalEmbed() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
      })
    })()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Cal
        namespace="30min"
        calLink="sabbir-ahmed-f0ojt1/30min"
        style={{
          width: "100%",
          height: "600px",
          overflow: "auto",
        }}
        config={{
          layout: "month_view",
          theme: "light",
        }}
      />
    </div>
  )
}

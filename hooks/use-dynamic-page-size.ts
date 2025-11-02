"use client"

import * as React from "react"

export function useDynamicPageSize() {
  const [pageSize, setPageSize] = React.useState(10)

  React.useEffect(() => {
    const calculatePageSize = () => {
      // Calculate based on viewport height
      // Assuming each row is approximately 60px and accounting for header, footer, etc.
      const viewportHeight = window.innerHeight
      const headerHeight = 200 // Approximate height of header, filters, etc.
      const footerHeight = 100 // Pagination footer
      const availableHeight = viewportHeight - headerHeight - footerHeight
      const rowHeight = 60 // Approximate row height
      
      const calculatedSize = Math.floor(availableHeight / rowHeight)
      
      // Set minimum of 5 and maximum of 50
      const size = Math.max(5, Math.min(50, calculatedSize))
      setPageSize(size)
    }

    calculatePageSize()
    
    // Recalculate on window resize
    window.addEventListener("resize", calculatePageSize)
    return () => window.removeEventListener("resize", calculatePageSize)
  }, [])

  return pageSize
}


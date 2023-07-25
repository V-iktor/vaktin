import { useState, useEffect, useMemo } from "react"
import { format_currency, format_score } from "../utils"
import { CpuRow, RetailerDetails, retailers } from "../cpus"

const breakpoint = 600

type CpuProps = {
  element: CpuRow
}

export const CpuDataRow = ({
  element,
  multicore,
}: CpuProps & {
  multicore?: boolean
}) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > breakpoint : true
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const mql: MediaQueryList = window.matchMedia(
      `(min-width: ${breakpoint}px)`
    )

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)

    mql.addEventListener("change", handler)

    return () => {
      mql.removeEventListener("change", handler)
    }
  }, [])

  const lowestPrice = useMemo(() => {
    return Math.min(
      ...retailers.map((retailer) =>
        element[retailer] ? element[retailer]!.price : Number.MAX_SAFE_INTEGER
      )
    )
  }, [element])

  return (
    <>
      {!isDesktop && (
        <tr>
          <td className="name-mobile" colSpan={retailers.length - 1}>
            {element.full_name}
          </td>
          <td className="score">
            {format_score(
              multicore ? element.score_multi_core : element.score_single_core
            )}
            stig
          </td>
        </tr>
      )}

      <tr>
        <td className="desktop-cell">
          <div className="name">{element.full_name}</div>
        </td>
        {retailers.map((retailer) => (
          <td key={retailer}>
            {Object.keys(element).includes(retailer) && (
              <Price element={element[retailer]!} lowest={lowestPrice} />
            )}
          </td>
        ))}
        <td className="desktop-cell">
          <div className="score">
            {format_score(
              multicore ? element.score_multi_core : element.score_single_core
            )}
          </div>
        </td>
      </tr>
    </>
  )
}

const getClassName = (price: number, lowest: number) => {
  const range = 1.02
  const near_lowest = lowest * range
  if (price === lowest) return "lowest"
  else if (price < near_lowest) return "low"
  return "normal"
}

const Price = ({
  element,
  lowest,
}: {
  element: RetailerDetails
  lowest: number
}) => {
  return (
    <a href={element.url} target="_blank">
      <div className={getClassName(element.price, lowest)}>
        {format_currency(element.price)}
      </div>
    </a>
  )
}

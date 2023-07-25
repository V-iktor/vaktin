import {useState,useEffect} from "react"
import { format_currency, format_score } from "../utils";
import { retailers } from "../cpus";
import styles from "./page.module.css";

const breakpoint = 600;

export const CpuDataRow = ({
  element,
  multicore,
}: {
  element: CpuDataRow;
  multicore?: boolean;
}) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);
  let lowest = Number.MAX_SAFE_INTEGER;

  retailers.forEach((retailer) => {
    if (!Object.keys(element[1]).includes(retailer)) return;
    const price = element[1][retailer].price;
    if (lowest > price) lowest = price;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    
    const handler = e => setIsDesktop(e.matches);
    
    mql.addEventListener('change', handler);
    
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return (
    <>
{!isDesktop && 
<tr>
  <td className="name-mobile"  colspan={retailers.length-1}>{element[1].full_name}</td>
  <td className="score" >          {format_score(
            multicore
            ? element[1].score_multi_core
            : element[1].score_single_core
            )} stig</td>
</tr>
    }

    <tr key={element[0]}>
      <td className="desktop-cell">
        <div className="score">
          {format_score(
            multicore
            ? element[1].score_multi_core
            : element[1].score_single_core
            )}
        </div>
      </td>
      <td className="desktop-cell">
        <div className="name">{element[1].full_name}</div>
      </td>
      {retailers.map((retailer) => (
        <td>
          {Object.keys(element[1]).includes(retailer) && (
            <Price element={element[1][retailer]} lowest={lowest} />
            )}
        </td>
      ))}
    </tr>
    </>
  );
};

const getClassName = (price: Number, lowest: Number) => {
  const range = 1.02;
  const near_lowest = lowest * range;
  if (price === lowest) return "lowest";
  else if (price < near_lowest) return "low";
  return "normal";
};

const Price = ({ element, lowest }) => {
  return (
    <a href={element.url} target="_blank">
      <div className={getClassName(element.price, lowest)}>
        {format_currency(element.price)}
      </div>
    </a>
  );
};

"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { cpus } from "./cpus";
import { CpuDataRow } from "./components/cpu-data-row";
import { Checkbox } from "./components/checkbox";
import { useState } from "react";
const single_sort = (a, b) =>
  Number(b[1].score_single_core) - Number(a[1].score_single_core);

const multi_sort = (a, b) =>
  Number(b[1].score_multi_core) - Number(a[1].score_multi_core);

export default function Home() {
  const [multicore, setMulticore] = useState(false);
  const [amd, setAmd] = useState(true);
  const [intel, setIntel] = useState(true);
  return (
    <main className={styles.main}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            width="100px"
            src="https://spjall.vaktin.is/img/2010_header_logo.png"
          />

          <div class="container">
            <label for="checkbox-1">
              <input
                type="checkbox"
                onChange={() => {
                  setIntel(!intel);
                }}
                checked={intel}
                id="checkbox-1"
                name="checkbox-1"
              />
              Intel
            </label>
            <label for="checkbox-2">
              <input
                onChange={() => {
                  setAmd(!amd);
                }}
                checked={amd}
                type="checkbox"
                id="checkbox-2"
                name="checkbox-2"
              />
              AMD
            </label>
            <label for="checkbox-3">
              <input
                onChange={() => {
                  setMulticore(!multicore);
                }}
                type="checkbox"
                id="checkbox-3"
                name="checkbox-3"
              />
              Multicore
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="desktop-cell">Cinebench</th>
              <th className="desktop-cell">Örgjörvi</th>
              <th>Kísildalur</th>
              <th>Tölvutek</th>
              <th>Computer</th>
              <th>Tölvulistinn</th>
              <th>Tölvutækni</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cpus)
              .filter((element) => Object.keys(element[1]).length > 3)
              .filter((e) => intel || !e[1].full_name.includes("Core"))
              .filter((e) => amd || !e[1].full_name.includes("Ryzen"))
              .sort(multicore ? multi_sort : single_sort)
              .map((element) => (
                <>
                  <CpuDataRow
                    key={element[0]}
                    element={element}
                    multicore={multicore}
                  />
                </>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

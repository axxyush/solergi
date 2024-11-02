import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ChartsOverviewDemo(props) {
  return (
    <>
      <div className="container mb-5 d-flex justify-content-center mb-5">
        <div class="dashboard">
          <div className="texts">
            <h2 className="text-dark">
              <b>Data</b>
            </h2>
            <ul className="text-dark">
              <li>
                Estimated Monthly Savings:{" "}
                <b className="text-success">${props.savings}</b>
              </li>
              <li>
                Payback Period: <b>{props.paybackPeriod}</b> months
              </li>
              <li>
                Bill after Solar Installation: <b>${props.newBill}</b>{" "}
              </li>
              <li>
                Environmental Impact:{" "}
                <b className="text-success">{props.environmentalImpact}</b> kg
                CO₂ saved per month
              </li>
              <li>
                <b>Assumptions are:</b> Solar panel efficiency factor is 85%,
                initial investment cost is $10,000, and CO₂ emissions factor is
                0.92 kg CO₂ per kWh.
              </li>
            </ul>
          </div>
          <div style={{ marginLeft: "100px" }} className="charts">
            <BarChart
              series={[{ data: [props.before, props.after] }]}
              height={200}
              width={300}
              sx={{ color: "secondary.main" }}
              xAxis={[
                { data: ["Before Solar", "After Solar"], scaleType: "band" },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

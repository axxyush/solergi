import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ChartsOverviewDemo(props) {
  return (
    <>
      <div
        style={{
          borderRadius: "30px",
          border: "2px solid #16423c",
          marginBottom: "70px",
        }}
        className="container p-4 bg-light col-xxl-8 px-4 py-5"
      >
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display-7  fw-bold text-body-light lh-1 mb-3">
              Data
            </h1>
            <p className=" ">
              <ul>
                <li>Estimated Monthly Savings: ${props.savings}</li>
                <li>Payback Period: {props.paybackPeriod} months</li>
                <li>Bill after Solar Installation: ${props.newBill} </li>
                <li>
                  Assumptions are: Solar panel efficiency factor is 85%, initial
                  investment cost is $10,000, and CO₂ emissions factor is 0.92
                  kg CO₂ per kWh.
                </li>
              </ul>
            </p>
          </div>

          <div className="col-10 col-sm-8 col-lg-6">
            <BarChart
              series={[{ data: [props.before, props.after] }]}
              height={200}
              width={400}
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

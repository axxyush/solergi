import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchCoordinates, fetchWeatherData } from "../api/openMeteoApi";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

function Home() {
  const { register, handleSubmit } = useForm();

  // State to track calculated data
  const [savings, setSavings] = useState(null);
  const [newBill, setNewBill] = useState(null);
  const [paybackPeriod, setPaybackPeriod] = useState(null);
  const [environmentalImpact, setEnvironmentalImpact] = useState(null);
  const [monthlyBill, setMonthlyBill] = useState(null);

  // State to track if results should be displayed
  const [showResults, setShowResults] = useState(false);

  const onSubmit = async (data) => {
    const { city, monthlyBill } = data;
    setMonthlyBill(monthlyBill);
    setShowResults(true); // Show results after form submission

    try {
      const coordinates = await fetchCoordinates(city);
      const weatherData = await fetchWeatherData(
        coordinates.lat,
        coordinates.lon
      );

      const sunshineDurations = weatherData.daily.sunshine_duration;
      let totalHours = 0;
      for (let x = 0; x < sunshineDurations.length; x++) {
        totalHours += sunshineDurations[x];
      }
      totalHours = totalHours / sunshineDurations.length / 3600;

      const monthlySunshineHours = (totalHours * 30).toFixed(2);

      // Assumptions
      const efficiencyFactor = 0.85; // 85% efficiency
      const initialInvestment = 10000; // Example investment
      const emissionsFactor = 0.92; // kg CO₂ per kWh
      const electricityRate = 16.62; // rate in kWh
      const solarEnergyProduction = 2; // in kW

      // Calculations
      const monthlySolarEnergy =
        solarEnergyProduction * efficiencyFactor * monthlySunshineHours;
      const estimatedSavings = monthlySolarEnergy * electricityRate;
      const updatedMonthlyBill = Math.max(0, monthlyBill - estimatedSavings);
      const calculatedPaybackPeriod = initialInvestment / estimatedSavings;
      const calculatedEnvironmentalImpact =
        monthlySolarEnergy * emissionsFactor;

      // Update state with calculated values
      setSavings(estimatedSavings.toFixed(2));
      setNewBill(updatedMonthlyBill.toFixed(2));
      setPaybackPeriod(calculatedPaybackPeriod.toFixed(2));
      setEnvironmentalImpact(calculatedEnvironmentalImpact.toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Welcome to Solergi!
            </h1>
            <p className="col-lg-10 fs-4">
              Our mission is to help you understand the potential benefits of
              solar installation for your property. Just simply enter these
              details and see why solar installation is the new future!
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            {!showResults ? (
              <form
                className="p-4 p-md-2 border rounded-3 bg-body-tertiary"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-floating mb-3">
                  <input
                    {...register("city")}
                    className="form-control"
                    placeholder="City"
                  />
                  <label htmlFor="city">City</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("monthlyBill", { valueAsNumber: true })}
                    className="form-control"
                    placeholder="Monthly Electricity Bill"
                    type="number"
                  />
                  <label htmlFor="monthlyBill">
                    Monthly Electricity Bill ($)
                  </label>
                </div>

                <hr className="my-4" />
                <button
                  style={{ backgroundColor: "#16423c" }}
                  className="w-100 btn btn-lg btn-success"
                  type="submit"
                >
                  Calculate savings
                </button>
              </form>
            ) : (
              <h2>See results below</h2>
            )}
          </div>
        </div>
      </div>

      {showResults && (
        <Dashboard
          before={monthlyBill}
          after={newBill}
          savings={savings}
          paybackPeriod={paybackPeriod}
          newBill={newBill}
        />
      )}
      <Footer />
    </>
  );
}

export default Home;

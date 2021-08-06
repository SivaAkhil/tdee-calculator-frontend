import axios from "axios";
import { useState } from "react";
import "./calculatorpage.css";
import Card from "../components/UI/Card";
import CaloryCalculator from "../components/caloryCalculator";

const CalculatorPage = (props) => {
  const [weight, setWeight] = useState(0);
  const [bfp, setBfp] = useState(0);
  const [activity, setActivity] = useState(1.2);
  const [answer, setAnswer] = useState({
    BMR: 0,
    TDEE: 0,
    Loss2kg: 0,
    Loss4kg: 0,
    Gain2kg: 0,
    Gain4kg: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://bmr-tdee-calculator.herokuapp.com/api/calculate", {
        weight,
        BFP: bfp,
        AL: activity,
      })
      .then((response) => {
        setAnswer(response.data);
      });
  };

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleBfp = (e) => {
    setBfp(e.target.value);
  };

  const handleActivity = (e) => {
    setActivity(e.target.value);
  };

  return (
    <div className="calcpage-sub-container">
      <div className="calcpage-card-container">
        <Card number={answer.BMR} name={"Basal Metabolic Rate"} />
        <Card number={answer.TDEE} name={"Total Daily Energy Expenditure"} />
        <Card
          number={answer.Loss2kg}
          name={"Daily Requirement to Loss 2Kg/month"}
        />
        <Card
          number={answer.Loss4kg}
          name={"Daily Requirement to Loss 4Kg/month"}
        />
        <Card
          number={answer.Gain2kg}
          name={"Daily Requirement to Gain 2Kg/month"}
        />
        <Card
          number={answer.Gain4kg}
          name={"Daily Requirement to Gain 4Kg/month"}
        />
      </div>
      <div className="calcpage-inputs-container">
        <form onSubmit={handleSubmit} className="calc-form-1-container">
          <h2>TDEE and BMR Calculator:</h2>
          <div className="form-2-container">
            <div className="input-divide-divs">
              <label htmlFor="weight">Weight (KGs)</label>
              <input
                type="number"
                name="weight"
                value={weight}
                onChange={handleWeight}
              />
            </div>
            <div className="input-divide-divs">
              <label htmlFor="bfp">Body Fat Percentage (%)</label>
              <input
                type="number"
                name="bfp"
                value={bfp}
                onChange={handleBfp}
              />
            </div>
            <div className="input-divide-divs">
              <label htmlFor="activity">Activity</label>
              <select name="activity" onChange={handleActivity}>
                <option value={activity}>Sendentary</option>
                <option value={1.375}>Lightly Active</option>
                <option value={1.55}>Moderately active</option>
                <option value={1.725}>Very active</option>
                <option value={1.9}>Extra active</option>
              </select>
            </div>
            <button type="submit">Check</button>
          </div>
        </form>
        <div className="calcpage-caolry-table">
          <CaloryCalculator />
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;

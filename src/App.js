import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputCurrency from "./components/InputCurrency";
import axios from "axios";

function App() {
  const [rates, setRates] = useState([])
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [currency1, setCurrency1] = useState('UAH')
  const [currency2, setCurrency2] = useState('USD')

  useEffect(() => {
    axios.get('https://api.apilayer.com/fixer/latest?base=UAH&apikey=IrBUKAciiIBqGyVHy2UaaSnj0ehwa4w2&symbols=EUR,USD,UAH,GBP')
      .then(response => {
        setRates(response.data.rates)
      })
      .then(data => console.log(data))
  }, [])

  useEffect(() => {
    if (!!rates) {
      handleAmount1(1)
    }
  }, [rates]);


  function handleAmount1(amount1) {
    setAmount2(formatedAmouts(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }
  function handleAmount2(amount2) {
    setAmount1(formatedAmouts(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function findCurrency1(currency1) {
    setAmount2(formatedAmouts(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }
  function findCurrency2(currency2) {
    setAmount1(formatedAmouts(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  function formatedAmouts(amout) {
    return amout.toFixed(2);
  }

  return (
    <div className="App">
      <Header />
      <h1>Сurrency converter</h1>
      <InputCurrency currencies={Object.keys(rates)} amount={amount1} currency={currency1} onAmountChange={handleAmount1} onCurrencyChange={findCurrency1} />
      <InputCurrency currencies={Object.keys(rates)} amount={amount2} currency={currency2} onAmountChange={handleAmount2} onCurrencyChange={findCurrency2} />

    </div>
  );
}

export default App;

import React, { useState } from "react";

export default function CurrencyInput(props) {
  const [currencyOrigin, setCurrencyOrigin] = useState({
    currency: "usd",
    value: 0.0,
  });
  const [currencyConverted, setCurrencyConverted] = useState({
    currency: "btc",
    value: 0.0,
  });


  function handleCurrencyChange(event) {
    if(event.target.id === "currency-origin") {
      setCurrencyOrigin({...currencyOrigin, currency: event.target.value})
      console.log(currencyOrigin)
    } else if (event.target.id === "currency-converted") {
      setCurrencyConverted({...currencyConverted, currency: event.target.value})
      console.log(currencyConverted)
    }
  }

  function handleInputChange(event) {
    if (event.target.id === "currency-origin") {
      if (event.target.value) {
        setCurrencyOrigin({
          ...currencyOrigin,
          value: parseFloat(event.target.value),
        })
        setCurrencyConverted({...currencyConverted, value: (parseFloat(event.target.value) * 3)})
      } else {
        setCurrencyOrigin({ ...currencyOrigin, value: 0 });
      }
      console.log(currencyOrigin);
    }
    if (event.target.id === "currency-converted") {
      if (event.target.value) {
        setCurrencyConverted({
          ...currencyConverted,
          value: parseFloat(event.target.value),
        });
        setCurrencyOrigin({...currencyOrigin, value: (parseFloat(event.target.value) * 3)})
      } else {
        setCurrencyConverted({ ...currencyConverted, value: 0 });
      }
      console.log(currencyConverted);
    }
  }

  return (
    <>
      {" "}
      <select
        onChange={handleCurrencyChange}
        name="currency-origin"
        id="currency-origin"
        className="currency-origin"
        value={currencyOrigin.currency}
      >
        <option value="brl">BRL</option>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="btc">BTC</option>
      </select>
      <input
        type="number"
        placeholder="VALOR"
        id="currency-origin"
        onChange={handleInputChange}
        value={currencyOrigin.value}
      />
      <select
        onChange={handleCurrencyChange}
        name="currency-converted"
        id="currency-converted"
        className="currency-converted"
        value={currencyConverted.currency}
      >
        <option value="brl">BRL</option>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="btc">BTC</option>
      </select>
      <input
        type="number"
        placeholder="VALOR"
        id="currency-converted"
        onChange={handleInputChange}
        value={currencyConverted.value}
      />
    </>
  );
}

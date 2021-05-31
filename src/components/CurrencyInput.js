import React, { useState, useEffect } from "react";

export default function CurrencyInput(props) {
  const [dataFetched, setDataFetched] = useState();
  const [cryptoInputData, setCryptoInputData] = useState({
    currency: "bitcoin",
    value: "",
  });
  const [currencyData, setCurrencyData] = useState({
    currency: "brl",
    value: "",
  });

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
      .then((res) => res.json())
      .then((json) => setDataFetched(json));
  }, []);
  function handleCurrencyChange(event) {
    setCurrencyData({ ...currencyData, currency: event.target.value });
    console.log(currencyData);
  }
  function handleInputChange(event) {
    setCurrencyData({ ...currencyData, value: parseFloat(event.target.value) });
    console.log(currencyData);
  }
  function handleCryptoSelectChange(event) {
    let cryptoPrice = dataFetched.filter(
      (item) => item.id === event.target.value
    );
    cryptoPrice = cryptoPrice[0].current_value;
    setCryptoInputData({ value: cryptoPrice, currency: event.target.value });
  }
  function handleCryptoInputChange(event) {
    setCryptoInputData({
      ...cryptoInputData,
      value: parseFloat(event.target.value),
    });
    const cryptoValueToConvert = dataFetched.filter(
      (x) => x.id === cryptoInputData.currency
    );
    const convertedValue =
      parseFloat(event.target.value) *
      parseFloat(cryptoValueToConvert[0].current_price);
    console.log(
      convertedValue,
      event.target.value,
      cryptoValueToConvert[0].current_price
    );
    setCurrencyData({
      ...currencyData,
      value: convertedValue,
    });
  }
  // function getCurrencySymbol(currency) {
  //   switch (currency) {
  //     case "brl":
  //       return "R$";
  //     case "usd":
  //       return "$";
  //     case "eur":
  //       return "€";
  //   }
  // }
  // function handleRequest(event) {
  //   if (currencyData.value && currencyData.value > 0) {
  //     event.preventDefault();
  //     console.log(dataFetched, currencyData);
  //   }
  // }
  return (
    <div>
      <select
        name="initialCurrency"
        id="initialCurrency"
        onChange={handleCurrencyChange}
        value={currencyData.currency}
      >
        <option value="brl">Real Brasileiro (BRL)</option>
        <option value="usd">American Dollar (USD)</option>
        <option value="eur">Euro (EUR)</option>
      </select>
      <input
        type="text"
        name="initialCurrencyValue"
        id="initialCurrencyValue"
        value={currencyData.value}
        onChange={handleInputChange}
      />
      <select onChange={handleCryptoSelectChange}>
        {dataFetched
          ? dataFetched.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))
          : ""}
      </select>
      <input
        type="text"
        name="cryptoCurrencyValue"
        id="cryptoCurrencyValue"
        onChange={handleCryptoInputChange}
      />
    </div>
  );
}

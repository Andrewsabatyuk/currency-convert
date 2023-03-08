import React from 'react'
import uuid from 'react-uuid';


const InputCurrency = (props) => {
  return (
    <div className='currencyContainer'>
      <input type='text' value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
      <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
        {props.currencies.map((currency) => (
          <option value={currency} key={uuid()}>{currency}</option>
        ))}
      </select>
    </div>
  )
}

export default InputCurrency
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoArrowSwitch } from "react-icons/go";

const CurrencyConverter = () => {

    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [updateAmount, setUpdateAmount] = useState("");

    const convertCurrency = async () => {
        try {
           const apiUrl = `https://v6.exchangerate-api.com/v6/19967ef52780f5bf2a77f3aa/latest/${fromCurrency}`;
           const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rate data');
            }
            const data = await response.json();
            const exchangeRate = data.conversion_rates[toCurrency];
            
            if(!exchangeRate){
                throw new Error('Conversion rate not available');
            }

            const convertedValue = (amount * exchangeRate).toFixed(2);
            // Set the converted amount
            setConvertedAmount(convertedValue);
            setUpdateAmount(amount);

        } catch (error) {
            console.error('Error fetching or processing exchange rate data:', error.message);
            // Reset converted amount in case of error
            setConvertedAmount('');
        }
    };
    
    return (
        <>
            <div className="container">
                <div className="row c_cnvtr">
                    <span>Currency Converter</span>
                </div>
                <div className="row m-top">
                    <form>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-4">
                                <label>Amount</label>
                                <input type="text" className="form-control" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                            </div>
                            <div className="col-md-2">
                                <label>From</label>
                                <select className="form-control form-select" value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="INR">INR</option>
                                    {/* Add other currency options as needed */}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <span className="set-icon"><GoArrowSwitch /></span>
                            </div>
                            <div className="col-md-2">
                                <label>To</label>
                                <select className="form-control form-select" value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="DJF">DJF</option>
                                    {/* Add other currency options as needed */}
                                </select>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </form>
                </div>
                <div className="row m-left">
                    <div className="col-md-12">
                        <div><button type="button" className="padding-btn" onClick={convertCurrency}>Convert</button></div>
                        <div className="m-p-color">Converted Amount:</div>
                        <div className="text-color">
                            <span>{updateAmount} {fromCurrency}=</span>
                            <span>{convertedAmount} {toCurrency}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrencyConverter;


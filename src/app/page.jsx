"use client"

import axios from "axios";
import react, { useState, useEffect } from "react";

export default function Home() {

  const [info, setInfo] = useState([])
  const [from, setFrom] = useState("THB")
  const [to, setTo] = useState("USD")
  const [input, setInput] = useState(0)
  const [options, setOptions] = useState([])
  const [output, setOutput] = useState(0)

  useEffect(() => {

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${from}`)
         .then((res) => setInfo(res.data.data))
         .catch((error) => console.log(error))
  }, [from, to])

  useEffect(() => {
    if (info && Object.keys(info).length > 0) {
      setOptions(Object.keys(info));
    }
  }, [info])

  function convert() {
    const rate = info[to];
    if (rate) {
      setOutput(Number(input) * rate);
    } else {
      console.error("Rate not found for:", to);
    }
  }

  function swap(){
    let temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-black">
      <div className="border-4 border-white rounded-3xl p-7 lg:p-10 bg-slate-800">

        <div className="flex flex-col items-center">
          <div className=" text-center">
            <h1 className="text-3xl font-bold mb-5 text-white">Currency converter</h1>
          </div>

          <div className="flex my-10 items-center justify-center">

            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-white">Amount</h3>
              <input type="number" className="input input-bordered w-full max-w-xs" name="Amount" placeholder="Enter the amount" onChange={(e) => setInput(e.target.value)}/>
            </div>

            <div className="flex justify-center items-end">

              <div className="mx-5 text-center items-center">
                <h3 className="text-xl font-semibold mr-7 text-white">From</h3>
                <select name="from" className="select select-bordered w-full max-w-xs" onChange={(e) => setTo(e.target.value)} value={from}>
                  {options.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="">
                <button className="btn btn-accent text-white" onClick={() => swap()}>Swap</button>
              </div>

              <div className="ml-5 text-center items-center">
                <h3 className="text-xl font-semibold mr-7 text-white">To</h3>
                <select name="to" className="select select-bordered w-full max-w-xs" onChange={(e) => setTo(e.target.value)} value={to}>
                  {options.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-5">
            <button className="btn btn-accent text-white" onClick={() => convert()}>Convert</button>
          </div>

          <div className="">
              <h2 className="xm:text-lg lg:text-xl font-semibold text-white">Converted amount : {input} {from} = {output.toFixed(2)} {to}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

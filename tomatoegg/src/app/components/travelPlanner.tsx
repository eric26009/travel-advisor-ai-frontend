"use client";
import axios from "axios";
import React, { useState } from "react";

const TravelPlanner = () => {
  const [selectKnownLocation, setSelectKnownLocation] = useState(true);
  const [destination, setDestination] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [travelType, setTravelType] = useState("");
  const [month, setMonth] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const handleLocationClick = (value: boolean) => {
    setSelectKnownLocation(value);
    setDestination("");
    setStartLocation("");
    setTravelType("");
    setMonth("");
  };

  const submit = () => {
    setError("");
    if (selectKnownLocation) {
      if (!destination || !month) {
        setError("Missing parameters");
      } else {
        fetchKnownLocation();
      }
    } else {
      if (!startLocation || !travelType || !month) {
      } else {
        fetchUnknownLocation();
      }
    }
  };

  const fetchKnownLocation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/travel/known?endLocation=${destination}&month=${month}&auth=${accessCode}`
      );
      setResponse(response.data);
    } catch (err: any) {
      console.log(err);
      if (err?.message) {
        setError((e) => `${e} ${err.message}`);
      }
      if (err?.response?.data?.error) {
        setError((e) => `${e} ${err?.response?.data?.error}`);
      }
    }
  };

  const fetchUnknownLocation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/travel/unknown?startLocation=${startLocation}&type=${travelType}&month=${month}&auth=${accessCode}`
      );

      setResponse(response.data);
    } catch (err: any) {
      console.log(err);
      if (err?.message) {
        setError((e) => `${e} ${err.message}`);
      }
      if (err?.response?.data?.error) {
        setError((e) => `${e} ${err?.response?.data?.error}`);
      }
    }
  };

  return (
    <div>
      <span className="flex justify-center text-3xl font-bold pb-5">
        Travel Advisor AI
      </span>
      <main className="flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="flex border-b">
            <div className="-mb-px mr-1 w-full">
              <button
                className={`bg-white inline-block py-2 px-4 w-full ${
                  selectKnownLocation
                    ? "border-l border-t border-r rounded-t"
                    : ""
                }`}
                onClick={() => handleLocationClick(true)}
              >
                Known Location
              </button>
            </div>
            <div className="-mb-px w-full">
              <button
                className={`bg-white inline-block py-2 px-4 w-full ${
                  selectKnownLocation
                    ? ""
                    : "border-l border-t border-r rounded-t"
                }`}
                onClick={() => handleLocationClick(false)}
              >
                Unknown Location
              </button>
            </div>
          </div>
          {selectKnownLocation ? (
            <>
              <div className="flex border-x justify-center items-center pt-5">
                <div className="w-[100px]">Destination:</div>
                <input
                  className="w-[200px] mx-5 py-1 px-3 border rounded focus:outline-none"
                  type="text"
                  placeholder="Seattle"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex border-x justify-center items-center py-5">
                <div className="w-[100px]">Month:</div>
                <input
                  className="w-[200px] mx-5 py-1 px-3 border rounded focus:outline-none"
                  type="text"
                  placeholder="May"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex border-x justify-center items-center pt-5">
                <div className="w-[150px]">Start Location:</div>
                <input
                  className="w-[200px]  py-1 px-3 border rounded focus:outline-none"
                  type="text"
                  placeholder="Seattle"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
              </div>
              <div className="flex border-x justify-center items-center pt-5">
                <label className="flex p-3">
                  <input
                    type="radio"
                    name="travelType"
                    value="domestic"
                    checked={travelType == "domestic"}
                    onChange={(e) => setTravelType(e.target.value)}
                  />
                  <span className="ml-3">Domestic</span>
                </label>
                <label className="flex p-3">
                  <input
                    type="radio"
                    name="travelType"
                    value="roadtrip"
                    checked={travelType == "roadtrip"}
                    onChange={(e) => setTravelType(e.target.value)}
                  />
                  <span className="ml-3">Road Trip</span>
                </label>
                <label className="flex p-3">
                  <input
                    type="radio"
                    name="travelType"
                    value="international"
                    checked={travelType == "international"}
                    onChange={(e) => setTravelType(e.target.value)}
                  />
                  <span className="ml-3">International</span>
                </label>
              </div>
              <div className="flex border-x justify-center items-center py-5">
                <div className="w-[100px]">Month:</div>
                <input
                  className="w-[200px] mx-5 py-1 px-3 border rounded focus:outline-none"
                  type="text"
                  placeholder="May"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="flex border-x justify-center items-end pb-5 border-b">
            <div className="flex-column">
              <div className="w-[200px]">Access Code:</div>
              <input
                className="w-[200px] mr-2 py-1  border rounded focus:outline-none"
                type="text"
                placeholder=""
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>
            <button
              className="w-[50%] py-2 px-4 rounded bg-black text-white font-bold border border-transparent hover:bg-white hover:text-black hover:border-black"
              type="button"
              onClick={() => submit()}
            >
              Submit
            </button>
          </div>
          {error && <span className="text-red-500">{error}</span>}
        </div>
        {response && (
          <div className="w-full">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default TravelPlanner;

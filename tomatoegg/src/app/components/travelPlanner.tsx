"use client";
import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "./spinner/Spinner";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const tripTypes = [
  { label: "Road Trip", value: "roadtrip" },
  { label: "Domestic", value: "domestic" },
  { label: "International", value: "international" },
];

const TravelPlanner = () => {
  const [selectKnownLocation, setSelectKnownLocation] = useState(true);
  const [destination, setDestination] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [travelType, setTravelType] = useState("roadtrip");
  const [month, setMonth] = useState("January");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLocationClick = (value: boolean) => {
    setSelectKnownLocation(value);
    // setDestination("");
    // setStartLocation("");
    // setTravelType("");
    // setMonth("");
  };

  const submit = () => {
    setError("");
    setActivities([]);
    setDestinations([]);
    if (selectKnownLocation) {
      if (!destination || !month) {
        setError("Missing parameters");
      } else {
        fetchKnownLocation();
      }
    } else {
      if (!startLocation || !travelType || !month) {
        setError("Missing parameters");
      } else {
        fetchUnknownLocation();
      }
    }
  };

  const fetchKnownLocation = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(
          `http://localhost:8000/travel/known?endLocation=${destination}&month=${month}`,
          { headers: { Authorization: accessCode } }
        )
        .finally(() => setLoading(false));
      console.log(response);
      setActivities(response.data.activities);
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
      setLoading(true);
      const response = await axios
        .get(
          `http://localhost:8000/travel/unknown?startLocation=${startLocation}&type=${travelType}&month=${month}`,
          { headers: { Authorization: accessCode } }
        )
        .finally(() => setLoading(false));

      setDestinations(response.data.destinations);
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
      <main className="items-center justify-center">
        <div className="flex flex-col w-full px-8">
          <div className="flex border-b">
            <div className="-mb-px mr-1 w-full">
              <button
                className={selectKnownLocation ? "tab-active" : "tab-inactive"}
                onClick={() => handleLocationClick(true)}
              >
                Known Location
              </button>
            </div>
            <div className="-mb-px w-full">
              <button
                className={selectKnownLocation ? "tab-inactive" : "tab-active"}
                onClick={() => handleLocationClick(false)}
              >
                Unknown Location
              </button>
            </div>
          </div>
          <div className="flex flex-wrap border-x border-black">
            {selectKnownLocation ? (
              <>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Destination:</div>
                  <input
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    type="text"
                    placeholder="Seattle"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Budget:</div>
                  <input
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    type="text"
                    placeholder="$$"
                    //value={}
                    //onChange={}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Month:</div>
                  <select
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Travelers:</div>
                  <input
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    type="text"
                    placeholder="2"
                    //value={}
                    //onChange={}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Start Location:</div>
                  <input
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    type="text"
                    placeholder="Seattle"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Month:</div>
                  <select
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
                  <div className="w-[150px] bg-gray-100">Trip Type:</div>
                  <select
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                  >
                    {tripTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-wrap border-x border-b rounded-b border-black pb-5 bg-gray-100">
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
              <div className="w-[150px] bg-gray-100">Access Code:</div>
              <input
                className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                type="text"
                placeholder="Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2  lg:w-1/2 xl:w-1/2 flex justify-center items-center pt-5 bg-gray-100">
              <button
                className="btn-primary"
                type="button"
                onClick={() => submit()}
                disabled={loading}
              >
                Submit
              </button>
              {loading && <Spinner height={40} width={40} />}
            </div>
            {error && <span className="text-red-500">{error}</span>}
          </div>
        </div>
        {activities && (
          <div className="w-full">
            {/*<pre>{JSON.stringify(response, null, 2)}</pre>*/}
            {activities.map((activitie: any, idx) => {
              return (
                <div
                  className="flex flex-col border border-black rounded mx-8 mt-5 p-3 bg-gray-300"
                  key={idx}
                >
                  <div className="bg-gray-300 mt-1 flex w-full justify-between">
                    <div className="bg-gray-300 font-bold">
                      {activitie.title}
                    </div>
                    <div className="bg-gray-300">{activitie.type}</div>
                  </div>
                  <div className="bg-gray-300 mt-1">{activitie.address}</div>
                  <div className="bg-gray-300 mt-5">
                    {activitie.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {destinations && (
          <div className="w-full">
            {destinations.map((destination: any, idx) => {
              return (
                <div
                  className="flex flex-col border border-black rounded mx-8 mt-5 p-3 bg-gray-300"
                  key={idx}
                >
                  <div className="bg-gray-300 mt-1 flex w-full">
                    <div className="bg-gray-300 font-bold">
                      {destination.location}
                    </div>
                  </div>
                  <div className="bg-gray-300 mt-3">
                    {destination.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default TravelPlanner;

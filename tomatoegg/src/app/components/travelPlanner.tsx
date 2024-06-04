"use client";
import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "./spinner/Spinner";

const TravelPlanner = () => {
  const [selectKnownLocation, setSelectKnownLocation] = useState(true);
  const [destination, setDestination] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [travelType, setTravelType] = useState("");
  const [month, setMonth] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLocationClick = (value: boolean) => {
    setSelectKnownLocation(value);
    setDestination("");
    setStartLocation("");
    setTravelType("");
    setMonth("");
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
                className={`bg-gray-100 inline-block py-2 px-4 w-full border-black border rounded-tl rounded-tr ${
                  selectKnownLocation ? "border-b-[#F3F4F6]" : ""
                }`}
                onClick={() => handleLocationClick(true)}
              >
                Known Location
              </button>
            </div>
            <div className="-mb-px w-full">
              <button
                className={`bg-gray-100 inline-block py-2 px-4 w-full border-black border rounded-tl rounded-tr ${
                  selectKnownLocation ? "" : "border-b-[#F3F4F6]"
                }`}
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
                  <input
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    type="text"
                    placeholder="May"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
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
                  <input
                    className="w-[150px] py-1 px-3 border rounded focus:outline-none bg-white border-black"
                    type="text"
                    placeholder="May"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-center items-center pt-5 bg-gray-100">
                  <label className="flex p-3 bg-gray-100">
                    <input
                      type="radio"
                      name="travelType"
                      value="domestic"
                      checked={travelType == "domestic"}
                      onChange={(e) => setTravelType(e.target.value)}
                    />
                    <span className="ml-3 bg-gray-100">Domestic</span>
                  </label>
                  <label className="flex p-3 bg-gray-100">
                    <input
                      type="radio"
                      name="travelType"
                      value="roadtrip"
                      checked={travelType == "roadtrip"}
                      onChange={(e) => setTravelType(e.target.value)}
                    />
                    <span className="ml-3 bg-gray-100">Road Trip</span>
                  </label>
                  <label className="flex p-3 bg-gray-100">
                    <input
                      type="radio"
                      name="travelType"
                      value="international"
                      checked={travelType == "international"}
                      onChange={(e) => setTravelType(e.target.value)}
                    />
                    <span className="ml-3 bg-gray-100">International</span>
                  </label>
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
                className="w-[200px] lg:w-1/2 xl:w-1/2 py-2 px-4 rounded bg-black text-white font-bold border border-transparent hover:bg-white hover:text-black hover:border-black disabled:hover:bg-black disabled:hover:text-white disabled:hover:border-transparent"
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

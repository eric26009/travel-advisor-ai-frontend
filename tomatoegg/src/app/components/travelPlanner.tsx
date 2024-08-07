"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "./spinner/Spinner";
import AirplaneImage from "./airplaneImage";
import "./index.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const params = useSearchParams();
  const router = useRouter();
  const paramType = params.get("type");

  const [selectKnownLocation, setSelectKnownLocation] = useState(
    paramType === "activity" ? true : false
  );
  const [destination, setDestination] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [travelType, setTravelType] = useState("roadtrip");
  const [month, setMonth] = useState("January");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [activities, setActivities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectKnownLocation(paramType === "activity" ? true : false);
  }, [paramType]);

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
      <main className="items-center justify-center">
        <div className="flex flex-col w-full px-8 justify-center items-center p-5">
          <Tabs
            value={selectKnownLocation ? "activity" : "destination"}
            onValueChange={(val) => params.set}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger asChild value="activity">
                <Link
                  href={{
                    query: { type: "activity" },
                  }}
                >
                  AI Activity Advisor
                </Link>
              </TabsTrigger>
              <TabsTrigger asChild value="destination">
                <Link
                  href={{
                    query: { type: "destination" },
                  }}
                >
                  AI Destination Advisor
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <div className="grid gap-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    type="text"
                    placeholder="Seattle"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="month">Month</Label>
                  <Select value={month} onValueChange={(val) => setMonth(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem value={m} key={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="destination">
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
            </TabsContent>
            <div className="mt-3 grid gap-3">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="destination">Access Code</Label>
                <Input
                  type="password"
                  placeholder="Code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <Button onClick={submit} disabled={loading} variant="default">
                  Submit
                </Button>
                {loading && <Spinner height={40} width={40} />}
              </div>

              {error && <span className="text-red-500">{error}</span>}
            </div>
          </Tabs>
        </div>
        {loading && (
          <div className="mx-auto w-3/12 h-3/12 ">
            <AirplaneImage />
          </div>
        )}
        {activities && (
          <div className="w-full">
            {/*<pre>{JSON.stringify(response, null, 2)}</pre>*/}
            {activities.map((activitie: any) => {
              return (
                <div
                  className="flex flex-col border border-black rounded mx-8 mt-5 p-3 bg-gray-300"
                  key={activitie.id}
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
            {destinations.map((destination: any) => {
              return (
                <div
                  className="flex flex-col border border-black rounded mx-8 mt-5 p-3 bg-gray-300"
                  key={destination.id}
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

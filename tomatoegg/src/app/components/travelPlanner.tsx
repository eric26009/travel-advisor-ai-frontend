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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    if (selectKnownLocation) {
      if (!destination || !month) {
        setError("Missing parameters");
      } else {
        setActivities([]);
        fetchKnownLocation();
      }
    } else {
      if (!startLocation || !travelType || !month) {
        setError("Missing parameters");
      } else {
        setDestinations([]);
        fetchUnknownLocation();
      }
    }
  };

  const fetchKnownLocation = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(
          `https://tomatoegg-backend.onrender.com/travel/known?endLocation=${destination}&month=${month}`,
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
          `https://tomatoegg-backend.onrender.com/travel/unknown?startLocation=${startLocation}&type=${travelType}&month=${month}`,
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
              <div className="grid gap-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="destination">Start Location</Label>
                  <Input
                    type="text"
                    placeholder="Seattle"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="month">Month</Label>
                  <Select value={month} onValueChange={(val) => setMonth(val)}>
                    <SelectTrigger>
                      <SelectValue />
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
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="month">Trip Type</Label>
                  <Select
                    value={travelType}
                    onValueChange={(e) => setTravelType(e)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tripTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <div className="mt-3 grid gap-3">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="destination">Access Code</Label>
                <Input
                  style={{ WebkitTextSecurity: "disc" }}
                  autoComplete="off"
                  type="text"
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
          {loading && (
            <div className="mx-auto w-3/12 h-3/12 ">
              <AirplaneImage />
            </div>
          )}
          {activities?.length > 0 && selectKnownLocation && (
            <Card className="max-w-7xl mt-3">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="grid gap-10">
                  {activities.map((activity: any) => {
                    return (
                      <div key={activity.id} className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.address}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
          {destinations?.length > 0 && !selectKnownLocation && (
            <Card className="max-w-7xl mt-3">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="grid gap-10">
                  {destinations.map((destination: any) => {
                    return (
                      <div
                        key={destination.id}
                        className="grid grid-cols-1 gap-4"
                      >
                        <div className="grid gap-1">
                          <p className="font-medium">{destination.location}</p>
                          <p className="text-sm text-muted-foreground">
                            {destination.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default TravelPlanner;

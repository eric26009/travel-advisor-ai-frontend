"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "../spinner/Spinner";
import AirplaneImage from "../airplaneImage";
import "../index.css";
import { useSearchParams } from "next/navigation";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Activity, Destination } from "../../types";
import axios from "axios";
import { months, tripTypes } from "../../constants";
import { DestinationsCard } from "./DestinationsCard";
import { ActivitiesCard } from "./ActivitiesCard";

const TravelPlanner = () => {
  const params = useSearchParams();
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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
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
      setActivities(response.data.activities);
    } catch (err: any) {
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
      if (err?.message) {
        setError((e) => `${e} ${err.message}`);
      }
      if (err?.response?.data?.error) {
        setError((e) => `${e} ${err?.response?.data?.error}`);
      }
    }
  };

  return (
    <div className="container">
      <Tabs
        value={selectKnownLocation ? "activity" : "destination"}
        className="max-w-[500px]"
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
            <div className="flex justify-start items-center gap-2">
              <Label htmlFor="destination">Access Code</Label>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    <i className="fa-regular fa-circle-question"></i>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" avoidCollisions>
                    <p>
                      If you do not have an access code, send a message to{" "}
                      <a
                        href="https://www.linkedin.com/in/feldmaneric"
                        target="_blank"
                        className="font-bold hover:underline"
                      >
                        Eric Feldman
                      </a>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              // @ts-ignore
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
      <ActivitiesCard
        activities={activities}
        selectKnownLocation={selectKnownLocation}
      />
      <DestinationsCard
        destinations={destinations}
        selectKnownLocation={selectKnownLocation}
      />
    </div>
  );
};

export default TravelPlanner;

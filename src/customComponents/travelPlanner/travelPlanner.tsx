"use client";

import React, { useEffect, useState } from "react";
import AirplaneImage from "../airplaneImage";
import "../index.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Activity, Destination, ExplorerType } from "../../types";
import axios from "axios";
import { DestinationsCard } from "./DestinationsCard";
import { ActivitiesCard } from "./ActivitiesCard";
import { z } from "zod";

import { AlertCircle } from "lucide-react";
import DestinationForm, { destinationSchema } from "./DestinationForm";
import ActivityForm, { activitySchema } from "./ActivityForm";

const TravelPlanner = () => {
  const params = useSearchParams();
  const paramType = params.get("type") as ExplorerType;

  const [explorerType, setExplorerType] = useState<ExplorerType>("activity");
  const [error, setError] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);

  const submitDestinationForm = (values: z.infer<typeof destinationSchema>) => {
    setDestinations([]);
    setError("");
    fetchDestinations(values);
  };

  const submitActivityForm = (values: z.infer<typeof activitySchema>) => {
    setActivities([]);
    setError("");
    fetchActivities(values);
  };

  useEffect(() => {
    setExplorerType(paramType);
  }, [paramType]);

  const fetchActivities = async (values: z.infer<typeof activitySchema>) => {
    const { destination, month, accessCode } = values;
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

  const fetchDestinations = async (
    values: z.infer<typeof destinationSchema>
  ) => {
    const { startLocation, travelType, month, accessCode } = values;
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
      <Tabs value={explorerType} className="max-w-[500px] flex flex-col">
        <TabsList className="self-center">
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
          <ActivityForm
            submitActivityForm={submitActivityForm}
            loading={loading}
          />
        </TabsContent>
        <TabsContent value="destination">
          <DestinationForm
            submitDestinationForm={submitDestinationForm}
            loading={loading}
          />
        </TabsContent>
        {error && (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Tabs>
      {loading && (
        <div className="mx-auto w-64 h-64">
          <AirplaneImage />
        </div>
      )}
      <ActivitiesCard activities={activities} explorerType={explorerType} />
      <DestinationsCard
        destinations={destinations}
        explorerType={explorerType}
      />
    </div>
  );
};

export default TravelPlanner;

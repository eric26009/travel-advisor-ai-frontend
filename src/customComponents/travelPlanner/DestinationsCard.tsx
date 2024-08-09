import { Destination } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  destinations: Destination[];
  selectKnownLocation: boolean;
}

export const DestinationsCard = ({
  destinations,
  selectKnownLocation,
}: Props) => {
  return destinations?.length > 0 && !selectKnownLocation ? (
    <Card className="max-w-7xl mt-3">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="grid gap-10">
          {destinations.map((destination: Destination) => {
            return (
              <div key={destination.id} className="grid grid-cols-1 gap-4">
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
  ) : null;
};

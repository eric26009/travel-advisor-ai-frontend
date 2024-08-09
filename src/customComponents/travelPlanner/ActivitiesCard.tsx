import { Activity } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  activities: Activity[];
  selectKnownLocation: boolean;
}

export const ActivitiesCard = ({ activities, selectKnownLocation }: Props) => {
  return activities?.length > 0 && selectKnownLocation ? (
    <Card className="max-w-7xl mt-3">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="grid gap-10">
          {activities.map((activity: Activity) => {
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
  ) : null;
};

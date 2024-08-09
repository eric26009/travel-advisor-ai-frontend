export interface Destination {
  description: string;
  distance: string;
  id: string;
  location: string;
}

export interface DestinationResponse {
  descriptions: Destination[];
}

export interface Activity {
  address: string;
  description: string;
  id: string;
  title: string;
  type: string;
}

export interface ActivityResponse {
  activities: Activity[];
}

export type ExplorerType = "activity" | "destination";

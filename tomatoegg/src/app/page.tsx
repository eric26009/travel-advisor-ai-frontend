"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SuitCase from "./components/suitCaseSvg";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <div className="homepage gap-9">
        <h1 className="text-[2rem] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Plan your next trip using our state of the art AI travel advisor
        </h1>

        <Button asChild variant="default">
          <Link
            href={{
              pathname: "/explorer",
              query: { type: "activity" },
            }}
          >
            Discover your next adventure
          </Link>
        </Button>
      </div>
    </main>
  );
}

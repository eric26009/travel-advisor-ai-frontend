"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const params = useSearchParams();
  const typeParam = params.get("type");
  return (
    <nav className="p-5 bg-white bg-opacity-10 flex-col gap-6 text-sm font-medium flex items-center sm:flex-col md:flex-row md:gap-5 lg:gap-6">
      <Link
        href="/"
        className={`flex items-center gap-2 text-${
          pathName === "/" ? "primary" : "muted"
        }-foreground transition-colors hover:text-foreground`}
      >
        <i className="fa-solid fa-map-location-dot"></i>
        Home
      </Link>
      <Link
        href={{ pathname: "/explorer", query: { type: "activity" } }}
        className={`text-${
          pathName === "/explorer" && typeParam === "activity"
            ? "primary"
            : "muted"
        }-foreground transition-colors hover:text-foreground`}
      >
        Activity Explorer
      </Link>
      <Link
        href={{ pathname: "/explorer", query: { type: "destination" } }}
        className={`text-${
          pathName === "/explorer" && typeParam === "destination"
            ? "primary"
            : "muted"
        }-foreground transition-colors hover:text-foreground`}
      >
        Destination Explorer
      </Link>
    </nav>
  );
}

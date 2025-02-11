"use client";

import Link from "next/link";
import { getRoutes } from "../route/routes";
import { JSX } from "react";

export function Sidebar(): JSX.Element {
  const routes = getRoutes();

  const menuItems = [
    routes.HOME,
    routes.DASHBOARD,
    routes.CARDS,
    routes.SETTINGS,
  ];

  return (
    <nav>
      <ul>
        {menuItems.map(({ path, displayName }) => (
          <li key={path}>
            <Link href={path}>{displayName}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

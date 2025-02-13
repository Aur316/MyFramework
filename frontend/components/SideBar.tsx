"use client";

import Link from "next/link";
import { getRoutes } from "../route/routes";
import { JSX, useState, useEffect } from "react";
import { Menu } from "lucide-react";

export function Sidebar(): JSX.Element {
  const routes = getRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems = [
    routes.HOME,
    routes.DASHBOARD,
    routes.CARDS,
    routes.SETTINGS,
  ];

  useEffect(() => {
    const outsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".drawer-side")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", outsideClick);
    return () => document.removeEventListener("click", outsideClick);
  }, [isOpen]);

  return (
    <div className="drawer md:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="drawer-content flex flex-col">
        <label
          htmlFor="sidebar-drawer"
          className="btn btn-primary drawer-button md:hidden m-4"
        >
          <Menu size={24} />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          {menuItems.map(({ path, displayName }) => (
            <li key={path}>
              <Link
                href={path}
                className="btn btn-ghost justify-start"
                onClick={() => setIsOpen(false)}
              >
                {displayName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

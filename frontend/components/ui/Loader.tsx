import React, { JSX } from "react";

interface LoaderProps {
  colorClass?: string;
}

export default function Loader({
  colorClass = "text-primary",
}: LoaderProps): JSX.Element {
  return <span className={`loading loading-spinner ${colorClass}`} />;
}

import { useMemo } from "react";

export function useApiBaseUrl(): string {
  return useMemo(() => {
    const isServer = process.env.NEXT_PUBLIC_DATA_SOURCE === "server";
    let baseUrl = isServer
      ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      : process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

    baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    return isServer
      ? baseUrl
      : `${baseUrl}/api/${process.env.NEXT_PUBLIC_DATABASE}`;
  }, []);
}

"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();
  //console.log(isConnected)
  if (isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="border-none bg-yellow-600 text-white"
      >
        FallBack:Retrying every second
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-none bg-emerald-600 text-white">
      Live: Real-time updates
    </Badge>
  );
};

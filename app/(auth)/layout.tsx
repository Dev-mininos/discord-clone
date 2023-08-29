import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="justify-center items-center flex h-full">{children}</div>;
};

export default layout;

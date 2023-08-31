"use client";
import { useEffect, useState } from "react";
import { CreateServerModal } from "../models/create-server-modal";
import { InviteModal } from "../models/InviteModal";
export const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal/>
    </>
  );
};

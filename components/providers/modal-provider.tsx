"use client";
import { useEffect, useState } from "react";
import { CreateServerModal } from "../models/create-server-modal";
import { InviteModal } from "../models/InviteModal";
import { EditServerModal } from "../models/edit-server-modal";
import { MembersModal } from "../models/members-modal";
import { CreateChannelModal } from "../models/create-channel";
import { LeaveServerModal } from "../models/leave-server";
import { DeleteServerModal } from "../models/delete-server-modal";
import { DeleteChannelModal } from "../models/delete-channel";
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
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
    </>
  );
};

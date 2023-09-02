"use client";
import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setisLoading] = useState(false);
  const { server, channel } = data;
  const isModalOpen = isOpen && type === "DeleteChannel";
  const router = useRouter();
  const onClick = async () => {
    try {
      setisLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
    } finally {
      setisLoading(true);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8 ">
          <DialogTitle className="text-center text-3xl font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete this server? <br />
            <span className="font-semibold text-indigo-500">
              #{channel?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant={"primary"} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

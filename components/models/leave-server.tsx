"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setisLoading] = useState(false);
  const { server } = data;
  const onNew = async () => {
    try {
      setisLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );
      //onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  const isModalOpen = isOpen && type === "leaveServer";
  const router = useRouter();
  const onClick = async () => {
    try {
      setisLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
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
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leanve{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            ?
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

"use client";
import { useEffect, useState } from "react";
import { Search, SearchIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CommandEmpty } from "cmdk";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "Channel" | "member";
    data: {
      icon: ReactNode;
      name: string;
      id: string | undefined;
    }[];
  }[];
}
export const ServerSearch: FC<ServerSearchProps> = ({ data }) => {
  const [open, setopen] = useState(false);
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setopen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const onClick = ({
    id,
    type,
  }: {
    id: string | undefined;
    type: "Channel" | "member";
  }) => {
    setopen(false);
    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }
    if (type === "Channel") {
      return router.push(`/servers/${params.serverId}/channels/${id}`);
    }
  };
  return (
    <>
      <button
        className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
        onClick={() => setopen(true)}
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">Ctrl</span> + K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setopen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

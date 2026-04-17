import * as React from "react";

export function Input({ className = "", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-slate-400 transition focus:ring-2 ${className}`}
      {...props}
    />
  );
}

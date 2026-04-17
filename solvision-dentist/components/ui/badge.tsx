import * as React from "react";

export function Badge({ className = "", ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-slate-100 text-slate-700 ${className}`}
      {...props}
    />
  );
}

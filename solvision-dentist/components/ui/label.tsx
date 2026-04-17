import * as React from "react";

export function Label({ className = "", ...props }: React.ComponentProps<"label">) {
  return <label className={`text-sm font-medium text-slate-700 ${className}`} {...props} />;
}

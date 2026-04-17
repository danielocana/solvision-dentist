import * as React from "react";

export function Table({ className = "", ...props }: React.ComponentProps<"table">) {
  return <table className={`w-full text-sm ${className}`} {...props} />;
}

export function TableHeader(props: React.ComponentProps<"thead">) {
  return <thead className="bg-slate-100" {...props} />;
}

export function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody {...props} />;
}

export function TableRow({ className = "", ...props }: React.ComponentProps<"tr">) {
  return <tr className={`border-b border-slate-200 ${className}`} {...props} />;
}

export function TableHead({ className = "", ...props }: React.ComponentProps<"th">) {
  return <th className={`px-3 py-2 text-left font-medium text-slate-700 ${className}`} {...props} />;
}

export function TableCell({ className = "", ...props }: React.ComponentProps<"td">) {
  return <td className={`px-3 py-2 ${className}`} {...props} />;
}

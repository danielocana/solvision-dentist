"use client";

import * as React from "react";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  defaultValue,
  className = "",
  children,
}: {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`inline-grid gap-2 bg-slate-100 p-1 ${className}`} {...props} />;
}

export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (!context) return null;

  const isActive = context.value === value;

  return (
    <button
      type="button"
      className={`rounded-xl px-3 py-2 text-sm transition ${isActive ? "bg-white font-semibold text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"} ${className}`}
      onClick={() => context.setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className = "",
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (!context || context.value !== value) return null;
  return <div className={className} {...props} />;
}

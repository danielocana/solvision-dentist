"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


function Icon({ className = "h-4 w-4" }: { className?: string }) {
  return <span className={`inline-block rounded bg-slate-400 ${className}`} aria-hidden />;
}

const Calculator = Icon;
const Home = Icon;
const DollarSign = Icon;
const TrendingUp = Icon;

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function percent(value: number) {
  return `${value.toFixed(2)}%`;
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

type MortgageInput = {
  name: string;
  balance: number;
  rate: number;
  monthlyPayment: number;
  termYears: number;
  tax2023: number;
  tax2024: number;
  tax2025: number;
};

type YearRow = {
  year: number;
  paymentAnnual: number;
  projectedTax: number;
  totalAnnualOutflow: number;
};

function calcMortgage(
  balance: number,
  rate: number,
  monthlyPayment: number,
  termYears: number
) {
  const months = termYears * 12;
  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - balance;
  const monthlyRate = rate / 100 / 12;

  let remaining = balance;
  const amortizationByYear: {
    year: number;
    startingBalance: number;
    endingBalance: number;
    principalPaid: number;
    interestPaid: number;
  }[] = [];

  for (let year = 1; year <= termYears; year++) {
    const startingBalance = remaining;
    let principalPaid = 0;
    let interestPaid = 0;

    for (let m = 0; m < 12; m++) {
      if (remaining <= 0) break;
      const interest = remaining * monthlyRate;
      let principal = monthlyPayment - interest;

      if (principal > remaining) {
        principal = remaining;
      }

      remaining -= principal;
      principalPaid += principal;
      interestPaid += interest;
    }

    amortizationByYear.push({
      year,
      startingBalance: round2(startingBalance),
      endingBalance: round2(Math.max(remaining, 0)),
      principalPaid: round2(principalPaid),
      interestPaid: round2(interestPaid),
    });
  }

  return {
    totalPaid: round2(totalPaid),
    totalInterest: round2(totalInterest),
    amortizationByYear,
  };
}

function calcTaxGrowthCagr(tax2023: number, tax2025: number) {
  if (tax2023 <= 0 || tax2025 <= 0) return 0;
  return Math.pow(tax2025 / tax2023, 1 / 2) - 1;
}

function calcYoY(oldValue: number, newValue: number) {
  if (oldValue <= 0) return 0;
  return (newValue - oldValue) / oldValue;
}

function projectTaxes(
  baseYear: number,
  baseTax: number,
  growthRate: number,
  years: number
) {
  const rows: { year: number; tax: number }[] = [];
  let total = 0;

  for (let i = 0; i < years; i++) {
    const year = baseYear + i;
    const tax = baseTax * Math.pow(1 + growthRate, i);
    const rounded = round2(tax);
    total += rounded;
    rows.push({ year, tax: rounded });
  }

  return {
    rows,
    total: round2(total),
  };
}

function InputField({
  label,
  value,
  onChange,
  step = "0.01",
}: {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  step?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
      />
    </div>
  );
}

function MortgageForm({
  title,
  data,
  onChange,
}: {
  title: string;
  data: MortgageInput;
  onChange: (next: MortgageInput) => void;
}) {
  return (
    <Card className="rounded-2xl bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Home className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Property Name</Label>
          <Input
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Primary Home"
          />
        </div>

        <InputField
          label="Mortgage Balance"
          value={data.balance}
          onChange={(v) => onChange({ ...data, balance: v })}
        />
        <InputField
          label="Interest Rate (%)"
          value={data.rate}
          onChange={(v) => onChange({ ...data, rate: v })}
          step="0.001"
        />
        <InputField
          label="Monthly Payment (No Insurance)"
          value={data.monthlyPayment}
          onChange={(v) => onChange({ ...data, monthlyPayment: v })}
        />
        <InputField
          label="Term (Years)"
          value={data.termYears}
          onChange={(v) => onChange({ ...data, termYears: v })}
          step="1"
        />
        <InputField
          label="Property Tax 2023"
          value={data.tax2023}
          onChange={(v) => onChange({ ...data, tax2023: v })}
        />
        <InputField
          label="Property Tax 2024"
          value={data.tax2024}
          onChange={(v) => onChange({ ...data, tax2024: v })}
        />
        <InputField
          label="Property Tax 2025"
          value={data.tax2025}
          onChange={(v) => onChange({ ...data, tax2025: v })}
        />
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const [baseProjectionYear] = useState(2025);
  const [projectionYears, setProjectionYears] = useState(30);

  const [mortgage1, setMortgage1] = useState<MortgageInput>({
    name: "Property 1",
    balance: 490602.71,
    rate: 3.0,
    monthlyPayment: 2300.89,
    termYears: 30,
    tax2023: 9966.62,
    tax2024: 10695.13,
    tax2025: 11191.02,
  });

  const [mortgage2, setMortgage2] = useState<MortgageInput>({
    name: "Property 2",
    balance: 665047.21,
    rate: 6.875,
    monthlyPayment: 4467.12,
    termYears: 30,
    tax2023: 18014.29,
    tax2024: 18540.34,
    tax2025: 19463.85,
  });

  const analysis = useMemo(() => {
    const m1Mortgage = calcMortgage(
      mortgage1.balance,
      mortgage1.rate,
      mortgage1.monthlyPayment,
      mortgage1.termYears
    );
    const m2Mortgage = calcMortgage(
      mortgage2.balance,
      mortgage2.rate,
      mortgage2.monthlyPayment,
      mortgage2.termYears
    );

    const m1YoY2324 = calcYoY(mortgage1.tax2023, mortgage1.tax2024);
    const m1YoY2425 = calcYoY(mortgage1.tax2024, mortgage1.tax2025);
    const m2YoY2324 = calcYoY(mortgage2.tax2023, mortgage2.tax2024);
    const m2YoY2425 = calcYoY(mortgage2.tax2024, mortgage2.tax2025);

    const m1TaxGrowth = calcTaxGrowthCagr(mortgage1.tax2023, mortgage1.tax2025);
    const m2TaxGrowth = calcTaxGrowthCagr(mortgage2.tax2023, mortgage2.tax2025);

    const m1TaxProjection = projectTaxes(
      baseProjectionYear,
      mortgage1.tax2025,
      m1TaxGrowth,
      projectionYears
    );
    const m2TaxProjection = projectTaxes(
      baseProjectionYear,
      mortgage2.tax2025,
      m2TaxGrowth,
      projectionYears
    );

    const combinedRows: YearRow[] = Array.from({ length: projectionYears }).map(
      (_, i) => {
        const year = baseProjectionYear + i;
        const paymentAnnual = round2(
          mortgage1.monthlyPayment * 12 + mortgage2.monthlyPayment * 12
        );
        const projectedTax = round2(
          m1TaxProjection.rows[i].tax + m2TaxProjection.rows[i].tax
        );
        return {
          year,
          paymentAnnual,
          projectedTax,
          totalAnnualOutflow: round2(paymentAnnual + projectedTax),
        };
      }
    );

    return {
      m1Mortgage,
      m2Mortgage,
      m1YoY2324,
      m1YoY2425,
      m2YoY2324,
      m2YoY2425,
      m1TaxGrowth,
      m2TaxGrowth,
      m1TaxProjection,
      m2TaxProjection,
      combinedRows,
      totalMortgagePaid: round2(m1Mortgage.totalPaid + m2Mortgage.totalPaid),
      totalInterestPaid: round2(m1Mortgage.totalInterest + m2Mortgage.totalInterest),
      totalTaxes30Years: round2(m1TaxProjection.total + m2TaxProjection.total),
      totalCombined30Years: round2(
        m1Mortgage.totalPaid +
          m2Mortgage.totalPaid +
          m1TaxProjection.total +
          m2TaxProjection.total
      ),
    };
  }, [mortgage1, mortgage2, baseProjectionYear, projectionYears]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <Badge className="rounded-full px-3 py-1 text-sm">
                Next.js Mortgage + Tax Planner
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Mortgage and property tax projection dashboard
              </h1>
              <p className="max-w-3xl text-sm text-slate-600 md:text-base">
                Plug in mortgage balances, rates, monthly payments, and the last
                three years of property tax data. The UI calculates mortgage
                totals, tax growth, year-over-year changes, and a 30-year
                projection.
              </p>
            </div>
            <div className="w-full max-w-xs space-y-2">
              <Label>Projection Years</Label>
              <Input
                type="number"
                step="1"
                value={projectionYears}
                onChange={(e) => setProjectionYears(Number(e.target.value || 30))}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <MortgageForm title="Mortgage 1" data={mortgage1} onChange={setMortgage1} />
          <MortgageForm title="Mortgage 2" data={mortgage2} onChange={setMortgage2} />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4" /> Total Mortgage Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {currency(analysis.totalMortgagePaid)}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="h-4 w-4" /> Total Interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {currency(analysis.totalInterestPaid)}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" /> 30-Year Taxes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {currency(analysis.totalTaxes30Years)}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Total 30-Year Outflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {currency(analysis.totalCombined30Years)}
              </div>
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="taxes">Tax Growth</TabsTrigger>
            <TabsTrigger value="projection">30-Year Projection</TabsTrigger>
            <TabsTrigger value="amortization">Amortization</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {[
                {
                  label: mortgage1.name,
                  data: mortgage1,
                  mortgage: analysis.m1Mortgage,
                  cagr: analysis.m1TaxGrowth,
                  yoy1: analysis.m1YoY2324,
                  yoy2: analysis.m1YoY2425,
                },
                {
                  label: mortgage2.name,
                  data: mortgage2,
                  mortgage: analysis.m2Mortgage,
                  cagr: analysis.m2TaxGrowth,
                  yoy1: analysis.m2YoY2324,
                  yoy2: analysis.m2YoY2425,
                },
              ].map((item) => (
                <Card key={item.label} className="rounded-2xl bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <div className="text-slate-500">Mortgage total paid</div>
                        <div className="text-lg font-semibold">
                          {currency(item.mortgage.totalPaid)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Interest over life</div>
                        <div className="text-lg font-semibold">
                          {currency(item.mortgage.totalInterest)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Tax YoY 2023 → 2024</div>
                        <div className="text-lg font-semibold">
                          {percent(item.yoy1 * 100)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Tax YoY 2024 → 2025</div>
                        <div className="text-lg font-semibold">
                          {percent(item.yoy2 * 100)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Tax CAGR 2023 → 2025</div>
                        <div className="text-lg font-semibold">
                          {percent(item.cagr * 100)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">2025 Property tax</div>
                        <div className="text-lg font-semibold">
                          {currency(item.data.tax2025)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="taxes">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Card className="rounded-2xl bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{mortgage1.name} Tax Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2023 Tax</TableCell>
                        <TableCell>{currency(mortgage1.tax2023)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024 Tax</TableCell>
                        <TableCell>{currency(mortgage1.tax2024)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025 Tax</TableCell>
                        <TableCell>{currency(mortgage1.tax2025)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>YoY 2023 → 2024</TableCell>
                        <TableCell>{percent(analysis.m1YoY2324 * 100)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>YoY 2024 → 2025</TableCell>
                        <TableCell>{percent(analysis.m1YoY2425 * 100)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CAGR 2023 → 2025</TableCell>
                        <TableCell>{percent(analysis.m1TaxGrowth * 100)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{mortgage2.name} Tax Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2023 Tax</TableCell>
                        <TableCell>{currency(mortgage2.tax2023)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024 Tax</TableCell>
                        <TableCell>{currency(mortgage2.tax2024)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025 Tax</TableCell>
                        <TableCell>{currency(mortgage2.tax2025)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>YoY 2023 → 2024</TableCell>
                        <TableCell>{percent(analysis.m2YoY2324 * 100)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>YoY 2024 → 2025</TableCell>
                        <TableCell>{percent(analysis.m2YoY2425 * 100)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CAGR 2023 → 2025</TableCell>
                        <TableCell>{percent(analysis.m2TaxGrowth * 100)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projection">
            <Card className="rounded-2xl bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Combined Annual Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[560px] overflow-auto rounded-xl border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Mortgage Payments</TableHead>
                        <TableHead>Projected Taxes</TableHead>
                        <TableHead>Total Annual Outflow</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analysis.combinedRows.map((row) => (
                        <TableRow key={row.year}>
                          <TableCell>{row.year}</TableCell>
                          <TableCell>{currency(row.paymentAnnual)}</TableCell>
                          <TableCell>{currency(row.projectedTax)}</TableCell>
                          <TableCell>{currency(row.totalAnnualOutflow)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amortization">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Card className="rounded-2xl bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{mortgage1.name} Yearly Amortization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[520px] overflow-auto rounded-xl border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>Start Balance</TableHead>
                          <TableHead>Principal Paid</TableHead>
                          <TableHead>Interest Paid</TableHead>
                          <TableHead>End Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analysis.m1Mortgage.amortizationByYear.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{currency(row.startingBalance)}</TableCell>
                            <TableCell>{currency(row.principalPaid)}</TableCell>
                            <TableCell>{currency(row.interestPaid)}</TableCell>
                            <TableCell>{currency(row.endingBalance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{mortgage2.name} Yearly Amortization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[520px] overflow-auto rounded-xl border border-slate-200">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>Start Balance</TableHead>
                          <TableHead>Principal Paid</TableHead>
                          <TableHead>Interest Paid</TableHead>
                          <TableHead>End Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analysis.m2Mortgage.amortizationByYear.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{currency(row.startingBalance)}</TableCell>
                            <TableCell>{currency(row.principalPaid)}</TableCell>
                            <TableCell>{currency(row.interestPaid)}</TableCell>
                            <TableCell>{currency(row.endingBalance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <section className="rounded-2xl bg-white p-6 text-sm text-slate-600 shadow-sm">
          <p>
            Notes: Mortgage totals are based on the monthly payment you enter
            multiplied by the full term. Tax growth is projected using CAGR from
            2023 to 2025. Insurance is intentionally excluded.
          </p>
        </section>
      </div>
    </main>
  );
}

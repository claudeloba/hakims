"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Select } from "@/components/reusables/select";

export function DateDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPeriod = searchParams.get("period") || "last_week";
  const [period, setPeriod] = useState(initialPeriod);

  useEffect(() => {
    setPeriod(initialPeriod);
  }, [initialPeriod]);

  const handleChange = (e: any) => {
    const selectedPeriod = e.target.value;
    setPeriod(selectedPeriod);
    router.push(`/admin?period=${selectedPeriod}`);
  };

  return (
    <Select name="period" value={period} onChange={handleChange}>
      <option value="last_week">Senaste 7 dagar</option>
      <option value="last_two">Senaste 14 dagar</option>
      <option value="last_month">Senaste 30 dagar</option>
      <option value="last_quarter">Senaste 90 dagar</option>
    </Select>
  );
}

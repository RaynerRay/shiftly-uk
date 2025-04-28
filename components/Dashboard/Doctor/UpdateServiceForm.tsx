"use client";

import {
  updateDoctorProfileWithService,
} from "@/actions/services";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { DoctorProfile } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateServiceForm({
  profile,
}: {
  profile: DoctorProfile | undefined | null;
}) {
  const profileId = profile?.id;
  const initialPrice = profile?.hourlyWage ?? 100;
  const [price, setPrice] = useState(initialPrice);
  const [savingPrice, setSavingPrice] = useState(false);

  async function handleUpdatePrice() {
    setSavingPrice(true);
    const data = {
      hourlyWage: price,
    };
    try {
      await updateDoctorProfileWithService(profileId, data);
      toast.success("Price Updated Successfully");
      setSavingPrice(false);
    } catch (error) {
      console.log(error);
      setSavingPrice(false);
    }
  }

  return (
    <>
      <CardContent className="space-y-3">
        <div className="border shadow rounded-md p-4 mt-4">
          <div className="sm:col-span-4">
            <div className="flex items-center justify-between border-b">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">
                Update Hourly Price
              </h2>
              <Button disabled={savingPrice} onClick={handleUpdatePrice}>
                {savingPrice ? "Saving please wait..." : "Update Price"}
              </Button>
            </div>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  £
                </span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  autoComplete="price"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}
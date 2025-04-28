import { getAppointmentById } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { platformPercentage } from "@/lib/constants";
import { Building, Calendar, Clock, HandCoins, PiggyBank, } from "lucide-react";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const appointment = await getAppointmentById(id);

  // Calculate the platform fee based on percentage (platformPercentage is already in decimal form)
  const baseCharge = Math.max(
    appointment?.charge || 0,
    appointment?.finalCharge || 0
  );
  const platformFee = baseCharge * platformPercentage;
  const totalAmount = baseCharge + platformFee;

  return (
    <div className="container mx-auto px-4  max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-semibold tracking-tight first:mt-0">
            {appointment?.doctorName}
          </h2>

          <div className="flex items-center text-sm mt-4">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-semibold">Booking Hours</span>
            <span> : {appointment?.totalHours}</span>
          </div>
          <div className="flex items-center text-sm mt-4">
            <Building className="w-4 h-4 mr-2" />
            <span className="font-semibold">Work Site</span>
            <span> : {appointment?.location} </span>
          </div>

         
        </div>

        <div className="w-full md:w-auto text-left md:text-right">
          <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl font-medium tracking-tight first:mt-0">
            {appointment?.appointmentFormattedDate}
          </h2>
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {appointment?.appointmentTime?.toString().split(",")[0]}
            </span>
          </div>
          <div className="flex items-center text-sm mt-4">
            <HandCoins className="w-4 h-4 mr-2" />
            <span className="font-semibold">Fee</span>
            <span> : £ {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
     

      {/* Payment Section */}
      {appointment?.isCompleted && appointment?.status === "approved" && (
        <div className="border-2 border-blue-200 shadow rounded-md p-3 md:p-4 my-4">
          <div className="flex flex-col md:items-start md:justify-between">
            <div className="w-full">
              <h2 className="text-md md:text-lg font-semibold mb-2">
                Payment Details
              </h2>

              {/* Hours Comparison Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-2">
                <h3 className="font-medium text-gray-700 mb-2">
                  Hours Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500">Agreed Hours</p>
                    <p className="text-md font-semibold">
                      {appointment.totalHours || 0} hours
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500">Actual Hours</p>
                    <p className="text-md font-semibold">
                      {appointment.actualHours || 0} hours
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
                  {(appointment.actualHours || 0) >
                  (appointment.totalHours || 0) ? (
                    <p>
                      <span className="font-semibold">Note:</span> Using actual
                      worked hours ({appointment.actualHours} hours) for
                      calculation as they exceed agreed hours.
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Note:</span> Using agreed
                      hours ({appointment.totalHours} hours) for calculation.
                    </p>
                  )}
                </div>
              </div>

              {/* Pricing Details */}
              <div className="">
                {/* <p>
                  <span className="font-semibold">Total Hours:</span>{" "}
                  {Math.max(
                    appointment.totalHours || 0,
                    appointment.actualHours || 0
                  )}{" "}
                  hours
                </p> */}

                <div className="">
                  {/* <div className="flex justify-between items-center">
                <p><span className="font-semibold">Base Charge:</span></p>
                <p>£{baseCharge.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p><span className="font-semibold">Platform Fee ({(platformPercentage * 100).toFixed(2)}%):</span></p>
                <p>£{platformFee.toFixed(2)}</p>
              </div> */}
                  <div className="flex justify-between items-center pt-2 border-t ">
                    <p>
                      <span className="font-semibold">Total Amount:</span>
                    </p>
                    <p className="text-lg font-bold">
                      £{totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Transfer Details Section */}
              <div className="mt-2 bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-1 flex items-center">
                  <PiggyBank className="w-5 h-5 mr-2 text-blue-600" />
                  Bank Details
                </h3>
                
                <div className="">
                            
                  {/* Revolut Transfer */}
                  <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-purple-700 mb-2">Revolut Transfer</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Recipient:</p>
                        <p className="font-medium">CLOUDBREAK GROUP LIMITED</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Account Number:</p>
                        <p className="font-medium">23807894</p>
                      </div>
                      <div>
                        <p className="text-gray-500">IBAN:</p>
                        <p className="font-medium">GB86 REVO 0099 6906 0641 16</p>
                      </div>
                      <div>
                        <p className="text-gray-500">BIC:</p>
                        <p className="font-medium">REVOGB21</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Reference */}
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Payment Reference:</p>
                    <p className="bg-white px-3 py-2 rounded border border-blue-100 font-mono text-lg">
                      {appointment?.reference || `REF-${id}`}
                    </p>
                    <p className="text-sm text-blue-700 mt-2">
                    Please include this reference with your payment to ensure it&#39;s correctly allocated.

                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-6 md:mt-0 md:ml-4 flex justify-end">
              <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-5 h-5 transition-transform group-hover:scale-110" />
                </span>
                <span className="font-bold">Pay Now</span>
              </button>
            </div> */}
          </div>
        </div>
      )}

      {appointment?.status === "approved" ? (
        <div className="border-2 border-green-200 shadow rounded-md p-3 md:p-4 my-4">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-0">
                Appointment Approved
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
        <p className="font-semibold text-xs sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">
          Address
        </p>
        <p className="sm:px-3 w-full sm:w-3/4 text-xs">{appointment?.location}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:divide-x-2 px-2 md:px-4 py-3 divide-gray-200 border-b">
        <p className="font-semibold text-xs sm:px-3 mb-1 sm:mb-0 w-full sm:w-1/4">
          Description
        </p>
        <p className="sm:px-3 w-full sm:w-3/4 text-xs">
          {appointment?.appointmentReason}
        </p>
      </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-yellow-300 shadow rounded-md p-3 md:p-4 my-4">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <h2 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight py-2 mb-2 sm:mb-0">
                Appointment Status
              </h2>
              <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                {appointment?.status}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
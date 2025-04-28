import React from "react";
import { Doctor, DoctorProfileAvailability } from "@/types/types";
import { getDayName } from "@/utils/getDayName";
import { getFormattedDate } from "@/utils/getFormatedShortDate";
import {  Calendar, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { separateAndCapitalise } from "@/lib/utils";

interface DoctorCardProps {
  isInPerson?: boolean;
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({  doctor }) => {
  const today: keyof DoctorProfileAvailability = getDayName();
  const times = doctor.doctorProfile?.availability?.[today] ?? null;
  const formattedDate = getFormattedDate();
  const formattedProfession = doctor.doctorProfile?.profession
    ? separateAndCapitalise(doctor.doctorProfile.profession)
    : "";

  if (!times || times.length === 0) return null;

  return (
    <div className=" bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-400/40 :border-slate-700">
      <Link href={`/doctors/${doctor.slug}?id=${doctor.id}`} className="block">
        {/* Header Section with Image */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <Image
            src={doctor.doctorProfile?.profilePicture ?? "/doc-profile.jpeg"}
            width={320}
            height={200}
            alt={doctor.name}
            className="rounded-full h-32 w-32"
          />
          <div className="absolute bottom-4  right-2 z-20">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs font-semibold bg-blue-500/90 text-white rounded-full flex items-center">
                <BadgeCheck className="w-3 h-3 mr-1" />
                Available today
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-orange-500/90 text-white rounded-full">
                {doctor.doctorProfile?.gender}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Doctor Info */}
          <div className="mb-4">
          
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 :text-white truncate">
                {` ${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`}
              </h2>
            </div>
            
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-50 :bg-blue-900/30 text-blue-600 :text-blue-300 rounded-full">
              {formattedProfession}
            </span>
          </div>
          

          {/* Review Section */}
          <div className="mb-4">
            <p className="text-sm text-slate-600 :text-slate-300 line-clamp-1 italic">
              {doctor.doctorProfile?.bio}
            </p>
          </div>

          {/* Date and Price */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center text-slate-600 :text-slate-300">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedDate}
            </div>
            {/* <div className="flex items-center font-medium text-blue-600 :text-blue-400">
              from <span className="mx-1">£</span>
              {doctor.doctorProfile?.hourlyWage}
            </div> */}
          </div>

          {/* Available Times */}
          <div className="space-y-2">
            {/* <div className="flex items-center text-sm text-slate-600 :text-slate-300 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Available slots
            </div> */}
            <div className="grid grid-cols-3 gap-2">
              {times.slice(0, 5).map((time, index) => (
                <div
                  key={index}
                  className="py-1.5 px-3 text-sm bg-slate-100 :bg-slate-700 text-slate-700 :text-slate-300 rounded-lg text-center hover:bg-slate-200 :hover:bg-slate-600 transition-colors"
                >
                  {time}
                </div>
              ))}
              {times.length > 5 && (
                <div className="py-1.5 px-3 text-sm bg-blue-50 :bg-blue-900/30 text-blue-600 :text-blue-400 rounded-lg text-center hover:bg-blue-100 :hover:bg-blue-900/50 transition-colors font-medium">
                  +{times.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DoctorCard;
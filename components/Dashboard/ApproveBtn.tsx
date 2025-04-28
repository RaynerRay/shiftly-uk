"use client"
import { useState } from "react";
import { Check, X, AlertTriangle, Loader2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { updateDoctorStatus } from "@/actions/users"; 
import toast from "react-hot-toast";

type DoctorStatus = "PENDING" | "APPROVED" | "REJECTED";

interface ApproveBtnProps {
  status: DoctorStatus;
  profileId: string;
}

export default function ApproveBtn({ status, profileId }: ApproveBtnProps) {
  const [currentStatus, setCurrentStatus] = useState<DoctorStatus>(status);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: DoctorStatus) => {
    if (newStatus === currentStatus) return;
    
    setIsLoading(true);
    try {
      const response = await updateDoctorStatus(profileId, newStatus);
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      setCurrentStatus(newStatus);
      toast.success(`Doctor status updated to ${newStatus.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    
    switch (currentStatus) {
      case "PENDING":
        return <AlertTriangle className="h-4 w-4" />;
      case "APPROVED":
        return <Check className="h-4 w-4" />;
      case "REJECTED":
        return <X className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "APPROVED":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded ${getStatusColor()}`}
          disabled={isLoading}
        >
          {getStatusIcon()}
          {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).toLowerCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleStatusChange("PENDING")}
          disabled={currentStatus === "PENDING"}
        >
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span>Pending</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleStatusChange("APPROVED")}
          disabled={currentStatus === "APPROVED"}
        >
          <Check className="h-4 w-4 text-green-600" />
          <span>Approve</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleStatusChange("REJECTED")}
          disabled={currentStatus === "REJECTED"}
        >
          <X className="h-4 w-4 text-red-600" />
          <span>Reject</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
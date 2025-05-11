// import { getDoctorAppointments } from "@/actions/appointments";
import { getInboxMessages, getInboxSentMessages } from "@/actions/inbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MailListPanel from "@/components/Dashboard/Doctor/MailListPannel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Mail } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  // Updated to authorize USER, CLIENT, and INDIVIDUALCLIENT roles
  const authorizedRoles = ["USER", "CLIENT", "INDIVIDUALCLIENT"];
  
  if (!user?.role || !authorizedRoles.includes(user.role)) {
    return <NotAuthorized />;
  }
  
  const messages = (await getInboxMessages(user?.id)).data || [];
  const sentMessages = (await getInboxSentMessages(user?.id)).data || [];
  
  return (
    <div>
      {/* Header */}

      {/* 2 PANELS - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Content panel - Shows on top on mobile, 8 cols on right on larger screens */}
        <div className="md:col-span-8 order-1 md:order-2">
          {children}
        </div>
        
        {/* LIST PANEL - Shows below content on mobile, 4 cols on left on larger screens */}
        <div className="md:col-span-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 order-2 md:order-1">
          <PanelHeader
            title="Messages"
            count={messages.length ?? 0}
            icon={Mail}
          />
          <div className="px-3">
            <Tabs defaultValue="received" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="received" className="flex-1">
                  Received({messages.length.toString().padStart(2, "0")})
                </TabsTrigger>
                <TabsTrigger value="sent" className="flex-1">
                  Sent({sentMessages.length.toString().padStart(2, "0")})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received">
                <MailListPanel messages={messages} role={user.role} />
              </TabsContent>
              <TabsContent value="sent">
                <MailListPanel messages={sentMessages} role={user.role} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
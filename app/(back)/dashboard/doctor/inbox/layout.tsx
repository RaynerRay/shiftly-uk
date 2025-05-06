// import { getDoctorAppointments } from "@/actions/appointments";
import { getInboxMessages, getInboxSentMessages } from "@/actions/inbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MailListPanel from "@/components/Dashboard/Doctor/MailListPannel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Mail } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode} from "react";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "DOCTOR") {
    return <NotAuthorized />;
  }
  const messages = (await getInboxMessages(user?.id)).data || [];
  const sentMessages = (await getInboxSentMessages(user?.id)).data || [];
  
  // Check if the current path is for new message
  // const pathname = "not-implemented"; // We can't use client hooks in Server Components

  return (
    <div>
      {/* Header */}
      
      {/* Responsive Layout */}
      <div className="flex flex-col md:grid md:grid-cols-12">
        {/* Check pathname on client side with CSS order */}
        
        {/* Content Panel - Full width on mobile, 8 cols on md+ */}
        <div className="md:col-span-8 order-first md:order-last">{children}</div>
        
        {/* LIST PANEL - Full width on mobile, 4 cols on md+ */}
        <div className="md:col-span-4 py-3 border-t md:border-t-0 md:border-r border-gray-100 order-last md:order-first">
          <PanelHeader
            title=" Messages"
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
                <MailListPanel messages={messages} role={user?.role} />
              </TabsContent>
              <TabsContent value="sent">
                <MailListPanel messages={sentMessages} role={user?.role} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
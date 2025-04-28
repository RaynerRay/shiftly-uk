import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/frontend/VerifyTokenForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function VerifyAccount(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const id = props.params?.id as string;
  
  //Get a User from DB
  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role;
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Verify Token</CardTitle>
          <CardDescription>
            Please enter the 6-figure pass code sent to your email -{" "}
            {user?.email}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyTokenForm role={role} userToken={userToken} id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
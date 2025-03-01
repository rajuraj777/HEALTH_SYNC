"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { doctorSignIn } from "@/app/(main)/doctor-auth/authdoc.action";

export const DoctorSigninSchema = z.object({
  userId: z.string(),
  password: z.string().min(6),
});
const Doctorsignin = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof DoctorSigninSchema>>({
    resolver: zodResolver(DoctorSigninSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof DoctorSigninSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await doctorSignIn(values);
      if (res.success) {
        toast.success("Logged in successfully");
        router.push(`/doctor-dash/${res.id}`);
      } else {
        toast.error(res.error);
      }
    });
  }
  return (
    <Card className="w-[300px] sm:w-[430px] md:w-[540px] dark:bg-[rgba(31,41,55,0.5)] backdrop-blur-3xl">
      <CardHeader>
        <CardTitle>
          <span>Doctor Login</span>{" "}
          <PlusCircleIcon className="inline-block font-extrabold w-7"></PlusCircleIcon>
        </CardTitle>
        <CardDescription>Login in here.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique Id to Login </FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {isPending && <Loader2 className="animate-spin px-1"></Loader2>}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Doctorsignin;

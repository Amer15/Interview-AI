"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./form-field";
import { Form } from "./ui/form";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up" ? z.string().min(3).max(20) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(12),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        console.log("signing in.....");
        console.log(values);
      } else {
        console.log("signing up.....");
        console.log(values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="interview AI" height={32} width={38} />
          <h2>Interview AI</h2>
        </div>
        <h3 className="text-primary-100 text-center">
          practice your job interviews with AI
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                name="name"
                control={form.control}
                label="name"
                placeholder="enter your name"
                type="text"
              />
            )}
            <FormField
              name="email"
              control={form.control}
              label="email"
              placeholder="enter your email"
              type="email"
            />
            <FormField
              name="password"
              control={form.control}
              label="password"
              placeholder="enter password"
              type="password"
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Signin" : "Signup"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={!isSignIn ? "/signin" : "/signup"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "signin" : "signup"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

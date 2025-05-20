"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, LoginFormValues } from "@/schemas/authSchemas";
import GoogleAuth from "./GoogleAuth";
import { Spinner } from "../ui/spinner";

type LoginFormProps = {
  login: (data: LoginFormValues) => Promise<boolean>;
  loading: boolean;
  setError: (message: string) => void;
};

const LoginForm = ({ login, loading, setError }: LoginFormProps) => {

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  disabled={loading}
                  {...field}
                />
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
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <Button
            type="submit"
            className="w-full h-10 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner size={'small'} className="text-white" />
                <span className="ml-2">Log in</span>
              </div>
            ) : (
              "Log in"
            )}
          </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <GoogleAuth type="login" />
      </form>
    </Form>
  );
};

export default LoginForm;
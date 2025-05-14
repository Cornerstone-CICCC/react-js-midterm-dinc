"use client";

import { UserFormInputs, userSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/user/image-upload";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserProfileForm = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "New user",
      userName: "",
      bio: "",
    },
  });


  const bioValue = form.watch("bio");
  const bioLength = bioValue?.length || 0;
  const nameValue = form.watch("name");
  const nameLength = nameValue?.length || 0;
  const usernameValue = form.watch("userName");
  const usernameLength = usernameValue?.length || 0;

  const onSave: SubmitHandler<UserFormInputs> = async (data) => {
      // Upload the image to Firebase Storage
    // 
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Edit Profile
      </h1>
      


     
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <p className="text-right text-gray-400">{nameLength}/30</p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div>
                  <p className="text-right text-gray-400">{bioLength}/150</p>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage className="w-full" />
                  <p className="text-right w-full text-gray-400">
                    {usernameLength}/30
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
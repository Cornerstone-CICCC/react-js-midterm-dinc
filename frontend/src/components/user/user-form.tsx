'use client';

import { UserFormInputs, userSchema } from '@/schemas/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useFirebaseStorage } from '@/hooks/useFirebaseStorage';
import ImageUpload from './image-upload';
import useUserStore from '@/stores/useUserStore';
import { User } from '@/types/user';
import { useUser } from '@/hooks/useUser';
import { CommonAlert } from '../ui/common-alert';

const UserProfileForm = () => {
  const { user, setUser } = useUserStore();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { uploadImage } = useFirebaseStorage();
  const { onSubmit, loading, showError, errorMessage } = useUser(user?.id);

  const form = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      userName: '',
      bio: '',
      location: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        userName: user.userName || '',
        bio: user.bio || '',
        location: user.location || '',
      });
    }
  }, [user, form]);

  const bioValue = form.watch('bio');
  const bioLength = bioValue?.length || 0;
  const nameValue = form.watch('name');
  const nameLength = nameValue?.length || 0;
  const usernameValue = form.watch('userName');
  const usernameLength = usernameValue?.length || 0;

  const onSave: SubmitHandler<UserFormInputs> = async (data) => {
    if (!user) {
      throw new Error('User ID is not available');
    }

    try {
      // Upload the image to Firebase Storage
      let imageUrl = user.fileId;

      if (uploadedImage) {
        imageUrl = await uploadImage(
          uploadedImage,
          `profile-images/${user.id}`,
          user.fileId,
        );
      }

      const updatedUser: User = {
        id: user.id,
        name: data.name,
        bio: data.bio,
        location: data.location,
        userName: data.userName,
        fileId: imageUrl,
        email: user.email,
      };

      const res = await onSubmit(updatedUser);

      if (!res) {
        throw new Error('Failed to update user');
      }

      setUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 md:py-20">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <div className="mb-6">
        <CommonAlert
          show={showError}
          variant="destructive"
          title="Error"
          description={errorMessage}
        />
      </div>

      <ImageUpload
        image={user?.fileId || '/default-profile.png'}
        onFileSelect={setUploadedImage}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold mt-8">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="p-6 rounded-3xl"
                  />
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
                <FormLabel className="text-lg font-bold">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Bio"
                    className="rounded-xl resize-none"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location"
                    {...field}
                    className="p-6 rounded-3xl"
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage className="w-full" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="p-6 rounded-3xl"
                  />
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
          <Button
            className="w-full p-6 font-bold"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormInputs, productSchema } from '@/schemas/productSchema';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Images, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAX_IMAGES } from '@/constants/constants';
import { CATEGORIES } from '@/constants/categories';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CommonAlert } from '@/components/ui/common-alert';

interface ProductFormBaseProps {
  onSubmit: (
    data: ProductFormInputs,
    uploadedImages: File[],
    existingImageUrls: string[],
  ) => Promise<void>;
  loading: boolean;
  showError: boolean;
  errorMessage: string;
  initialData?: {
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrls: string[];
  };
  submitButtonText: string;
  onDelete?: () => void;
}

export const ProductFormBase = ({
  onSubmit,
  loading,
  showError,
  errorMessage,
  initialData,
  submitButtonText,
  onDelete,
}: ProductFormBaseProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    initialData?.imageUrls || [],
  );
  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    title: string;
    description: string;
  }>({
    show: false,
    title: '',
    description: '',
  });

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      category: initialData?.category || '',
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (
      existingImageUrls.length + uploadedImages.length + acceptedFiles.length >
      MAX_IMAGES
    ) {
      setAlertConfig({
        show: true,
        title: 'Image Limit',
        description: `You can only upload up to ${MAX_IMAGES} images in total.`,
      });
      return;
    }

    const validFiles = acceptedFiles.filter((file) => {
      const extension = file.name.toLowerCase().split('.').pop();
      return ['jpeg', 'jpg', 'png'].includes(extension || '');
    });

    if (validFiles.length !== acceptedFiles.length) {
      setAlertConfig({
        show: true,
        title: 'File Format Error',
        description: 'Only JPEG and PNG files are allowed.',
      });
    }

    setUploadedImages((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (file: File) => {
    setUploadedImages((prev) => prev.filter((image) => image !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    disabled: existingImageUrls.length + uploadedImages.length >= MAX_IMAGES,
  });

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '').trim();
    const numValue = Number(value);

    if (!value || (!isNaN(numValue) && numValue >= 0 && numValue <= 1000000)) {
      form.setValue('price', numValue);
    }
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString('en-US');
  };

  const handleSubmit = async (data: ProductFormInputs) => {
    await onSubmit(data, uploadedImages, existingImageUrls);
  };

  return (
    <div className="max-w-xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {initialData ? 'Edit listing' : 'Create listing'}
      </h1>

      <div className="mb-6">
        <CommonAlert
          show={showError}
          variant="destructive"
          title="Error"
          description={errorMessage}
        />
        <CommonAlert
          show={alertConfig.show}
          variant="destructive"
          title={alertConfig.title}
          description={alertConfig.description}
        />
      </div>

      {/* Image Previews */}
      <div className="space-y-3">
        <label className="block font-medium text-lg">Images</label>
        {(existingImageUrls.length > 0 || uploadedImages.length > 0) && (
          <div className="mb-4 grid grid-cols-3 gap-3">
            {existingImageUrls.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative w-40 h-40 border rounded overflow-hidden bg-gray-300"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={url}
                    alt={`Existing image ${index}`}
                    className="max-w-full max-h-full object-contain"
                    width={300}
                    height={300}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-stone-300 hover:text-stone-100 bg-stone-500/50 hover:bg-stone-500/80 rounded-full"
                  onClick={() => {
                    setExistingImageUrls((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}
            {uploadedImages.map((image, index) => (
              <div
                key={`uploaded-${index}`}
                className="relative w-40 h-40 border rounded overflow-hidden bg-gray-300"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index}`}
                    className="max-w-full max-h-full object-contain"
                    width={300}
                    height={300}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-stone-300 hover:text-stone-100 bg-stone-500/50 hover:bg-stone-500/80 rounded-full"
                  onClick={() => removeImage(image)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Drag-and-Drop Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-8 rounded-lg ${
            isDragActive ? 'border-gray-600' : 'border-gray-300'
          } ${existingImageUrls.length + uploadedImages.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="flex flex-col items-center justify-center gap-6">
              <Images className="h-12 w-12" />
              <p className="text-base text-gray-500">Drop your image here</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6">
              <Images className="h-12 w-12" />
              <p className="text-base text-gray-500">
                {existingImageUrls.length + uploadedImages.length >= MAX_IMAGES
                  ? `Maximum ${MAX_IMAGES} images reached`
                  : 'Drop your image here, or browse for images'}
              </p>
            </div>
          )}
        </div>
        <div className="text-right text-base mt-2">
          {existingImageUrls.length + uploadedImages.length}/{MAX_IMAGES}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.handleSubmit(handleSubmit)(e);
          }}
          className="space-y-6 mt-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    className="h-14 text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Description (recommended)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="resize-none h-40 text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl">
                      $
                    </span>
                    <Input
                      type="text"
                      placeholder="0"
                      min="0"
                      max="1000000"
                      className="pl-10 pr-4 h-14 text-2xl text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      {...field}
                      value={
                        field.value !== undefined && field.value !== null
                          ? formatPrice(field.value)
                          : ''
                      }
                      onChange={onPriceChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Category</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={
                          field.value === category ? 'default' : 'outline'
                        }
                        className="h-14 text-md"
                        onClick={() => field.onChange(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full p-5 text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Publishing...' : submitButtonText}
          </Button>

          {onDelete && (
            <Button
              variant="destructive"
              className="w-full p-5 text-lg"
              onClick={onDelete}
              type="button"
            >
              Delete
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

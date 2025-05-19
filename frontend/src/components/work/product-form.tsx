'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ProductFormInputs, productSchema } from '@/schemas/productSchema';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
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
import { useWork } from '@/hooks/useWork';
import { HttpRequestProductData } from '@/types/product';
import { CommonAlert } from '@/components/ui/common-alert';
import { useFirebaseStorage } from '@/hooks/useFirebaseStorage';
import useUserStore from '@/stores/useUserStore';
import useProductStore from '@/stores/useProductStore';

interface ProductFormProps {
  isEditMode?: boolean;
  onDelete?: () => void;
}

const ProductForm = ({ isEditMode = false, onDelete }: ProductFormProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { createWork, loading, showError, errorMessage, updateWork } =
    useWork();
  const { uploadImage } = useFirebaseStorage();
  const { user } = useUserStore();
  const { product, setProduct } = useProductStore();

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: isEditMode ? product?.name : '',
      description: isEditMode ? product?.description : '',
      price: isEditMode ? product?.price : 0,
      category: isEditMode ? product?.category : '',
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (uploadedImages.length + acceptedFiles.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images`);
      return;
    }
    setUploadedImages((prev) => [...prev, ...acceptedFiles]);
  };

  const removeImage = (file: File) => {
    setUploadedImages((prev) => prev.filter((image) => image !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    disabled: uploadedImages.length >= MAX_IMAGES,
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

  const onSubmit = (data: ProductFormInputs) => {
    if (!user) {
      return;
    }

    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    // Upload images to Firebase Storage
    const imageUrls: string[] = [];
    uploadedImages.forEach(async (image) => {
      imageUrls.push(
        await uploadImage(image, `products/${user.id}/${data.title}`),
      );
    });

    const newProduct: HttpRequestProductData = {
      name: data.title,
      price: data.price,
      description: data.description,
      imageUrls: imageUrls,
      category: data.category,
    };

    if (isEditMode && product) {
      updateWork(product.id, newProduct);
      setProduct(null);
    } else {
      createWork(newProduct);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isEditMode ? 'Edit listing' : 'Create listing'}
      </h1>

      <div className="mb-6">
        <CommonAlert
          show={showError}
          variant="destructive"
          title="Error"
          description={errorMessage}
        />
      </div>

      {/* Image Previews */}
      <div className="space-y-3">
        <label className="block font-medium text-lg">Images</label>
        {uploadedImages.length > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-3">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
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
          } ${uploadedImages.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                {uploadedImages.length >= MAX_IMAGES
                  ? `Maximum ${MAX_IMAGES} images reached`
                  : 'Drop your image here, or browse for images'}
              </p>
            </div>
          )}
        </div>
        <div className="text-right text-base mt-2">
          {uploadedImages.length}/{MAX_IMAGES}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
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
            {loading ? 'Publishing...' : 'Publish'}
          </Button>

          {isEditMode && onDelete && (
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

export default ProductForm;

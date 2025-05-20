'use client';

import { useWork } from '@/hooks/useWork';
import { useFirebaseStorage } from '@/hooks/useFirebaseStorage';
import useUserStore from '@/stores/useUserStore';
import useProductStore from '@/stores/useProductStore';
import { useRouter } from 'next/navigation';
import { ProductFormBase } from './product-form-base';
import { ProductFormInputs } from '@/schemas/productSchema';
import { Product } from '@/types/product';
import { CommonDialog } from '@/components/ui/common-dialog';
import { useState } from 'react';

export const ProductFormEdit = () => {
  const { updateWork, deleteWork, loading, showError, errorMessage } =
    useWork();
  const { uploadImage } = useFirebaseStorage();
  const { user } = useUserStore();
  const { product } = useProductStore();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (
    data: ProductFormInputs,
    uploadedImages: File[],
    existingImageUrls: string[],
  ) => {
    if (!user || !product) {
      return;
    }

    if (uploadedImages.length === 0 && existingImageUrls.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    const sanitizedTitle = data.title.replace(/\s+/g, '-').toLowerCase();

    try {
      // Upload new images to Firebase Storage
      const newImageUrls = await Promise.all(
        uploadedImages.map((image) =>
          uploadImage(image, `products/${user.id}/${sanitizedTitle}`),
        ),
      );

      const updatedProduct: Partial<Product> = {
        name: data.title,
        price: data.price,
        description: data.description,
        imageUrls: [...existingImageUrls, ...newImageUrls],
        categorySlug: data.category,
      };

      const result = await updateWork(product.id, updatedProduct);

      if (result) {
        router.push(`/`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!product) return;
    const res = await deleteWork(product.id);
    if (res) {
      router.push('/');
    }
    setIsDialogOpen(false);
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <ProductFormBase
        onSubmit={handleSubmit}
        loading={loading}
        showError={showError}
        errorMessage={errorMessage}
        initialData={{
          title: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          category: product.categorySlug || '',
          imageUrls: product.imageUrls || [],
        }}
        submitButtonText="Update"
        onDelete={handleDelete}
      />

      <CommonDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Delete Confirmation"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
};

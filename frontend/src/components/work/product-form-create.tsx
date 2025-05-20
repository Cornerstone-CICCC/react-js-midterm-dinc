'use client';

import { useWork } from '@/hooks/useWork';
import { useFirebaseStorage } from '@/hooks/useFirebaseStorage';
import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';
import { ProductFormBase } from './product-form-base';
import { ProductFormInputs } from '@/schemas/productSchema';
import { Product } from '@/types/product';

export const ProductFormCreate = () => {
  const { createWork, loading, showError, errorMessage } = useWork();
  const { uploadImage } = useFirebaseStorage();
  const { user } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (
    data: ProductFormInputs,
    uploadedImages: File[],
  ) => {
    if (!user) {
      return;
    }

    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    // ファイル名からスペースを削除し、ハイフンに置き換える
    const sanitizedTitle = data.title.replace(/\s+/g, '-').toLowerCase();

    try {
      // Upload images to Firebase Storage
      const imageUrls = await Promise.all(
        uploadedImages.map((image) =>
          uploadImage(image, `products/${user.id}/${sanitizedTitle}`),
        ),
      );

      const newProduct: Partial<Product> = {
        name: data.title,
        price: data.price,
        description: data.description,
        imageUrls: imageUrls,
        categorySlug: data.category,
      };

      const result = await createWork(newProduct);

      if (result) {
        router.push(`/`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  return (
    <ProductFormBase
      onSubmit={handleSubmit}
      loading={loading}
      showError={showError}
      errorMessage={errorMessage}
      submitButtonText="Publish"
    />
  );
};

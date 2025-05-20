'use client';

import { useWork } from '@/hooks/useWork';
import { useFirebaseStorage } from '@/hooks/useFirebaseStorage';
import useUserStore from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';
import { ProductFormBase } from './product-form-base';
import { ProductFormInputs } from '@/schemas/productSchema';
import { Product } from '@/types/product';
import { tilteToSlug } from '@/lib/utils';
import { useState } from 'react';
import { CommonAlert } from '@/components/ui/common-alert';

export const ProductFormCreate = () => {
  const { createWork, loading, showError, errorMessage } = useWork();
  const { uploadImage } = useFirebaseStorage();
  const { user } = useUserStore();
  const router = useRouter();
  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    title: string;
    description: string;
  }>({
    show: false,
    title: '',
    description: '',
  });

  const handleSubmit = async (
    data: ProductFormInputs,
    uploadedImages: File[],
  ) => {
    if (!user) {
      return;
    }

    if (uploadedImages.length === 0) {
      setAlertConfig({
        show: true,
        title: 'Image Required',
        description: 'Please upload at least one image.',
      });
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
        categorySlug: tilteToSlug(data.category),
      };

      const result = await createWork(newProduct);

      if (result) {
        router.push(`/`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setAlertConfig({
        show: true,
        title: 'Upload Error',
        description: 'Failed to upload images. Please try again.',
      });
    }
  };

  return (
    <>
      <div className="pb-6">
        <CommonAlert
          show={alertConfig.show}
          variant="destructive"
          title={alertConfig.title}
          description={alertConfig.description}
        />
      </div>
      <ProductFormBase
        onSubmit={handleSubmit}
        loading={loading}
        showError={showError}
        errorMessage={errorMessage}
        submitButtonText="Publish"
      />
    </>
  );
};

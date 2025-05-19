'use client';

import { useState } from 'react';
import ProductForm from '@/components/work/product-form';
import { CommonDialog } from '@/components/ui/common-dialog';
import { useWork } from '@/hooks/useWork';
import useProductStore from '@/stores/useProductStore';
import { useRouter } from 'next/navigation';
const EditWorkPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteWork } = useWork();
  const { product } = useProductStore();
  const router = useRouter();
  const onDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsDialogOpen(false);
    if (product) {
      const res = await deleteWork(product._id);
      if (res) {
        router.push('/');
      }
    }
  };

  return (
    <div>
      <ProductForm isEditMode={true} onDelete={onDelete} />

      <CommonDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Delete Confirmation"
        description="Are you sure you want to delete this product?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default EditWorkPage;

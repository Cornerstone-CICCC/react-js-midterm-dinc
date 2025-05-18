'use client';

import { useState } from 'react';
import ProductForm from '@/components/work/product-form';
import { CommonDialog } from '@/components/ui/common-dialog';

const EditWorkPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
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

import { Metadata } from 'next';
import { ProductFormEdit } from '@/components/work/product-form-edit';

export const metadata: Metadata = {
  title: 'Edit Work - DINCT',
  description: 'Generated by create next app',
};

const EditWorkPage = () => {
  return (
    <div className="px-4">
      <ProductFormEdit />
    </div>
  );
};

export default EditWorkPage;

import UserProfileForm from '@/components/user/user-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile - DINCT',
  description: 'Generated by create next app',
};

const EditUserProfilePage = () => {
  return (
    <div className="px-4">
      <UserProfileForm />
    </div>
  );
};

export default EditUserProfilePage;

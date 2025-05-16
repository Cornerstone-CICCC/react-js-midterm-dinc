import ProfileUI from '@/components/profile/profile-ui';

const UserPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  // TODO: get user
  const user = {
    id: userId,
    name: 'John Doe',
    userName: 'johndoe',
    location: 'Vancouver, BC, Canada',
    email: 'john.doe@example.com',
    bio: 'I am a software engineer',
  };  

  // TODO: get products
  const products = [
    {
      id: '1',
      name: 'Producttttttttttttttttttttttttttttttttttttttttttttttttttttt 1',
      description: 'Product 1 description',
      price: 100,
      imageUrl: '/test.jpeg',
      categoryId: '1',
      userId: '1',
      status: true,
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ];

  return (
    <div className="px-0 sm:px-10 lg:px-16 py-0">
      <ProfileUI user={user} isOwnProfile={false} products={products} />
    </div>
  )
}

export default UserPage;

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import path from 'path';
import { connectDB } from '../../config/db';
import User from '../../models/userModel';
import { IUser } from '../../types/user';
import fs from 'fs';

const users = [
  {
    name: 'Alice Monroe',
    userName: 'aliceart',
    email: 'alice@example.com',
    password: 'alice123',
    bio: 'Abstract artist and painter from New York.',
    fileId: 'https://robohash.org/alice.jpg',
  },
  {
    name: 'David Lee',
    userName: 'dlee_sketches',
    email: 'david@example.com',
    password: 'david123',
    bio: 'Graphite drawing and realism specialist.',
    fileId: 'https://robohash.org/david.jpg',
  },
  {
    name: 'Kira Nova',
    userName: 'kiranova',
    email: 'kira@example.com',
    password: 'kira123',
    bio: 'Digital surrealist and fantasy concept artist.',
    fileId: 'https://robohash.org/kira.jpg',
  },
  {
    name: 'Luca Bell',
    userName: 'lbell_sculpt',
    email: 'luca@example.com',
    password: 'luca123',
    bio: 'Stone and ceramic sculptor based in Italy.',
    fileId: 'https://robohash.org/luca.jpg',
  },
];

export const seedUsers = async () => {
  await connectDB();

  console.log('Seeding users...');
  console.log(`Total users to seed: ${users.length}`);
  console.log('----------------------------------');

  for (const user of users) {
    const exists = await User.findOne({ email: user.email });

    if (exists) {
      console.log(`⚠️ User already exists: ${user.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.create({
      ...user,
      password: hashedPassword,
    });

    console.log(`✅ Inserted user: ${user.email}`);
  }

  mongoose.connection.close();
  console.log('🎉 User seeding complete.');
};

seedUsers();

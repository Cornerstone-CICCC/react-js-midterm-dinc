'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useIsMobile from '@/hooks/useIsMobile';
import useUserStore from '@/stores/useUserStore';
import { HomeIcon, LogIn, LogOut, Plus, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const styles = {
  base: 'fixed z-10 flex items-center px-4',
  mobile:
    'justify-around py-4 shadow-2xs bg-white border-1 bottom-4 rounded-4xl right-5 left-5',
  pc: 'md:justify-between md:py-4 md:w-full md:border-b-2 md:border-black md:bg-white',
};

const Header = () => {
  const { user, setUser } = useUserStore();
  const isMobile = useIsMobile();
  const [mounted, setMoundted] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:4500/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }
      const data = await res.json();
      console.log('Logout response:', data);

      // Clear the user from zustand store
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    setMoundted(true);
  }, []);

  if (!mounted || isMobile === null) return null;
  return (
    <>
      {isMobile ? (
        <header className={`${styles.base} ${styles.mobile}`}>
          <h1 className="font-bold">
            <Button
              asChild
              size={'icon'}
              variant={'secondary'}
              className="size-10 rounded-full px-0 py-0"
            >
              <Link href="/" className="flex flex-col gap-2">
                <HomeIcon />
                <span className="sr-only">DINCT</span>
              </Link>
            </Button>
          </h1>
          {user !== null ? (
            <>
              <Button
                asChild
                size={'icon'}
                variant={'secondary'}
                className="size-10 rounded-full px-0 py-0"
              >
                <Link href={`/work/new`}>
                  <Plus className="size-5" />
                </Link>
              </Button>
              <Button
                size={'icon'}
                className="size-10 rounded-full px-0 py-0"
                asChild
                variant={'secondary'}
              >
                <Link href={`/user-profile/1`}>
                  <Avatar className="flex items-center justify-center">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarImage
                      src={'https://github.com/shadcn.png'}
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button
                size={'icon'}
                className="size-10 rounded-full px-0 py-0"
                asChild
                variant={'secondary'}
                onClick={handleLogout}
              >
                <span>
                  <LogOut />
                  <span className="sr-only">Logout</span>
                </span>
              </Button>
            </>
          ) : (
            <Button
              asChild
              size={'icon'}
              variant={'secondary'}
              className="size-10 rounded-full px-0 py-0"
            >
              <Link href={`/login`}>
                <LogIn className="size-5" />
              </Link>
            </Button>
          )}
        </header>
      ) : (
        <header className={`${styles.base} ${styles.pc}`}>
          <h1 className="font-bold">
            <Link href="/" className="flex flex-col gap-2">
              <span>DINCT</span>
            </Link>
          </h1>
          <div>
            <nav>
              <ul className="flex gap-3 items-center">
                {user !== null ? (
                  <>
                    <li>
                      <Button
                        asChild
                        size={'icon'}
                        variant={'outline'}
                        className="size-10 rounded-full px-0 py-0"
                      >
                        <Link href={`/work/new`}>
                          <Plus className="size-5" />
                        </Link>
                      </Button>
                    </li>
                    <li>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size={'icon'}
                            className="size-10 rounded-full px-0 py-0"
                          >
                            <Avatar className="flex items-center justify-center">
                              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                              <AvatarImage
                                src={'https://github.com/shadcn.png'}
                                className="object-cover"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Profile</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={6} align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/user-profile/1`}>
                              <UserRound />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            <span>Logout</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  </>
                ) : (
                  <li>
                    <Button
                      asChild
                      size={'icon'}
                      variant={'ghost'}
                      className="size-10 px-0 py-0"
                    >
                      <Link href={`/login`}>
                        <LogIn className="size-5" />
                      </Link>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;

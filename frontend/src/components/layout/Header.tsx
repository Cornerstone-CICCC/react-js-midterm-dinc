import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, Plus, UserRound } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const isLogin = false;
  return (
    <header className="w-full flex justify-between px-4 py-4 border-b-2 border-black items-center fixed">
      <h1 className="font-bold">
        <Link href="/" className="flex flex-col gap-2">
          <span>DINCT</span>
        </Link>
      </h1>
      <div>
        <nav>
          <ul className="flex gap-3 items-center">
            {isLogin ? (
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
                      <DropdownMenuItem>
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
  );
};

export default Header;

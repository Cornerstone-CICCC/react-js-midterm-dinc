import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="border-t-2 border-black px-5 py-6 flex flex-col-reverse gap-10 justify-between md:items-center md:flex-row">
      <p className="uppercase text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} DINCT. All rights reserved.
      </p>
      {/** fake links */}
      <ul className="flex gap-7">
        <li>
          <Button variant={'link'}>Guide</Button>
        </li>
        <li>
          <Button variant={'link'}>Terms of Use</Button>
        </li>
        <li>
          <Button variant={'link'}>Privacy Policy</Button>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

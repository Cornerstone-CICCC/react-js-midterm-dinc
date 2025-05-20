const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t-2 border-black bg-white px-4 py-4 flex flex-col-reverse justify-between md:static md:gap-10 md:py-6 md:items-center md:flex-row">
      <p className="uppercase text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} DINCT. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

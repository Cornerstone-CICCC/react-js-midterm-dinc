const Footer = () => {
  return (
    <footer className="border-t-2 border-black px-4 py-4 flex flex-col-reverse justify-between md:gap-10 md:py-6 md:items-center md:flex-row">
      <p className="uppercase text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} DINCT. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

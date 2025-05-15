import { Button } from "@/components/ui/button";

const GoogleButton = () => (
  <Button type="button" variant="outline" className="w-full border-2">
    <img
      src="https://www.google.com/favicon.ico"
      alt="Google"
      className="w-5 h-5 mr-2"
    />
    Sign in with Google
  </Button>
);

export default GoogleButton;
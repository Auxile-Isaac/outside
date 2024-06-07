import React from "react";
import { useRouter } from 'next/router';
import { Button, Dialog } from "@material-tailwind/react";

const SignInButton = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // Use router.push to navigate to the desired route
    router.push('/sign-in');
    setOpen((cur) => !cur);
  };

  return (
    <>
      <Button onClick={handleOpen}>Sign In</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        {/* Your dialog content goes here */}
      </Dialog>
    </>
  );
}

export default SignInButton;

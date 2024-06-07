// components/ListingCard.js
import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

// Define ListingCard function with preferred syntax
const ListingCard = ({ listing }) => {
  const { id, name, images, shortCaption, startDate, host, description, price, location} = listing;
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  return (
    <Card className="w-full max-w-[26rem] shadow-lg mb-8">
      <CardHeader floated={false} color="blue-gray">
      <div className="relative h-48">
          <Image
            src={images[0]}
            alt="Listing Image"
            className="object-cover rounded-t"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton size="sm" color="red" variant="text" className="!absolute top-4 right-4 rounded-full">
          {/* Your close button icon */}
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {name}
          </Typography>
          <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
            Hosted by: {host.username}
          </Typography>
        </div>
        <Typography color="gray">
          Start Date: {startDate}
        </Typography>
        <Typography color="gray">{shortCaption}</Typography>
      </CardBody>
      <CardFooter className="pt-3">
        <Button onClick={handleOpen} size="lg" fullWidth={true}>
          Book
        </Button>
      </CardFooter>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {name}
          <Typography className="ml-2 font-normal text-gray-600">
            Hosted by: {host.username}
          </Typography>
        </DialogHeader>
        <DialogBody className="h-48 overflow-y-auto">
          <Image
            src={images[0]}
            alt="Listing Image"
            className="object-cover rounded-t w-full"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <Typography className="mt-4 font-normal">{description}</Typography>
          <Typography className="mt-2 font-normal">Price: {price}</Typography>
          <Typography className="mt-2 font-normal">Location: {location}</Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            Book
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

// Export the ListingCard component
export default ListingCard;

import React from "react";
import {
  Carousel,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

function TestimonialBlock() {
  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
      },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="custom-button-group !absolute">
        <button onClick={previous} className="carousel-button carousel-button-left">
          <ArrowLeftCircleIcon className="text-altru-blue border-altru-blue p-2 border-2 rounded-full" />
        </button>
        <button onClick={next} className="carousel-button carousel-button-right">
          <ArrowRightCircleIcon className="text-altru-blue border-2 p-2 rounded-full border-altru-blue" />
        </button>
      </div>
    );
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <div className="container mx-auto w-[1000px]">
        <Card className="bg-white rounded-lg shadow-md overflow-hidden w-[1000px]">
          <CardHeader className="px-4 py-6 flex items-center justify-between">
            <Typography variant="h2" color="altru-blue">
              HEAR FROM OUR USERS
            </Typography>
            <Typography variant="subtitle1" color="gray-600">
              The go-to curated art, culture, and design recommendation platform
            </Typography>
          </CardHeader>
          <CardBody className="p-4">
            <Carousel
              arrows={true} // Show the arrow buttons
              className="mt-8 rounded-xl h-[200px]"
            >
              <Card className="mx-4">
                <CardHeader className="p-6 flex items-center">
                  <Avatar size="xl" src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703250249/Web%20App%20Assets/Testimonials/luladey_ndwyg8.jpg" alt="Luladey Tukele" />
                  <div className="ml-4">
                    <Typography variant="h5" color="text-gray-900">
                      Luladey Tukele
                    </Typography>
                    <Typography variant="body2" color="text-gray-500">
                      Founder & CEO / Events by Lula
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <Typography variant="body2" color="text-gray-700">
                    Outside in Rwanda has not only expanded my reach as an experience host but also connected me with like-minded individuals seeking unique events, allowing me to curate unforgettable experiences with ease.
                  </Typography>
                </CardBody>
              </Card>
              <Card className="mx-4">
                <CardHeader className="p-6 flex items-center">
                  <Avatar size="xl" src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703250235/Web%20App%20Assets/Testimonials/clementkigalisoul_ckof2i.jpg" alt="Clement Iraguha" />
                  <div className="ml-4">
                    <Typography variant="h5" color="text-gray-900">
                    Clement Iraguha
                    </Typography>
                    <Typography variant="body2" color="text-gray-500">
                    Kigali Soul
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <Typography variant="body2" color="text-gray-700">
                  Listing my art, culture, and design space on Outside in Rwanda&rsquo;s platform was a breeze, and the exposure my venue gained was phenomenal, attracting a diverse range of creative events and people; their commitment to promoting local creativity is commendable.
                  </Typography>
                </CardBody>
              </Card>
              <Card className="mx-4">
                <CardHeader className="p-6 flex items-center">
                  <Avatar size="xl" src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703250265/Web%20App%20Assets/Testimonials/brighton_slcijj.jpg" alt="Brighton Mboya" />
                  <div className="ml-4">
                    <Typography variant="h5" color="text-gray-900">
                    Brighton Mboya
                    </Typography>
                    <Typography variant="body2" color="text-gray-500">
                    Domestic Tourist
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <Typography variant="body2" color="text-gray-700">
                  Outside in Rwanda is my trusted guide for exploring the country's art, culture, and design scenes, introducing me to hidden gems and authentic experiences that have enriched my appreciation for creativity. 
                  </Typography>
                </CardBody>
              </Card>
              <Card className="mx-4">
                <CardHeader className="p-6 flex items-center">
                  <Avatar size="xl" src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703250342/Web%20App%20Assets/Testimonials/Susanfine_txt2ap.webp" alt="Susan Fine" />
                  <div className="ml-4">
                    <Typography variant="h5" color="text-gray-900">
                    Susan Fine
                    </Typography>
                    <Typography variant="body2" color="text-gray-500">
                    International Tourist
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <Typography variant="body2" color="text-gray-700">
                  Outside in Rwanda's curated recommendations effortlessly guided me to immerse myself in Rwanda's art, culture, and design scene, making my travel experience seamless and memorable. 
                  </Typography>
                </CardBody>
              </Card>
              {/* ... your other testimonial cards */}
            </Carousel>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default TestimonialBlock;

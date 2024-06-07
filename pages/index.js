
import React from 'react';
import Hero from './Hero';
import ComplexNavbar from './Header';
import Image from 'next/image';
import Flag from '../public/images/flag.jpg';
// import ListingCard from './listings/[id]';
import CategoryCard from './CategoryCard';
import TestimonialBlock from './TestimonialBlock';
import Footer from './Footer';
import Partners from './Partners';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import prisma from '../lib/prisma.js';

export async function getStaticProps() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        listings: {
          include: {
            host: true,
          },
        },
      },
    });

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        categories: [],
      },
    };
  }
}

const HomePage = (props) => {
  return (
    <div>
      <div>
        <ComplexNavbar/>
      </div>
      <Hero />
      <div className="container px-4 py-6 mx-auto gap-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 mr-32">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Outside in Rwanda - Your adventure awaits!</h2>

              <p className="text-gray-600 mb-4">
                We&apos;re on a mission to showcase and promote Rwanda&apos;s rich art, culture, and design heritage, while also providing tourists with a seamless booking experience.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">For tourists:</h3>

              <p className="text-gray-600 mb-4">
                Discover the land of a thousand hills like never before with Outside In Rwanda. We offer a variety of unique art, culture, and design experiences. Book your next adventure today and create memories that will last a lifetime.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">For listing hosts:</h3>

              <p className="text-gray-600 mb-4">
                Get more visibility for your experiences and seamless bookings with a variety of payment options. We&apos;re here to help you share Rwanda&apos;s beauty with the world. List your experience today!
              </p>

              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">List an Experience</button>
            </div>
            <div className="flex-shrink-0">
              <Image src={Flag} alt="Image" className="w-80 h-[500px] object-cover rounded" />
            </div>
            
          </div>
          
        </div>
        
      </div>
      {/* Content Block End */}
      <main color="red" className="container mx-auto">
        {props.categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </main>
      {/* <Card color="transparent"className="p-10 rounded-lg shadow-md">
      <Typography text="bold" variant="h2" color="blue-gray" className="mb-4">
        HEAR FROM OUR USERS
      </Typography>
      <Typography variant="subtitle2" color="gray-600">
        The go-to curated art, culture, and design recommendation platform for tourists and event hosts
      </Typography>
      <Card  shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="tania andrew"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Tania Andrew
            </Typography>
          </div>
          <Typography color="blue-gray">Frontend Lead @ Google</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>
          &quot;I found solution to all my design needs from Creative Tim. I use
          them as a freelancer in my hobby projects for fun! And its really
          affordable, very humble guys !!!&quot;
        </Typography>
      </CardBody>
    </Card>

       
      </Card> */}
       <TestimonialBlock />
        <Partners />
      <div>
        <Footer />
      </div>

      

    
    </div>
  );
}
export default HomePage;
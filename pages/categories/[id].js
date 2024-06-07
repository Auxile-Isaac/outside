import React from 'react';
import { PrismaClient } from '@prisma/client';
import ListingCard from '../ListingCard';


const prisma = new PrismaClient();

// export async function getStaticPaths() {
//   const categories = await prisma.category.findMany();
//   const paths = categories.map((category) => ({
//     params: { id: category.name.toLowerCase() }, // Assuming name is unique
//   }));
//   return {
//     paths,
//     fallback: 'blocking', // or 'false' if you don't want fallback
//   };
// }

export async function getServerSideProps() {
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
        // listings: JSON.parse(JSON.stringify(listings)),
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        categories: [],
        // listings: [],
      },
    };
  }
}

const CategoryListings = ({categories}) => { // Receive props
  const { name, listings = [] } = categories;
  
  
  return (
    <div className="mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default CategoryListings;

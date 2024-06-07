import React from "react";
import Image from "next/image";

const Partners = () => {
    return (
        <section>
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:py-24 lg:px-8">
        <h2 class="text-center text-sm font-bold text-gray-600">
            OUR SUPPORTERS
        </h2>
        <div class="flex flex-wrap overflow-hidden lg:px-5">
            <div class="flex flex-wrap overflow-hidden lg:px-20">
                <Image src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703690052/Web%20App%20Assets/Partners/african-leadership-network-aln-accelerator-for-early-stage-companies-career-cover-20190630-18143519-removebg-preview_1_t5tcfc.png" 
                alt="supporter"
                width={150} // Add the width here
                height={50} // Keep max-height for consistency
                />
            </div>
            <div class="mt-20 flex w-1/2 justify-center md:w-1/5">
                <Image src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703688566/Web%20App%20Assets/Partners/visit-rwanda-logo-7E46D2B135-seeklogo.com_xelevw.png" 
                alt="supporter"
                width={50} // Add the width here
                height={50} // Keep max-height for consistency
                />
            </div>
            <div class="mt-20 flex w-1/2 justify-center md:w-1/5">
                <Image src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703688682/Web%20App%20Assets/Partners/RCB_LOGO2_o100lx.jpg" 
                alt="supporter"
                width={50} // Add the width here
                height={50} // Keep max-height for consistency
                />
            </div>
            <div class="mt-20 flex w-1/2 justify-center md:w-1/5">
                <Image src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703688938/Web%20App%20Assets/Partners/sand-tech_logo_wqrfx1.webp" 
                alt="supporter"
                width={70} // Add the width here
                height={50} // Keep max-height for consistency
                />
            </div>
            <div class="mt-20 flex w-1/2 justify-center md:w-1/5">
                <Image src="https://res.cloudinary.com/dxb8sk5iu/image/upload/v1703688938/Web%20App%20Assets/Partners/sand-tech_logo_wqrfx1.webp" 
                alt="supporter"
                width={70} // Add the width here
                height={50} // Keep max-height for consistency
                />
            </div>
        </div>

        

     </div>
  </section>

    );
}

export default Partners;


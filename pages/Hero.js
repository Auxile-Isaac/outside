import { Carousel } from "@material-tailwind/react";
import hero1Image from "../public/images/hero1.jpeg";
import hero2Image from "../public/images/hero2.jpeg";
import hero3Image from "../public/images/hero3.jpeg";
import hero4Image from "../public/images/hero4.jpeg";
import hero5Image from "../public/images/hero5.jpg";
// import hero6Image from "../public/images/hero6.jpg";
import hero7Image from "../public/images/hero7.jpg";
import Image from 'next/image';



 
const Hero = () => {
  return (
    <div className=""> 
      <Carousel
      className="rounded-xl h-screen"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute fixed bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <Image
        src={hero1Image}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      
  
        <Image
        src={hero2Image}
        alt="image 2"
        className="h-full w-full object-cover"
      /> 
      <Image
        src={hero3Image}
        alt="image 3"
        className="h-full w-full object-cover"
      />
     <Image
        src={hero4Image}
        alt="image 4"
        className="h-full w-full object-cover"
      />
      <Image
        src={hero5Image}
        alt="image 5"
        className="h-full w-full object-cover"
      />
      {/* <Image
        src={hero6Image}
        alt="image 6"
        className="h-full w-full object-cover"
      /> */}
      <Image
        src={hero7Image}
        alt="image 7"
        className="h-full w-full object-cover"
      />


    </Carousel>
    </div>
  );
}
export default Hero;
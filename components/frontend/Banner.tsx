import { FC } from 'react';
import { LucideProps } from 'lucide-react';
import DoctorsListCarousel from '../DoctorsListCarousel';
import { Doctor } from "@/types/types";

interface BannerProps {
  title?: string;
  subtitle?: string;
  buttonLink?: string;
  backgroundImage?: string;
  icon?: FC<LucideProps>;
  imageSrc?: string | null;
  // imageAlt?: string;
  buttonClassName?: string;
  doctors: Doctor[];
  // isInPerson?: boolean;
  bgClassName?: string;
}

const Banner: FC<BannerProps> = ({
  title,
  buttonLink,
  doctors,
  bgClassName,
}) => {
  return (
    <section className="border-y border-sky-500 overflow-x-hidden ">
      <div className="">
        <div className={bgClassName}>
          {/* {backgroundImage && (
            <img
              className="absolute top-0 left-0 xl:-ml-40 w-full h-full"
              src={backgroundImage}
              alt="Background"
            />
          )} */}
          <div className=" px-4">
            <div className="py-6 max-w-7xl mx-auto">
           
                <div className="">
                <span className="text-lg md:text-xl text-gray-700">{title}</span>
                {/* <a
                className=" bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold  py-2 px-2 rounded-md  transition duration-200"
                href={buttonLink}
              >
                See All
              </a> */}
                </div>
              
              <h2 className="mt-4 mb-4 text-xl md:text-3xl font-bold font-heading text-gray-900">Featured {title}</h2>
              <a
                className="inline-block bg-sky-600 hover:bg-[#5caff9] text-white font-normal font-heading py-2 px-3 rounded-md text-xs uppercase transition duration-200"
                href={buttonLink}
              >
                See All
              </a>
            </div>
            <div className="relative ml-auto w-full md:w-2/6  flex items-center justify-center">
             
              
            </div>
            
          </div>
          <div className="max-w-7xl mx-auto rounded-md py-4 pb-20">
             
                <DoctorsListCarousel doctors={doctors} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

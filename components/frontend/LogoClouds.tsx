
import InfiniteLogoSlider from "./InfiniteLogoSlider";

export default function LogoClouds() {

  const logos = [
    { id: 1, name: 'Company 1', imageUrl: '/NHS.webp' },
    { id: 2, name: 'Company 2', imageUrl: '/NMC.webp' },
    { id: 3, name: 'Company 3', imageUrl: '/SCC.webp' },
    { id: 4, name: 'Company 4', imageUrl: '/LB-Awards.webp' },
    { id: 5, name: 'Company 5', imageUrl: '/SCC.webp' },

  ];

  return (
    <section className="py-2 xl:pt-6 border-t  border-gray-300 mt-20 md:mt-2">
      <div className="py-2 px-4 mx-auto max-w-7xl bg-white ">
      <div className="mb-8 text-center">
  <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-sky-500 bg-sky-100 font-medium uppercase rounded-full">
    Trusted Healthcare Partners
  </span>
  <h3 className="mb-4 text-2xl md:text-3xl text-gray-900 font-bold tracking-tighter">
    Partnered with Leading Healthcare Institutions
  </h3>
  <p className="text-md md:text-lg text-gray-500 font-medium">
    Our platform is trusted by top NHS trusts and private healthcare providers, 
    ensuring a reliable and streamlined experience for healthcare professionals.
  </p>
</div>


        <div className="flex flex-wrap justify-center -mx-4">
     
           <InfiniteLogoSlider 
        logos={logos} 
        speed={20} // Optional: customize animation speed
      />
        </div>
      </div>
    </section>
  );
}

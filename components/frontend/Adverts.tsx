
import { Truck, ShieldCheck, Star } from "lucide-react";

const Adverts = () => {
  return (
    <section className="relative overflow-hidden py-6 bg-sky-100 rounded-md">
      <div className="container px-4 mx-auto ">
        <div className="flex flex-col items-center space-y-6">
          {/* Nationwide Coverage */}
          <div className="text-center">
            <div className="mb-3 mx-auto bg-sky-400 w-12 h-12 rounded-full flex items-center justify-center">
              <Truck className="text-white w-6 h-6" />
            </div>
            <p className="text-sky-800 text-sm font-bold">Nationwide Coverage</p>
            <p className="text-sky-600 text-sm">
              Access vetted healthcare professionals across the UK.
            </p>
          </div>

         {/* Fully Vetted Professionals */}
         <div className="text-center">
            <div className="mb-3 mx-auto bg-sky-400 w-12 h-12 rounded-full flex items-center justify-center">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <p className="text-sky-800 text-sm font-bold">
              Fully Vetted Professionals
            </p>
            <p className="text-sky-600 text-sm">
              Trust our rigorous vetting process for complete peace of mind.
            </p>
          </div>

          {/* Best Care Support */}
          <div className="text-center">
            <div className="mb-3 mx-auto bg-sky-400 w-12 h-12 rounded-full flex items-center justify-center">
              <Star className="text-white w-6 h-6" />
            </div>
            <p className="text-sky-800 text-sm font-bold">Best Care Support</p>
            <p className="text-sky-600 text-sm">
              Find nurses, care workers, and social workers with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adverts;

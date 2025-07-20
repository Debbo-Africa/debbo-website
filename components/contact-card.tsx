import Image from "next/image";

export default function ContactCard() {
  return (
    <div className="relative w-full h-96 md:h-[30rem] lg:h-full rounded-2xl overflow-hidden group">
      <Image
        src="/images/contact-image.jpg"
        alt="Contact"
        fill
        className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 origin-center"
      />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
        <p className="text-white text-xl sm:text-2xl text-left max-w-md  font-medium">
          We look forward to hearing from you and being a part of your health
          journey.
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

type HowItWorksCardProps = {
  image: React.ReactNode;
  step: string;
  title: string;
  description: string;
  stepColor?: string;
};

export default function HowItWorksCard({
  image,
  step,
  title,
  description,
  stepColor = "text-general-black",
}: HowItWorksCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-full max-w-[350px] h-[200px] flex items-center justify-center rounded-xl overflow-hidden ">
        {image}
      </div>
      <div className=" max-w-[350px] mx-auto">
        <h4 className={`text-md font-extrabold  text-general-black `}>
          <h4 className={`inline-block  ${stepColor}`}>{step}</h4>{" "}
          <span>{title}</span>
        </h4>
        <p className="text-sm text-body-text-gray mt-2">{description}</p>
      </div>
    </div>
  );
}

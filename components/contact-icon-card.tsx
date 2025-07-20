import Image from "next/image";

interface IconCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export default function IconCard({
  icon,
  title,
  description,
  className,
}: IconCardProps) {
  return (
    <div
      className={`flex flex-col items-start gap-2 bg-[--surface-card] p-6 pb-16 lg:pr-28 py-10 rounded-xl w-full cursor-pointer  ${className}`}
    >
      <Image src={icon} alt={title} width={32} height={32} />
      <p className="text-sm text-body-text-gray">{title}</p>
      <p className="font-semibold text-lg text-general-black">{description}</p>
    </div>
  );
}

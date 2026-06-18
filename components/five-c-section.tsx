import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const items = [
  {
    title: "Deliver Continuous Care",
    desc: "We ensure employees are guided through to diagnosis, specialist care and follow-up support that improve actual health outcomes.",
  },
  {
    title: "Preventive-First Model",
    desc: "We help organizations prevent productivity loss before it happens through early detection and structured intervention.",
  },
  {
    title: "Built for African Workforce Realities",
    desc: "Our programmes are designed around African workplace structures, healthcare access gaps, and employee wellbeing challenges.",
  },
  {
    title: "Measurable Business Impact",
    desc: "We connect employee health outcomes directly to absenteeism reduction, productivity gains, and workforce stability.",
  },
];

export default function FiveCSection() {
  return (
    <section className="pb-16 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-[#d9542c] relative">
        <div className="absolute left-0 right-0 bottom-0 lg:top-0 bg-[url('/images/footer-bg.png')] opacity-20 bg-center h-80"></div>

        <div className="relative z-10 lg:w-[50%] lg:pl-16 px-4 py-10 md:p-10 text-white">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 max-w-[20rem] font-serif">
            What Makes D&eacute;bboafrica Different
          </h2>
          <ul className="space-y-6 text-sm sm:text-base">
            {items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={20} className="text-white" />
                </span>
                <div>
                  <span className="font-bold block text-sm">{item.title}</span>
                  <span className="block text-sm opacity-90">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden relative z-10 lg:w-[50%] w-full lg:flex items-end">
          <Image
            src="/images/5cs-woman.png"
            alt="Professional woman"
            width={800}
            height={900}
            className="w-full object-contain"
            priority
          />
        </div>
        <div className="lg:hidden relative z-10 w-full flex items-end">
          <Image
            src="/images/5cs-woman1.png"
            alt="Professional woman"
            width={800}
            height={900}
            className="w-full object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

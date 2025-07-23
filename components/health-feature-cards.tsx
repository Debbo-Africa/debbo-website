import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function HealthFeatureCards() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-light text-general-black mb-4">
          Your <span className="text-yellow font-medium">Body.</span>
        </h1>
        <p className=" max-w-2xl mx-auto leading-relaxed">
          At DelibalAfrica, we understand that African women's health journeys
          are unique. That's why we created a mobile app that cares for your
          health needs, so you can live well and on your own terms.
        </p>
      </div>

      <div className="mb-6 overflow-hidden rounded-3xl relative min-h-[400px] md:min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/virtual-care.png"
            alt="Virtual care background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="flex-1 text-white mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Access Virtual
              <br />
              Care with a Tap
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-md">
              Speak to doctors or specialists through secure video calls,
              wherever you are.
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-row gap-4 absolute bottom-8 left-8">
          <Image
            src="/images/playstore-small.svg"
            alt="Play Store"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
          <Image
            src="/images/appstore-small.svg"
            alt="App Store"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="overflow-hidden text-center rounded-3xl bg-yellow min-h-[480px]">
          <div className="p-6 pb-0 h-full flex flex-col">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Book Tests in Minutes
            </h2>
            <p className="text-white/90 leading-relaxed flex-grow">
              Skip the queues. Schedule lab tests from anywhere—fast, easy, and
              reliable.
            </p>

            <div className="w-full h-72 lg:h-96 relative">
              <Image
                src="/images/book-test-mockup.png"
                alt="Book tests phone mockup"
                fill
                className="lg:object-cover"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-secondary-debbo1 text-center min-h-[480px]">
          <div className="p-6 pb-0 h-full flex flex-col">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Never Miss a Checkup
            </h2>
            <p className="text-white/90 leading-relaxed flex-grow">
              Set reminders to stay on top of your wellness checks and
              appointments, no more guesswork.
            </p>

            <div className="flex justify-center mt-4">
              <div className="w-full  h-72 lg:h-96 relative">
                <Image
                  src="/images/miss-cehckup-mockup.png"
                  alt="Checkup reminder phone mockup"
                  fill
                  className="lg:object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden rounded-3xl relative min-h-[420px] md:min-h-[450px]">
        <div className="absolute inset-0">
          <Image
            src="/images/old-woman-bg.png"
            alt="Track matters background"
            fill
            className="hidden md:block object-cover "
          />
          <Image
            src="/images/old-woman-bg-small.png"
            alt="Track matters background"
            fill
            className="object-cover md:hidden"
          />
        </div>

        <div className="relative z-10  md:p-12 md:px-6 lg:px-12 pb-0 flex flex-col lg:flex-row lg:items-center">
          <div className="flex-1 text-white mb-8 lg:mb-0 lg:mr-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Track What Truly
              <br />
              Matters
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-xs lg:max-w-md">
              Our AI-powered triage tool assesses your symptoms and connects you
              to the care you need, when you need it.
            </p>
            <div className=" flex gap-1 mb-8 ">
              <Image
                src="/images/icon-logo.svg"
                alt="Track matters phone mockup"
                className="object-contain w-6 h-6"
                width={10}
                height={10}
              />
              <p>Dr Déb</p>
            </div>

            <div className="flex flex-row gap-4">
              <Image
                src="/images/playstore-large.svg"
                alt="Play Store"
                width={140}
                height={45}
                className="h-auto w-auto"
              />
              <Image
                src="/images/appstore-large.svg"
                alt="App Store"
                width={140}
                height={45}
                className="h-auto w-auto"
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="w-64 h-72 md:w-96 md:h-96  relative md:absolute md:-bottom-1/4 md:left-1/2">
              <Image
                src="/images/iphone.png"
                alt="Track matters phone mockup"
                fill
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

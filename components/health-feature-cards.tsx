import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Apple, Play } from "lucide-react";
import Image from "next/image";

export default function HealthFeatureCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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

      <Card className="mb-6 overflow-hidden rounded-3xl relative min-h-[400px] md:min-h-[500px]">
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
      </Card>

      {/* Second Row - Two Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Book Tests Card */}
        <Card className="overflow-hidden rounded-3xl bg-yellow min-h-[350px]">
          <div className="p-8 h-full flex flex-col">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Book Tests in Minutes
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed flex-grow">
              Skip the queues. Schedule lab tests from anywhere—fast, easy, and
              reliable.
            </p>

            {/* Phone Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-48 h-60 relative">
                <Image
                  src="/images/"
                  alt="Book tests phone mockup"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Never Miss Checkup Card */}
        <Card className="overflow-hidden rounded-3xl bg-yellow min-h-[350px]">
          <div className="p-8 h-full flex flex-col">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Never Miss a Checkup
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed flex-grow">
              Set reminders to stay on top of your wellness checks and
              appointments, no more guesswork.
            </p>

            {/* Phone Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-48 h-60 relative">
                <Image
                  src="/images/"
                  alt="Checkup reminder phone mockup"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden rounded-3xl relative min-h-[400px] md:min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/old-woman-bg.png"
            alt="Track matters background"
            fill
            className="object-cover "
          />
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-center">
          <div className="flex-1 text-white mb-8 lg:mb-0 lg:mr-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Track What Truly
              <br />
              Matters
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-md">
              Our AI-powered triage tool assesses your symptoms and connects you
              to the care you need, when you need it.
            </p>

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
            <div className="w-64 h-80 relative">
              <Image
                src="/images/iphone.png"
                alt="Track matters phone mockup"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

"use client";

import Image from "next/image";

interface OurStorySectionProps {
  title?: string;
  content?: string;
  imageSrc?: string;
  imageAlt?: string;
  backgroundColor?: string;
}

export function OurStorySection({
  title = "Our Story",
  content = "As African women and trained medical professionals, over the years, we grew tired of telling women they had come too late. Too late for treatment. Too late to change the outcome. DébboAfrica was born from that shared urgency, to rewrite the story and make care timely, accessible, and truly centred on the health needs of African women. We connect African women to evidence-based care that is culturally relevant and delivered with empathy. From trusted professionals to health education, we're making healthcare easier to access and easier to trust.",
  imageSrc = "/images/our-story.png",
  imageAlt = "DébboAfrica team",
  backgroundColor = "",
}: OurStorySectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-general-black">
              {title}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-text leading-relaxed text-lg">{content}</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] ">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

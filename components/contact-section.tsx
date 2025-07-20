import ContactCard from "./contact-card";
import ContactForm from "./contact-form";
import IconCard from "./contact-icon-card";

export default function ContactSection() {
  return (
    <section className="px-4 sm:px-8 py-16 space-y-12 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 md:hidden">
        <IconCard
          icon="/images/office-location.svg"
          title="Visit our office"
          description="Block 52, Plot 1, Omorinre Johnson, Lekki Phase I, Lagos"
        />
        <IconCard
          icon="/images/envelope.svg"
          title="Reach out to us"
          description="info@debbo.africa"
        />
        <IconCard
          icon="/images/call-outgoing.svg"
          title="Call us at"
          description="+234 913 007 6332"
        />
      </div>

      <div className="hidden md:flex md:flex-col gap-4 lg:hidden">
        <div className="flex flex-col w-full">
          <IconCard
            icon="/images/office-location.svg"
            title="Visit our office"
            description="Block 52, Plot 1, Omorinre Johnson, Lekki Phase I, Lagos"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full">
            <IconCard
              icon="/images/envelope.svg"
              title="Reach out to us"
              description="info@debbo.africa"
            />
          </div>
          <div className="w-full">
            <IconCard
              icon="/images/call-outgoing.svg"
              title="Call us at"
              description="+234 913 007 6332"
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-row gap-4">
        <IconCard
          icon="/images/office-location.svg"
          title="Visit our office"
          description="Block 52, Plot 1, Omorinre Johnson, Lekki Phase I, Lagos"
        />
        <IconCard
          icon="/images/envelope.svg"
          title="Reach out to us"
          description="info@debbo.africa"
        />
        <IconCard
          icon="/images/call-outgoing.svg"
          title="Call us at"
          description="+234 913 007 6332"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:items-stretch">
        <div className=" lg:w-1/2">
          <ContactCard />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold text-general-black mb-6">Say Hello</h2>
          <div className="flex-grow">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

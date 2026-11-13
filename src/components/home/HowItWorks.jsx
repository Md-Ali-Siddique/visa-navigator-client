import { Fade } from "react-awesome-reveal";
import SectionTitle from "../SectionTitle";

const steps = [
  { title: "Find your visa", text: "Filter by visa type and compare fees, validity and processing time side by side." },
  { title: "Check the paperwork", text: "Open a visa to see the full document list, age limit and how to apply." },
  { title: "Apply in one form", text: "Confirm your name and email in the pop-up and send the application." },
  { title: "Follow it through", text: "Search your applications by country and cancel any you no longer need." },
];

const HowItWorks = () => (
  <section className="bg-base-200 py-16">
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle eyebrow="Simple process" title="How applying works" text="Four steps from searching to a tracked application." />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Fade cascade damping={0.15} triggerOnce>
          {steps.map((step, i) => (
            <div key={step.title} className="bg-base-100 border border-base-300 rounded-box p-6 h-full">
              <span className="font-display text-4xl font-extrabold text-primary">{i + 1}</span>
              <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm opacity-80">{step.text}</p>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  </section>
);

export default HowItWorks;

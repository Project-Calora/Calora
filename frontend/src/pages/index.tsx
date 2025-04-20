import { Link } from "@heroui/link";
import { button as buttonStyles } from "@/components/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* HERO SECTION */}
      <section
        id="home"
        className="flex flex-col items-center justify-center gap-4 py-16 md:py-24 scroll-mt-24"
      >
        <div className="inline-block max-w-2xl text-center justify-center">
          <span className={title({ color: "green" })}>Calora&nbsp;</span>
          <div className={subtitle({ class: "mt-4 text-lg md:text-xl" })}>
            Your personal AI nutrition companion. Log meals with ease, track
            macronutrients and minerals, and visualize your health journey.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "customGreen",
              radius: "full",
              variant: "shadow",
            })}
            href={"#contact"}
          >
            Sign Up
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="max-w-4xl mx-auto px-6 py-24 text-center scroll-mt-24"
      >
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="text-default-500 text-lg">
          Calora helps you understand what you eat. It’s built for people who
          want to track, improve, and master their nutrition using smart AI
          guidance and beautiful visualizations.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-24 scroll-mt-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">🧠 AI Meal Logging</h3>
            <p className="text-default-500">
              Log meals using plain language — Calora breaks it down for you.
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              📊 Macro & Mineral Tracking
            </h3>
            <p className="text-default-500">
              Daily insights on your nutrition intake with simple visuals.
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">📈 Trends & Insights</h3>
            <p className="text-default-500">
              Discover patterns and progress over time with interactive charts.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="max-w-2xl mx-auto px-6 py-24 text-center scroll-mt-24"
      >
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p className="text-default-500 mb-6">
          Got feedback or want to collaborate? We would love to hear from you!
        </p>
        <a
          href="mailto:support@calora.app"
          className="text-primary underline hover:text-success transition"
        >
          support@calora.app
        </a>
      </section>
    </DefaultLayout>
  );
}

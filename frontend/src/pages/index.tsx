import { Link } from "@heroui/link";
import { button as buttonStyles } from "@/components/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-16 md:py-24">
        <div className="inline-block max-w-2xl text-center justify-center">
          {/* <span className={title()}>Make&nbsp;</span> */}
          <span className={title({ color: "green" })}>Calora&nbsp;</span>
          <br />
          {/* <span className={title()}>
            websites regardless of your design experience.
          </span> */}
          <div className={subtitle({ class: "mt-4 text-lg md:text-xl" })}>
            Your personal AI nutrition companion. Log meals with ease, track macronutrients and minerals, and visualize your health journey.
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
            href={siteConfig.links.docs}
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
    </DefaultLayout>
  );
}

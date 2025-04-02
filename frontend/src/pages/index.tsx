import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {/* <span className={title()}>Make&nbsp;</span> */}
          <span className={title({ color: "green" })}>Calora&nbsp;</span>
          <br />
          {/* <span className={title()}>
            websites regardless of your design experience.
          </span> */}
          <div className={subtitle({ class: "mt-4" })}>
            Calorie tracking made simple.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "success",
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

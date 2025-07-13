import Image from "next/image";
import Link from "next/link";

import SectionHeading from "@/components/headings/SectionHeading";
import { MainLayout } from "@/components/layout/main-layout";
import SocialButton from "@/components/SocialButton";
import { Button } from "@/design-system/Button";

export default function Home() {
  return (
    <MainLayout>
      <article className="flex flex-col mb-8 gap-8">
        <section className="flex justify-between gap-4 items-start">
          <header>
            <h2 className="text-4xl">Mert Akça</h2>
            <p aria-hidden className="text-sm mb-1">
              <i lang="en">/Mehrt AHK-chah/</i>
            </p>
            <p>Software engineer / UX enthusiast / Game designer</p>
          </header>
          <Image
            className="rounded-full border-2 border-opacity-80 border-white"
            src="/images/me.jpeg"
            alt="A photo of me"
            width={100}
            height={100}
          />
        </section>
        <section>
          <SectionHeading>Introduction</SectionHeading>
          <p className="text-justify">
            I&apos;m a passionate caffeine enthusiast and METU graduate with a
            love for user experience and problem-solving. My goal is to deliver
            efficient, stylish, and accessible solutions to real-world
            challenges while making a positive impact through my work.
          </p>
          <Button className="mt-4" href="/works">
            My Works &gt;
          </Button>
        </section>
        <section>
          <SectionHeading>What I do (TL;DR)</SectionHeading>
          <ul className="py-4 flex flex-col gap-2 list-disc">
            <li>
              I am a full-time Software Engineer with a strong experience on
              Front-end side of the stack. (Both mobile and web)
            </li>
            <li>
              I create puzzle games and treasure hunts for events, companies and
              organizations.
            </li>
            <li>
              I review and redesign various resumes. I do it now from{"  "}
              <Link
                className="underline text-primary-500 hover:text-primary-400"
                href="https://www.linkedin.com/services/page/94044132028a119877/"
              >
                Linkedin
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <SectionHeading>
            A Mystery Game: Zehra is Missing (now also in English!)
          </SectionHeading>
          <Image
            height="400"
            width="400"
            src="/images/zehra-missing.jpeg"
            alt="Zehra Kayıp, Aranıyor"
          />
          <p className="my-2">
            Uncover the truth behind a woman&apos;s mysterious disappearance
            four days ago. Dive deep into a case that&apos;s more twisted than
            it seems, filled with intricate puzzles and challenges.
          </p>
          <p>
            Embark on a thrilling journey to find the missing woman. Use your
            detective instincts to follow the clues and solve the mystery.
            &apos;Zehra is Missing&apos; awaits!
          </p>

          <Button
            href="/zehra"
            target="_blank"
            className="mt-4"
          >
            Game Page &gt;
          </Button>
        </section>

        <section>
          <SectionHeading>Further Links</SectionHeading>
          <ul className="flex flex-col gap-2">
            <li>
              <SocialButton href="https://linkedin.com/in/mertakca">
                Linkedin @mertakca
              </SocialButton>
            </li>
            <li>
              <SocialButton href="https://github.com/utarit">
                GitHub @utarit
              </SocialButton>
            </li>
            <li>
              <SocialButton href="https://medium.com/@mertakca">
                Medium @mertakca
              </SocialButton>
            </li>
          </ul>
        </section>
      </article>
    </MainLayout>
  );
}

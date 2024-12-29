import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/Banner";
import SectionHeading from "@/components/headings/SectionHeading";
import { MainLayout } from "@/components/layout/main-layout";
import SocialButton from "@/components/SocialButton";

export default function Home() {
  return (
    <MainLayout>
      <article className="flex flex-col mb-8">
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
            alt="A photo of Mert Akca"
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
          <ul className="py-4 flex flex-col gap-2">
            <li>☕ Coffee-fueled coder with a creative mindset</li>
            <li>🎮 Puzzle game and escape room designer</li>
            <li>
              💡 Dedicated to crafting innovative, user-friendly solutions
            </li>
            <li>🌟 Driven by the desire to make a meaningful difference</li>
          </ul>
          <Link
            href="/works"
            className="bg-teal-600 dark:bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-white dark:text-black px-4 py-2 rounded-md mt-4 font-semibold inline-block"
          >
            My Works &gt;
          </Link>
        </section>
        <section className="my-4">
          <SectionHeading>
            A Mystery Game: Zehra is Missing (in Turkish)
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

          <Link
            href="/zehra"
            target="_blank"
            className="bg-teal-600 dark:bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-white dark:text-black mt-4 px-4 py-2 rounded-md font-semibold inline-block"
          >
            Game Page &gt;
          </Link>
        </section>

        <section>
          <SectionHeading>Further Links</SectionHeading>
          <ul>
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

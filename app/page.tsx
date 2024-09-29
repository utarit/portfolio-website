import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/Banner";
import SectionHeading from "@/components/headings/SectionHeading";
import { MainLayout } from "@/components/layout/main-layout";
import SocialButton from "@/components/SocialButton";

export default function Home() {
  return (
    <MainLayout>
      <article className="flex flex-col">
        <section className="flex justify-between gap-4">
          <header>
            <h2 className="text-4xl">Mert Akça</h2>
            <p>Front-end developer / Game creator / Cat owner</p>
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
            As a passionate caffeine addict and a graduate of METU, I am driven
            by my love for coding and problem-solving. My ultimate goal is to
            provide efficient, stylish, and accessible solutions to real-world
            issues. In addition to my coding expertise, I also enjoy creating
            puzzle games, directing short films, and cracking escape rooms.
            Above all, I strive to make a positive impact on people&apos;s lives
            through my work and hope to continue doing so.
          </p>
          <Link
            href="/works"
            className="bg-teal-600 dark:bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-white dark:text-black px-4 py-2 rounded-md mt-4 font-semibold inline-block"
          >
            My Works &gt;
          </Link>
        </section>
        <section className="my-4">
          <SectionHeading>My Latest Game (in Turkish for now)</SectionHeading>
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
            href="https://drive.google.com/file/d/1DMDHivLVKPKmiTIpLmELuRE4Gdo5ZzVf/view"
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

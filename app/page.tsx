import SocialButton from "@/components/SocialButton";
import SectionHeading from "@/components/headings/SectionHeading";
import Image from "next/image";
import Link from "next/link";

const timeline = [
  {
    year: "2009",
    desc: "Came out on top 🥇 in a TV contest",
  },
  {
    year: "2015",
    desc: "Achieved the 121st rank in the national university entrance exam 👨‍🏫",
  },
  {
    year: "2016",
    desc: "Conducted METU Life Saving First Aid Society and became a first aid instructor 🩹",
  },
  {
    year: "2021",
    desc: "Graduated as an honour student 👨‍🎓 and now building a career in UX & front-end development",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
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
          As a passionate caffeine addict and a graduate of METU, I am driven by
          my love for coding and problem-solving. My ultimate goal is to provide
          efficient, stylish, and accessible solutions to real-world issues. In
          addition to my coding expertise, I also enjoy creating puzzle games,
          directing short films, and cracking escape rooms. Above all, I strive
          to make a positive impact on people&apos;s lives through my work and
          hope to continue doing so.
        </p>
        <Link
          href="/works"
          className="bg-teal-300 hover:bg-teal-400 active:bg-teal-500 text-black px-4 py-2 rounded-md mt-4 font-semibold inline-block"
        >
          My Works
        </Link>
      </section>
      <section>
        <SectionHeading>A small timeline</SectionHeading>
        <table>
          <tbody>
            {timeline.map((el) => (
              <tr key={el.year}>
                <td className="font-bold align-top pr-4">{el.year}</td>
                <td>{el.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </main>
  );
}

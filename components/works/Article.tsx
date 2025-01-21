import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/design-system/Button";

type Props = {
  title: string;
  year: string;
  children: React.ReactNode;
  pills: Array<{
    label: string;
    value: string;
  }>;
  images: Array<string>;
};

const Article = ({ title, year, children, pills, images }: Props) => {
  return (
    <article>
      <header className="flex gap-2 items-center">
        <Button href="/works" variant="text" size="sm">
          Works
        </Button>
        &gt;
        <h2 className="text-xl">{title}</h2>
        <time className="self-start dark:bg-gray-600 bg-gray-200 text-xs px-1 font-bold rounded-sm">
          {year}
        </time>
      </header>
      {typeof children === "string"
        ? <p className="indent-4">{children}</p>
        : children}
      <dl className="grid grid-cols-[96px_auto] gap-4 py-4">
        {pills.map((el) => (
          <React.Fragment key={el.label}>
            <dt className="bg-green-200 text-green-900 dark:bg-opacity-10 dark:bg-green-500  dark:text-green-200 rounded uppercase text-xs px-1 font-bold flex justify-center items-center">
              {el.label}
            </dt>
            <dd>
              {el.value.includes("http")
                ? (
                  <Button
                    variant="text"
                    size="sm"
                    href={el.value}
                    target="_blank"
                  >
                    {el.value}
                  </Button>
                )
                : (
                  el.value
                )}
            </dd>
          </React.Fragment>
        ))}
      </dl>
      <ul>
        {images.map((url) => (
          <Image
            className="mb-4 rounded-md"
            width={500}
            height={400}
            src={url}
            key={url}
            alt={"Some example images for " + title}
          />
        ))}
      </ul>
    </article>
  );
};

export default Article;

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  thumbnail: string;
  title: string;
  description?: string;
  url: string;
  blank?: boolean;
};
const GridItem = ({ thumbnail, title, description, url, blank }: Props) => {
  return (
    <li>
      <Link href={url} target={blank ? "_blank" : undefined}>
        <Image
          className="rounded-md h-[200px] object-cover"
          src={thumbnail}
          alt={title}
          height={200}
          width={400}
        />
      </Link>
      <h3 className="text-xl mt-2">{title}</h3>
      {description && <p>{description}</p>}
    </li>
  );
};

export default GridItem;

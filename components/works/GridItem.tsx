import React from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
  thumbnail: string;
  title?: string;
  description: string;
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
          alt={title || description}
          height={200}
          width={400}
        />
      </Link>
      {title && <h3 className="text-xl mt-2 font-medium">{title}</h3>}
      <p className={classNames(!title && "mt-2")}>{description}</p>
    </li>
  );
};

export default GridItem;

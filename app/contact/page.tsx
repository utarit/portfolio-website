import React from "react";
import Link from "next/link";

import { MainLayout } from "@/components/layout/main-layout";

const ContactPage = () => {
  return (
    <MainLayout>
      <section>
        <h2 className="mb-4 text-2xl">Contact me</h2>
        <form action="https://formspree.io/f/mnqkpdze" method="POST">
          <fieldset className="flex flex-col gap-4 border-2 border-orange-400 dark:border-gray-400 p-4 rounded-md">
            <legend className="px-1">The form</legend>
            <label className="flex flex-col gap-2">
              <p>
                Name <small className="text-red-600">*</small>
              </p>
              <input
                className="p-2 rounded dark:text-black"
                required
                name="name"
                autoComplete="name"
                type="text"
                placeholder="John Smith"
              />
            </label>
            <label className="flex flex-col gap-2">
              <p>
                Email <small className="text-red-600">*</small>
              </p>
              <input
                className="p-2 rounded dark:text-black"
                name="email"
                autoComplete="email"
                type="email"
                inputMode="email"
                placeholder="john.smith@email.com"
              />
            </label>
            <label className="flex flex-col gap-2">
              <p>
                Message <small className="text-red-600">*</small>
              </p>
              <textarea
                className="p-2 rounded dark:text-black"
                required
                maxLength={200}
                name="message"
                rows={4}
                placeholder="I loved the website!"
              />
            </label>
            <button
              type="submit"
              className="bg-orange-400 dark:bg-gray-500 hover:bg-opacity-80 active:bg-opacity-60 dark:hover:bg-opacity-80 dark:active:bg-opacity-60 rounded py-1 px-4 w-fit"
            >
              Send
            </button>
          </fieldset>
        </form>
      </section>

      <section className="mt-4">
        <h3 className="text-lg mb-2">or just reach me via</h3>

        <address>
          <a href="mailto:mertakca.dev@gmail.com">mertakca.dev@gmail.com</a>
        </address>

        <Link
          className="bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-4 rounded mt-4 block w-fit mb-8"
          target="_blank"
          href="https://linkedin.com/in/mertakca"
        >
          My Linkedin
        </Link>
      </section>
    </MainLayout>
  );
};

export default ContactPage;

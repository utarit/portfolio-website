import React from "react";

import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/design-system/Button";

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
            <Button type="submit">Send</Button>
          </fieldset>
        </form>
      </section>

      <section className="my-4">
        <h3 className="text-lg mb-2">or just reach me via</h3>

        <address>
          <a href="mailto:mertakca.dev@gmail.com">mertakca.dev@gmail.com</a>
        </address>

        <Button
          color="primary"
          className="mt-4"
          target="_blank"
          href="https://linkedin.com/in/mertakca"
        >
          My Linkedin
        </Button>
      </section>
    </MainLayout>
  );
};

export default ContactPage;

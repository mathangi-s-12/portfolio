// Libs
import { useContext, useState } from "react";
// Contexts
import { ContentContext } from "@src/contexts";
import { getTopicData } from "@src/utils";
// Types
import type { Contact } from "@src/types-and-interfaces/interfaces";
// Styles
import "./index.css";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const { name, email, subject, body } = formValues;
  const { data } = useContext(ContentContext);

  const contactData = getTopicData(
    "decap-content/contact-info/",
    data
  ) as unknown as Contact[];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div
      id="contact-form"
      className="h-dvh w-full bg-bg py-[4rem] px-[8rem] text-text flex justify-between"
    >
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold text-card-bg-1 mb-[4rem]">
          Let's connect!
        </h1>
        <div className="flex flex-col gap-4">
          {contactData.map(({ contact_source, type, link, logo, file }) => {
            if (["file", "social", "email"].includes(type.toLowerCase())) {
              return (
                <a
                  href={
                    type === "email"
                      ? "mailto:" + link
                      : type === "file"
                      ? file
                      : link
                  }
                  target="_blank"
                  rel="noreferrer noopener"
                  key={contact_source}
                  className="flex items-center gap-3"
                >
                  <div className="bg-card-bg-1 p-[0.5rem] rounded-full h-[3rem] w-[3rem] flex items-center justify-center">
                    <img
                      className="max-h-[1.3rem]"
                      src={logo}
                      alt={contact_source}
                    />
                  </div>
                  <div className="font-semibold">{contact_source}</div>
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="bg-card-bg-3 text-card-text-3 p-10 h-full w-[60%] rounded-md overflow-auto flex flex-col gap-5">
        <p className="font-bold">Hey Mathangi!</p>
        <p className="w-full flex gap-[5px]">
          This is regarding
          <input
            className="flex-1 outline-0 border-b border-card-text-3"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="(subject of your message)"
            required
          />
        </p>
        <p className="flex flex-col flex-1">
          I'm writing because
          <textarea
            className="message-box w-full flex-1 outline-0 resize-none"
            name="body"
            value={body}
            onChange={handleChange}
            placeholder="(your message)"
          />
        </p>
        <p>From</p>
        <input
          className="outline-0 border-b border-card-text-3 w-[50%]"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="(your name)"
          required
        />
        <input
          className="outline-0 border-b border-card-text-3 w-[50%]"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="(your email address)"
          required
        />
      </div>
    </div>
  );
};

export default ContactForm;

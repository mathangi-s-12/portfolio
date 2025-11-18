// Libs
import { useContext, useState } from "react";
// Contexts
import { ContentContext } from "@src/contexts";
// Utils
import { getTopicData, encode } from "@src/utils";
// Types
import type { Contact } from "@src/types-and-interfaces/interfaces";
// Styles
import "./index.css";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    "bot-field": "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { name, email, subject, message } = formValues;
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

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (errors[e.target.name]) {
      setErrors((values) => ({ ...values, [e.target.name]: "" }));
    }
  };

  const validateEmailFields = ({
    name,
    email,
    subject,
    message,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const errors: Record<string, string> = {};
    if (!name || name.trim().length === 0) {
      errors.name = "Name is required.";
    }
    if (!email || !/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Valid email is required.";
    }
    if (!subject || subject.length > 1000) {
      errors.subject = "Subject must be 1-1000 characters.";
    }
    if (!message || message.length > 20000) {
      errors.message = "Message must be 1-20000 characters.";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateEmailFields({ name, email, subject, message });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Netlify submission logic here
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "portfolio-contact", ...formValues }),
    })
      .then(() => {})
      .catch(() => {});
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
                  <div className="bg-card-bg-1 p-[0.5rem] rounded-full h-[3rem] w-[3rem] flex items-center justify-center hover:scale-105 transition-transform">
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
      <form
        name="portfolio-contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        method="POST"
        onSubmit={handleSubmit}
        className="bg-card-bg-3 text-card-text-3 p-10 h-full w-[60%] rounded-md overflow-auto flex flex-col gap-5 relative"
      >
        <p className="font-bold">Hey Mathangi!</p>
        {/* Honeypot field (hidden from users) */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human:
            <input
              name="bot-field"
              value={formValues["bot-field"]}
              onChange={handleChange}
            />
          </label>
        </p>
        <p className="w-full flex gap-[5px]">
          This is regarding
          <input
            className={`flex-1 outline-0 border-b border-card-text-3 ${
              errors.subject ? "border-red-500" : ""
            }`}
            title={errors.subject ? errors.subject : ""}
            name="subject"
            value={subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(subject of your message)"
            required
          />
        </p>
        <p className="flex flex-col flex-1">
          I'm writing because
          <textarea
            className={`message-box w-full flex-1 outline-0 resize-none ${
              errors.message ? "message-box-error" : ""
            }`}
            title={errors.message ? errors.message : ""}
            name="message"
            value={message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(your message)"
          />
        </p>
        <p>From</p>
        <input
          className={`outline-0 border-b border-card-text-3 w-[50%] ${
            errors.name ? "border-red-500" : ""
          }`}
          title={errors.name ? errors.name : ""}
          name="name"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="(your name)"
          required
        />
        <input
          className={`outline-0 border-b border-card-text-3 w-[50%] ${
            errors.email ? "border-red-500" : ""
          }`}
          title={errors.email ? errors.email : ""}
          name="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="(your email address)"
          required
        />
        <button
          type="submit"
          className="bg-card-bg-1 p-[0.5rem] rounded-full h-[4rem] w-[4rem] flex items-center justify-center cursor-pointer absolute bottom-[2rem] right-[2rem] hover:scale-105 transition-transform"
        >
          <img
            className="max-h-[2rem]"
            src="https://res.cloudinary.com/dsdcxatjh/image/upload/v1760306005/contact-form-send-icon_zb6blp.png"
            alt="send"
          />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

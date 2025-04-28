import { Cookie, ShieldCheck, Eye } from "lucide-react";

export default function page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Cookie Policy</h1>
      <p className="text-gray-700">
        Shiftly.uk uses cookies to enhance your browsing experience. This policy explains
        how we use cookies and how you can manage them.
      </p>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Cookie className="text-blue-500" /> What Are Cookies?
        </h2>
        <p className="text-gray-700">
          Cookies are small text files stored on your device to help improve website
          functionality and provide a personalized experience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="text-green-500" /> How We Use Cookies
        </h2>
        <p className="text-gray-700">
          We use cookies to remember user preferences, improve website performance,
          and analyze site traffic.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Eye className="text-purple-500" /> Managing Cookies
        </h2>
        <p className="text-gray-700">
          You can manage or disable cookies through your browser settings. However,
          disabling cookies may affect certain functionalities of the site.
        </p>
      </section>

      <footer className="text-center text-gray-600 mt-6 border-t pt-4">
        <p>
          This Cookie Policy may be updated periodically. Continued use of the
          platform indicates acceptance of the latest policy.
        </p>
      </footer>
    </div>
  );
}

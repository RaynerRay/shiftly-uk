import { Lock, ShieldCheck, UserCheck } from "lucide-react";

export default function page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
      <p className="text-gray-700">
        Your privacy is important to us. This Privacy Policy explains how Shiftly.uk
        collects, uses, and protects your personal information.
      </p>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="text-blue-500" /> Data Collection
        </h2>
        <p className="text-gray-700">
          We collect necessary personal information, such as name, contact details,
          and professional credentials, to facilitate platform functionality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Lock className="text-green-500" /> Data Security
        </h2>
        <p className="text-gray-700">
          Your data is securely stored and protected from unauthorized access.
          We employ encryption and security measures to safeguard your information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <UserCheck className="text-purple-500" /> User Rights
        </h2>
        <p className="text-gray-700">
          You have the right to access, update, or request deletion of your
          personal data. Contact us for any data-related concerns.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="text-red-500" /> Third-Party Sharing
        </h2>
        <p className="text-gray-700">
          We do not sell or share your data with third parties except as required
          for legal compliance or platform functionality.
        </p>
      </section>

      <footer className="text-center text-gray-600 mt-6 border-t pt-4">
        <p>
          This Privacy Policy may be updated periodically. Continued use of the
          platform indicates acceptance of the latest policy.
        </p>
      </footer>
    </div>
  );
}

import { useCallback, useState } from "react";
import axios from "axios";

function CurateEmail() {
  const [recipientName, setRecipientName] = useState("");
  const [recipientRole, setRecipientRole] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderRole, setSenderRole] = useState("");
  const [purpose, setPurpose] = useState("");
  const [senderBackground, setSenderBackGround] = useState("");
  const [urgency, setUrgency] = useState("");
  const [tone, setTone] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const copyToClip = useCallback(() => {
    window.navigator.clipboard.writeText(generatedEmail);
  }, [generatedEmail]);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const generateEmail = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_URL}/generate`,
          {
            recipientName,
            recipientRole,
            senderName,
            senderRole,
            senderBackground,
            purpose,
            urgency,
            tone,
          }
        );
        setGeneratedEmail(response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      senderName,
      senderRole,
      recipientName,
      recipientRole,
      senderBackground,
      purpose,
      urgency,
      tone,
    ]
  );

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-xl space-y-4">
      <form onSubmit={generateEmail} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Recipient Name"
            className="p-2 border border-gray-300 rounded-lg w-full"
            value={recipientName}
            required
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recipient Role or Relation"
            className="p-2 border border-gray-300 rounded-lg w-full"
            value={recipientRole}
            required
            onChange={(e) => setRecipientRole(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Sender Name"
            className="p-2 border border-gray-300 rounded-lg w-full"
            value={senderName}
            required
            onChange={(e) => setSenderName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sender Role or Relation"
            className="p-2 border border-gray-300 rounded-lg w-full"
            value={senderRole}
            required
            onChange={(e) => setSenderRole(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <textarea
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder="Purpose of writing email"
            required
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <textarea
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-hidden"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder="Tell about yourself"
            required
            value={senderBackground}
            onChange={(e) => setSenderBackGround(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label htmlFor="urgency" className="block text-sm font-medium mb-1">
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium mb-1">
              Tone
            </label>
            <select
              id="tone"
              name="tone"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="sarcastic">Sarcastic</option>
              <option value="optimistic">Optimistic</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            !senderName ||
            loading ||
            !recipientName ||
            !purpose ||
            !senderRole ||
            !recipientRole
          }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Loading..." : "Generate Email"}
        </button>
      </form>

      {generatedEmail && (
        <div className="space-y-2">
          <textarea
            rows={6}
            className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-auto"
            value={generatedEmail}
            readOnly
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button
            onClick={copyToClip}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default CurateEmail;

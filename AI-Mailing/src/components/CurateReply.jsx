import { useCallback, useState } from "react";
import axios from "axios";

function CurateReply() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const copyToClip = useCallback(() => {
    window.navigator.clipboard.writeText(generatedReply);
  });

  const GenerateReply = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/reply`, {
          emailContent,
          tone,
        });
        setGeneratedReply(response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
      setLoading(false);
    },
    [emailContent, tone, generatedReply]
  );

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-4xl">

        <form onSubmit={GenerateReply} className="space-y-4">
          <div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={7}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Enter Original Email's Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tone" className="block text-lg font-medium text-gray-700">
              Tone
            </label>
            <select
              id="tone"
              name="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="sarcastic">Sarcastic</option>
              <option value="optimistic">Optimistic</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              disabled={!emailContent || loading}
            >
              {loading ? "Loading..." : "Generate Reply"}
            </button>
          </div>
        </form>

        {generatedReply && (
          <div className="mt-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              value={generatedReply}
              readOnly
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <button
              onClick={copyToClip}
              className="mt-4 w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurateReply;


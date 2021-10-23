import { useState } from "react";

function CommentForm(onSubmit) {
  const [text, setText] = useState();
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500"
        rows="2"
        placeholder={`¡Deja un comentario!`}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="flex items-center mt-4">
        <div className="flex items-center space-x-6">
          <button className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;

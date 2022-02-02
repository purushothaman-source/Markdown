import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import TextareaAutosize from "react-textarea-autosize";

import {
  dark,
  a11yDark,
  atomDark,
  coy,
  prism
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CustomImage = props => {
  return (
    <a href={props.src} target="_blank" rel="noopener noreferrer">
      <img {...props} style={{ width: "100%" }} alt="render" />
    </a>
  );
};

function App() {
  const [value, setValue] = useState("");
  return (
    <>
      <TextareaAutosize
        onChange={e => setValue(e.target.value)}
        onkeydown={e => e.key === "Escape" && setValue("")}
        minRows={4}
      />
      <ReactMarkdown
        children={value.toString()}
        components={{
          img: CustomImage,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={prism}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
        remarkPlugins={[remarkGfm]}
      />
    </>
  );
}

export default App;

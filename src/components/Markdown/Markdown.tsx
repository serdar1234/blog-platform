import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const MyMarkdown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {children}
    </Markdown>
  );
};

export default MyMarkdown;

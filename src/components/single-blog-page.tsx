import ReactMarkdown from "react-markdown";
import { getSingleBlog } from "@/lib/notion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { duotoneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

const CodeBlock = ({
  language,
  codestring,
}: {
  language: any;
  codestring: any;
}) => {
  return (
    <SyntaxHighlighter language={language} style={duotoneLight} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  );
};

async function SingleBlogPage({ slug }: { slug: string }) {
  const { metadata, markdown } = await getSingleBlog(slug);

  return (
    <section className="pb-8">
      <Image
        src={metadata.cover}
        alt={metadata.title}
        height={0}
        width={0}
        unoptimized={true}
        className="h-52 w-full object-cover mb-4"
      />
      <div className="max-w-[47.5rem] lg:mx-auto mx-10">
        <h1 className="text-4xl font-bold my-4">{metadata.title}</h1>
        <p className="text-gray-600 mb-2">Date: {metadata.date}</p>
        <p className="text-gray-600 mb-4">Tags: {metadata.tags.join(", ")}</p>
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <CodeBlock
                  codestring={String(children).replace(/\n$/, "")}
                  language={match[1]}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
          className="markdown"
        >
          {markdown.parent}
        </ReactMarkdown>
      </div>
    </section>
  );
}

export default SingleBlogPage;

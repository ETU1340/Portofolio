import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-cyan max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-cyan-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

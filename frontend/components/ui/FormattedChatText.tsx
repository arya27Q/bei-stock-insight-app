"use client";

import React from "react";

interface FormattedChatTextProps {
  text: string;
}

function renderInlineMarkdown(line: string, keyPrefix: string): React.ReactNode[] {
  // Pisahkan pola **bold** dan *italic* secara aman tanpa dangerouslySetInnerHTML
  const tokens = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={key} className="font-bold text-zinc-950 dark:text-zinc-50">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={key}>{token}</React.Fragment>;
  });
}

export const FormattedChatText: React.FC<FormattedChatTextProps> = ({ text }) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((rawLine, idx) => {
        const trimmed = rawLine.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Heading markdown (### Judul)
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="pt-1.5 text-[13px] font-bold text-zinc-950 dark:text-zinc-50"
            >
              {renderInlineMarkdown(trimmed.slice(4), `h-${idx}`)}
            </h4>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h4
              key={idx}
              className="pt-1.5 text-[13px] font-bold text-zinc-950 dark:text-zinc-50"
            >
              {renderInlineMarkdown(trimmed.slice(3), `h2-${idx}`)}
            </h4>
          );
        }

        // Bullet point (- item atau * item)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                •
              </span>
              <span className="flex-1">
                {renderInlineMarkdown(trimmed.slice(2), `li-${idx}`)}
              </span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {renderInlineMarkdown(rawLine, `p-${idx}`)}
          </p>
        );
      })}
    </div>
  );
};

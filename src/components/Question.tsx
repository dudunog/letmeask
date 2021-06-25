import { ReactNode } from "react";
import { useTheme } from "../Hooks/useTheme";

import "./../styles/question.scss";

type QuestionProps = {
  key: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  const { theme } = useTheme();

  return (
    <div className={`question ${theme}`}>
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}

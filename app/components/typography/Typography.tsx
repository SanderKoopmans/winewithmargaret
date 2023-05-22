import * as React from "react";
import clsx from "clsx";

type TitleProps = {
  variant?: "primary" | "secondary";
  as?: React.ElementType;
  className?: string;
  id?: string;
} & (
  | { children: React.ReactNode }
  | {
      dangrerouslySetInnerHTML: {
        __html: string;
      };
    }
);

const fontSize = {
  h1: "text-6xl lg:text-8xl",
  h2: "text-4xl lg:text-6xl",
  h3: "text-2xl lg:text-4xl font-medium",
  h4: "text-xl lg:text-2xl font-medium",
  h5: "text-lg lg:text-xl font-medium",
  h6: "lg:text-lg font-medium"
};

const titleColors = {
  primary: "text-black",
  secondary: "text-gray-400"
};

function Title({
  variant = "primary",
  size,
  as,
  className,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size;
  return (
    <Tag
      className={clsx(fontSize[size], titleColors[variant], className)}
      {...rest}
    />
  );
}

function H1(props: TitleProps) {
  return <Title {...props} size="h1" />;
}

function H2(props: TitleProps) {
  return <Title {...props} size="h2" />;
}

function H3(props: TitleProps) {
  return <Title {...props} size="h3" />;
}

function H4(props: TitleProps) {
  return <Title {...props} size="h4" />;
}

function H5(props: TitleProps) {
  return <Title {...props} size="h5" />;
}

function H6(props: TitleProps) {
  return <Title {...props} size="h6" />;
}

type ParagraphProps = {
  className?: string;
  prose?: boolean;
  textColorClassName?: string;
  as?: React.ElementType;
} & (
  | { children: React.ReactNode }
  | { dangerouslySetInnerHTML: { __html: string } }
);

function Paragraph({
  className,
  as = "p",
  textColorClassName = "text-secondary",
  ...rest
}: ParagraphProps) {
  return React.createElement(as, {
    className: clsx("max-w-full text-lg", textColorClassName, className),
    ...rest
  });
}

export { H1, H2, H3, H4, H5, H6, Paragraph };

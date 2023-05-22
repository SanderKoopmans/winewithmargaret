import { H2, Paragraph } from "./typography/Typography";

export const AuthorIntro = ({ intro }: any) => (
  <section className="mb-8">
    <H2>{intro?.attributes.title}</H2>
    <Paragraph>{intro?.attributes.introduction}</Paragraph>
  </section>
)

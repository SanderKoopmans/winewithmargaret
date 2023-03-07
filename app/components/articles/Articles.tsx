import { Link } from "@remix-run/react";
import { buildLinkPath } from "~/utils";

/**
 * Based on category, link to either /recipe/slug or /article/slug
 * @returns List of articles
 */

export const Articles = ({ articles }: any) => {
      return (
    <>
        {articles.length > 0 && articles.map(({
          id: articleId,
          attributes: {
            title, publishedAt, excerpt, thumbnail: {
              data: { attributes: { url }}
            }, slug,
            category: {
              data: {
                attributes: {
                  name: categoryName }}}}}) => (
            <Link
                to={buildLinkPath(categoryName, slug)}
                className="item transition duration-300 p-2 hover:shadow-2xl hover:scale-[1.02] hover:cursor-pointer"
                key={publishedAt}
            >
              <div className="article">
                <h3 className="text-4xl mb-4">{title}</h3>
                <img src={`${process.env.STRAPI_URL_BASE}${url}`} alt={title} className="mb-6" />
                <p className="mb-6">{excerpt}</p>
                <div className="flex py-2 items-center">
                  <p className="capitalize italic text-sm">{new Date(publishedAt).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })} / {categoryName}</p>
                  <div className="flex-grow border-t-2 border-gray-300 ml-2"></div>
                </div>
              </div>
            </Link>
          ))}
    </>
)};

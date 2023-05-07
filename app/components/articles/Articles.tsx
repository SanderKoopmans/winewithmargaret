// @ts-nocheck
import { Link } from "@remix-run/react";
import { buildLinkPath } from "~/utils";

/**
 * Based on category, link to either /recipe/slug or /article/slug
 * @returns List of articles
 */

export const Articles = ({ articles }: any) => {
  return (
    <>
      {articles.length > 0 &&
        articles.map(
          ({
            id: articleId,
            attributes: {
              title,
              publishedAt,
              excerpt,
              Thumbnail: {
                data: {
                  attributes: { url },
                },
              },
              slug,
              // categories: {
              //   data: {
              //     attributes: { name: categoryName },
              //   },
              // },
              PageType: {
                PageType,
              },
            },
          }) => (
            <Link
              // to={buildLinkPath(categoryName, slug)}
              to={buildLinkPath(PageType, slug)}
              className="item p-2 transition duration-300 hover:scale-[1.02] hover:cursor-pointer hover:shadow-2xl"
              key={publishedAt}
            >
              <div className="article">
                <h3 className="mb-4 text-4xl">{title}</h3>
                <img
                  src={`${url}`}
                  alt={title}
                  className="mb-6"
                />
                <p className="mb-6">{excerpt}</p>
                <div className="flex items-center py-2">
                  <p className="text-sm capitalize italic">
                    {new Date(publishedAt).toLocaleString("default", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    {/* / {categoryName} */}
                    /
                  </p>
                  <div className="ml-2 flex-grow border-t-2 border-gray-300"></div>
                </div>
              </div>
            </Link>
          )
        )}
    </>
  );
};

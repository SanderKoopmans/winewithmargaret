import { useLoaderData } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { Link } from "@remix-run/react";
import { buildLinkPath } from "~/utils";

export async function loader() {
    checkEnvVars();

    const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/articles?populate=category`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${process.env.STRAPI_API_TOKEN}`,
          "Content-Type":"application/json"
        }
      });

      checkStatus(response);

      const data = await response.json();

      if (data.error) {
        throw new Response("Error loading data from strapi", { status: 500});
      }

      return data.data;
}

/**
 * Based on category, link to either /recipe/slug or /article/slug
 * @returns List of articles
 */

export const Articles = () => {
    const articles = useLoaderData();
    const imageLink = "https://source.unsplash.com/random?nature";
    const response = {
        data: [
            {
                id: 1,
                attributes: {
                    title: "First Article",
                    item: 1,
                    createdAt: "2023-02-27T15:07:03.208Z",
                    updatedAt: "2023-03-04T22:53:44.333Z",
                    publishedAt: "2023-03-04T22:53:44.331Z",
                    content: "Some bits of content in here\n![Old vine in an open field](http://localhost:1337/uploads/old_vines_blog_e116a689d9.png)\n",
                    excerpt: "A small intro",
                    thumbnail: "http://localhost:1337/uploads/old_vines_blog_e116a689d9.png",
                    slug: "first-article",
                    category: {
                        data: {
                            id: 1,
                            attributes: {
                                name: "Cellar",
                                createdAt: "2023-03-04T21:21:15.090Z",
                                updatedAt: "2023-03-04T21:21:23.089Z",
                                publishedAt: "2023-03-04T21:21:23.085Z"
                            }
                        }
                    }
                }
            }
        ],
        meta: {
            pagination: {
                page: 1,
                pageSize: 25,
                pageCount: 1,
                total: 1
            }
        }
    };

    // const articles = [
    //     {
    //       postingDate: "2022-02-28T12:34:56Z",
    //       image: `${imageLink}/&1`,
    //       title: "An intro to Chardonnay",
    //       excerpt: "Chardonnay is one of the world's most popular grape varieties, known for its versatility and adaptability to different growing regions. The grape is a green-skinned variety that produces medium to full-bodied wines with flavors that range from green apple and citrus to tropical fruits and vanilla. Chardonnay is often aged in oak barrels, which can impart a buttery or creamy texture to the wine.",
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&2`,
    //       title: "Malbec",
    //       excerpt: "Malbec is a red grape variety that is known for producing dark, full-bodied wines with flavors of blackberry, plum, and chocolate. Originally from the Bordeaux region of France, it is now primarily associated with the wines of Argentina."
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&3`,
    //       title: "Vine Pruning",
    //       excerpt: "Vine pruning is a critical aspect of grapevine cultivation, as it helps to control yields, ensure fruit quality, and promote plant health. Pruning involves removing selected portions of the vine, including shoots, canes, and leaves, to regulate the amount of sunlight and nutrients that reach the grapes."
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&4`,
    //       title: "The Cellar",
    //       excerpt: "The most important time in the wine cellar is during the fermentation process, when grape juice is converted into wine through the action of yeast."
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&5`,
    //       title: "Article 5",
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&6`,
    //       title: "Article 6",
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&7`,
    //       title: "Article 7",
    //     },
    //     {
    //       postingDate: "2022-02-27T10:23:45Z",
    //       image: `${imageLink}/&8`,
    //       title: "Article 8",
    //     },
    //   ];
      return (
    <>
        {articles.map(({ id: articleId, attributes: { title, publishedAt, excerpt, thumbnail, slug, category: { data: { attributes: { name: categoryName }}}}}) => (
            <Link
                to={buildLinkPath(categoryName, slug)}
                className="item transition duration-300 p-2 hover:shadow-2xl hover:scale-[1.02] hover:cursor-pointer"
                key={publishedAt}
            >
              <div className="article">
                <h3 className="text-4xl mb-4">{title}</h3>
                <img src={thumbnail} alt={title} className="mb-6" />
                <p className="mb-6">{excerpt}</p>
                <div className="flex py-2 items-center">
                  <p className="capitalize italic text-sm">{new Date(publishedAt).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })} / Category</p>
                  <div className="flex-grow border-t-2 border-gray-300 ml-2"></div>
                </div>
              </div>
            </Link>
          ))}
    </>
)};

/**
 * Based on category, link to either /recipe/slug or /article/slug
 * @returns List of articles
 */

export const Articles = () => {
    const imageLink = "https://source.unsplash.com/random?nature";
    const articles = [
        {
          postingDate: "2022-02-28T12:34:56Z",
          image: `${imageLink}/&1`,
          title: "An intro to Chardonnay",
          excerpt: "Chardonnay is one of the world's most popular grape varieties, known for its versatility and adaptability to different growing regions. The grape is a green-skinned variety that produces medium to full-bodied wines with flavors that range from green apple and citrus to tropical fruits and vanilla. Chardonnay is often aged in oak barrels, which can impart a buttery or creamy texture to the wine.",
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&2`,
          title: "Malbec",
          excerpt: "Malbec is a red grape variety that is known for producing dark, full-bodied wines with flavors of blackberry, plum, and chocolate. Originally from the Bordeaux region of France, it is now primarily associated with the wines of Argentina."
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&3`,
          title: "Vine Pruning",
          excerpt: "Vine pruning is a critical aspect of grapevine cultivation, as it helps to control yields, ensure fruit quality, and promote plant health. Pruning involves removing selected portions of the vine, including shoots, canes, and leaves, to regulate the amount of sunlight and nutrients that reach the grapes."
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&4`,
          title: "The Cellar",
          excerpt: "The most important time in the wine cellar is during the fermentation process, when grape juice is converted into wine through the action of yeast."
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&5`,
          title: "Article 5",
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&6`,
          title: "Article 6",
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&7`,
          title: "Article 7",
        },
        {
          postingDate: "2022-02-27T10:23:45Z",
          image: `${imageLink}/&8`,
          title: "Article 8",
        },
      ];
      return (
    <>
        {articles.map((article) => (
            <div className="item transition duration-300 p-2 hover:shadow-2xl hover:scale-[1.02] hover:cursor-pointer" key={article.postingDate}>
              <div className="article">
                <h3 className="text-4xl mb-4">{article.title}</h3>
                <img src={article.image} alt={article.title} className="mb-6" />
                <p className="mb-6">{article.excerpt}</p>
                <div className="flex py-2 items-center">
                  <p className="capitalize italic text-sm">{new Date(article.postingDate).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })} / Category</p>
                  <div className="flex-grow border-t-2 border-gray-300 ml-2"></div>
                </div>
              </div>
            </div>
          ))}
    </>
)};

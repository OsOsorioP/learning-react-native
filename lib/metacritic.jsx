/* eslint-disable no-unused-expressions */
export async function getLatestGames() {
  const LATEST_GAMES_URL =
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

  const rawData = await fetch(LATEST_GAMES_URL);
  const json = await rawData.json();

  const {
    data: { items },
  } = json;

  return items.map((item) => {
    const { description, slug, releaseDate, image, criticScoreSummary, title } =
      item;
    const { score } = criticScoreSummary;

    const { bucketType, bucketPath } = image;
    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    return {
      title,
      description,
      slug,
      releaseDate,
      image: img,
      score,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer//metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, image, criticScoreSummary } = components[0];
  const { score } = criticScoreSummary;

  const cardImage = image.find((image) => {
    image.typeName === "cardImage";
  });
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReviews = components[3].data.items;

  const reviews = rawReviews.map((review) => {
    const { quote, score, data, publicationName, author } = review;
    return { quote, score, data, publicationName, author };
  });

  return {
    img,
    title,
    slug,
    description,
    score,
    reviews,
  };
}

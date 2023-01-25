import {
  useShopQuery,
  useLocalization,
  Image,
  gql,
  Seo,
  useRouteParams,
} from "@shopify/hydrogen";
import Layout from "./../../components/Layout.server";
import { Suspense } from "react";

export default function Article() {
  const { handle } = useRouteParams();

  const {
    data: {
      blog: { articleByHandle },
    },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });
  const article = articleByHandle;

  // const {
  //   language: { isoCode: languageCode },
  //   country: { isoCode: countryCode },
  // } = useLocalization();

  // const formattedDate = new Intl.DateTimeFormat(
  //   `${languageCode}-${countryCode}`,
  //   {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   }
  // ).format(new Date(article.publisedAt));

  if (!article) {
    return (
      <Layout>
        <div className="container">Article not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Suspense>
        <Seo type="article" data={article} />
      </Suspense>
      <div className="article-page container">
        <div className="article-page-header">
          <h1>{article.title}</h1>
          <span>{article.authorV2.name}</span>
        </div>
        <article>
          <Image data={article.image} alt={article.image.altText} />
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          ></div>
        </article>
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query articles($handle: String!) {
    blog(handle: "journal") {
      articleByHandle(handle: $handle) {
        title
        publishedAt
        authorV2 {
          name
        }
        image {
          url
          altText
        }
        contentHtml
      }
    }
  }
`;

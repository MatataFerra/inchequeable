import { FC } from "react";
import { Helmet } from "react-helmet";

export const HelmetComponent: FC = () => {
  return (
    <Helmet>
      <title>Inchequeable.com.ar</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Blog de noticias irónicas, opiniones, humor, de todas formas es Inchequeable."
      />
      <meta name="keywords" content="blog, noticias, humor, opinión, matias ferraro" />
      <meta name="robots" content="index, all, follow" />
      <meta name="category" content="Blog" />
      <meta name="author" content="Matias Ferraro" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="%PUBLIC_URL%" />
      <meta property="og:title" content="IQL | Andá a saber de dónde salió" />
      <meta
        property="og:description"
        content="Blog de noticias irónicas, opiniones, humor, de todas formas es Inchequeable."
      />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="500" />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/docq8rbdu/image/upload/v1642110446/portada-iql_dlvqpc.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="%PUBLIC_URL%" />
      <meta property="twitter:title" content="IQL | Andá a saber de dónde salió" />
      <meta
        property="twitter:description"
        content="Blog de noticias irónicas, opiniones, humor, de todas formas es Inchequeable."
      />
      <meta
        property="twitter:image"
        content="https://res.cloudinary.com/docq8rbdu/image/upload/v1642110446/portada-iql_dlvqpc.png"
      />
      <link rel="canonical" href="%PUBLIC_URL%" />
    </Helmet>
  );
};

import React from "react";
import Foote from "./footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const BodyStructure = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main>
        <Toaster />

        {children}
      </main>
      <Foote />
    </div>
  );
};

BodyStructure.defaultProps = {
  title: "FashionHub - Shop now",
  description: "MERN stack project",
  keywords: "mern,react,node,mongodb",
  author: "Shahwaiz Mughal",
};

export default BodyStructure;

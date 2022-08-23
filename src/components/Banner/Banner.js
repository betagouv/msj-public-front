import React from "react";

import Header from "./Header";
import Nav from "./Nav";

const Banner = () => {
  return (
    <header role="banner" className="fr-header">
      <Header />
      {/* TODO: Nav is only displayed to logged_in users */}
      <Nav />
    </header>
  );
};

export default Banner;

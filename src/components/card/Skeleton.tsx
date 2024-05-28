import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    className="card"
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#ffffff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="120" />
    <rect x="0" y="276" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="327" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="451" rx="10" ry="10" width="80" height="30" />
    <rect x="149" y="443" rx="25" ry="25" width="129" height="45" />
  </ContentLoader>
);

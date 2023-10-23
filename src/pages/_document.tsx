import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}
      lang="en"
    >
      <Head />
      <body style={{ height: "100%" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

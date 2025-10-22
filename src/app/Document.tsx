import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>thezachcannon</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <link rel="stylesheet" href={styles} />
    </head>
    <body>
      {/* <a
        href="/"
        className="fixed left-4 top-4 z-50 inline-flex items-center px-3 py-1.5 bg-white text-slate-800 rounded-md shadow-sm"
        aria-label="Home"
      >
        Home
      </a> */}
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);

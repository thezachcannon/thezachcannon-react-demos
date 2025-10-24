import styles from "./styles.css?url";

export const TakeFlightLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
   return <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>thezachcannon</title>
          <link rel="modulepreload" href="/src/client.tsx" />
          <link rel="stylesheet" href={styles} />
        </head>
        <body>
          <div id="root">{children}</div>
          <script>import("/src/client.tsx")</script>
        </body>
      </html>
}
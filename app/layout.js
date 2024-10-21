// app/layout.js
export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <title>Balanced Scorecard App</title>
          {/* Include any meta tags or stylesheets here */}
        </head>
        <body>
          <header>
            <h1>Balanced Scorecard</h1>
            {/* Add navigation links or other header content here */}
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Balanced Scorecard App</p>
          </footer>
        </body>
      </html>
    );
  }
  
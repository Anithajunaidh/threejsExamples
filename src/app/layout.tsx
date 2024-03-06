import { ApolloWrapper } from "@/Api/ApolloProvider";
import { ThemeProviders } from "@/components/theme/ThemeProvider";
import ReduxProvider from "@/store/provider";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <ThemeProviders>
        <ReduxProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ReduxProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const ApiDocsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">API Documentation</h1>
      <Tabs defaultValue="search">
        {/* Tabs List with Horizontal Scroll on Mobile */}
        <TabsList className="flex overflow-x-auto md:overflow-visible  gap-3">
          <TabsTrigger value="search" className="whitespace-nowrap">
            Search API
          </TabsTrigger>
        </TabsList>

        {/* Search API Tab Content */}
        <TabsContent value="search" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Search Endpoint
              </CardTitle>
              <CardDescription>POST /api/logos/search</CardDescription>
            </CardHeader>
            <CardContent>
              <SyntaxHighlighter
                language="json"
                style={darcula}
                className="rounded-lg"
              >
                {`{
  "query": "string",
  "type": "verse" | "chapter",
  "top_k": number
}`}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other tab contents here */}
      </Tabs>
    </div>
  );
};

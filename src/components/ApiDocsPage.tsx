import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";


export const ApiDocsPage = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
        <Tabs defaultValue="search">
          <TabsList>
            <TabsTrigger value="search">Search API</TabsTrigger>
            <TabsTrigger value="verses">Verses API</TabsTrigger>
            <TabsTrigger value="chapters">Chapters API</TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Endpoint</CardTitle>
                <CardDescription>POST /api/search</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg">
  {`{
    "query": "string",
    "type": "verse" | "chapter",
    "top_k": number
  }`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Add other tab contents */}
        </Tabs>
      </div>
    );
  };
  

  

import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";


export const AboutPage = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About LogosAI</h1>
        <Card>
          <CardHeader>
            <CardTitle>Semantic Bible Search</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              LogosAI uses advanced AI technology to help you search and understand the Bible
              in new ways. Our semantic search engine understands the meaning behind your
              queries, not just keywords.
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Semantic search across verses and chapters</li>
                <li>Support for multiple translations</li>
                <li>Advanced natural language understanding</li>
                <li>Fast and accurate results</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchBible } from "@/api";

// SearchResult type definition
type SearchResult = {
  id: string;
  text: string;
  distance: number;
};

type AnalysisType =
  | "exegetical"
  | "socio-rhetorical"
  | "thematic"
  | "ethical"
  | "genre"
  | "interactive";

type AnalysisResult = {
  type: AnalysisType;
  content: string;
  passage: string;
};

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<"verse" | "chapter">("verse");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  const handleSearch = async () => {
    if (query) {
      try {
        setIsLoading(true);
        const results = await searchBible(query, searchType);
        setResults(results);
      } catch (error) {
        console.error("Error searching the Bible:", error);
        setResults([]); // Clear results in case of error
      } finally {
        setIsLoading(false);
      }
    }
  };

  const analysisCategories = [
    {
      type: "exegetical",
      title: "Exegetical Analysis",
      icon: "📜",
    },
    {
      type: "socio-rhetorical",
      title: "Socio-Rhetorical",
      icon: "🏛️",
    },
    {
      type: "thematic",
      title: "Thematic Trace",
      icon: "🔍",
    },
    {
      type: "ethical",
      title: "Ethical Framework",
      icon: "⚖️",
    },
    {
      type: "genre",
      title: "Genre Analysis",
      icon: "📚",
    },
    {
      type: "interactive",
      title: "Interactive Q&A",
      icon: "💡",
    },
  ];

  const getAnalysisContent = (type: AnalysisType) => {
    const result = analysisResults.find((r) => r.type === type);
    return result?.content || "Click generate to view analysis";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Scripture Semantic Search
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-[80%] m-auto">
          <div className="flex-1">
            <Input
              placeholder="Explore scripture by topic or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={searchType}
            onValueChange={(value) =>
              setSearchType(value as "verse" | "chapter")
            }
          >
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verse">Verse</SelectItem>
              <SelectItem value="chapter">Chapter</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      {/* Results Section */}
      <div className="flex gap-3">
        <div className="space-y-4 w-[50%]">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Searching...</span>
            </div>
          ) : !results.length ? (
            <p className="text-gray-400 p-10">No search results</p>
          ) : (
            results.map((result) => (
              <Card key={result.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">{result.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-gray-700 ${
                      expandedCard === result.id ? "" : "line-clamp-3"
                    }`}
                  >
                    {result.text}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setExpandedCard(
                        expandedCard === result.id ? null : result.id
                      )
                    }
                  >
                    {expandedCard === result.id ? "Show Less" : "Show More"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        <div className="flex-1 ">
          <div className="flex flex-col gap-3 p-1 overflow-auto lg:max-h-[600px]">
            {analysisCategories.map((category) => (
              <Card
                key={category.type}
                className="hover:shadow-lg transition-shadow min-h-[200px]"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {getAnalysisContent(category.type as AnalysisType)}
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      /* Add analysis generation logic here */
                    }}
                  >
                    Generate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>{" "}
          <Input
            placeholder="Analyse scripture search results using AI"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mt-3"
          />
        </div>
      </div>
    </div>
  );
};

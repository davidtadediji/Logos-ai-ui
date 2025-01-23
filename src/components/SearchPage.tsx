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
import { analyseScripture, searchBible } from "@/service";

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
  | "genre";

type AnalysisCard = {
  type: AnalysisType;
  title: string;
  icon: string;
  content: string;
};

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCards, setLoadingCards] = useState<Set<string>>(new Set());
  const [searchType, setSearchType] = useState<"verse" | "chapter">("verse");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [qaResults, setQAResults] = useState<string[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [analysisCards, setAnalysisCards] = useState<AnalysisCard[]>([
    {
      type: "exegetical",
      title: "Exegetical Analysis",
      icon: "📜",
      content: "Click generate to view analysis",
    },
    {
      type: "socio-rhetorical",
      title: "Socio-Rhetorical",
      icon: "🏛️",
      content: "Click generate to view analysis",
    },
    {
      type: "thematic",
      title: "Thematic Trace",
      icon: "🔍",
      content: "Click generate to view analysis",
    },
    {
      type: "ethical",
      title: "Ethical Framework",
      icon: "⚖️",
      content: "Click generate to view analysis",
    },
    {
      type: "genre",
      title: "Genre Analysis",
      icon: "📚",
      content: "Click generate to view analysis",
    },
  ]);

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        setIsLoading(true);
        const results = await searchBible(searchQuery, searchType);
        setResults(results);

        const qaResponse = await analyseScripture(
          results.map(
            (result: { id: string; text: string }) =>
              `${result.id}: ${result.text}`
          ),
          "interactive_qa"
        );

        setQAResults(qaResponse.result);
      } catch (error) {
        console.error("Error searching the Bible:", error);
        setResults([]); // Clear results in case of error
      } finally {
        setIsLoading(false);
      }
    }
  };

  const generateAnalysisContent = async (type: string) => {
    if (results.length > 0) {
      try {
        setLoadingCards((prev) => new Set(prev).add(type));
        const analysis = await analyseScripture(
          results.map((result) => `${result.id}: ${result.text}`),
          type
        );

        setAnalysisCards((prevCards) =>
          prevCards.map((card) =>
            card.type === type ? { ...card, content: analysis.result } : card
          )
        );
      } catch (error) {
        console.error("Error analyzing scripture:", error);
        setAnalysisCards((prevCards) =>
          prevCards.map((card) =>
            card.type === type
              ? {
                  ...card,
                  content: "Failed to analyze scripture. Please try again.",
                }
              : card
          )
        );
      } finally {
        setLoadingCards((prev) => {
          const next = new Set(prev);
          next.delete(type);
          return next;
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">Scripture Analyser</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-[80%] m-auto">
          <div className="flex-1">
            <Input
              placeholder="Explore scripture by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 space-y-4 lg:h-[650px] overflow-auto">
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
                    className={`text-sm text-gray-600 line-clamp-3 ${
                      expandedCard === result.id ? "!line-clamp-none" : ""
                    }`}
                  >
                    {result.text}
                  </p>
                </CardContent>
                <CardFooter>
                  {result.text.length > 150 && (
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
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Analyse scripture search results using AI"
              className="w-full"
              value={chatQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />{" "}
            <Button className="w-full sm:w-auto">
              <Search className="mr-1 h-4 w-4" />
              Search
            </Button>
          </div>
          {/* Update the QA Results section */}
          {qaResults?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Suggested Questions
              </h3>
              <div className="flex flex-wrap gap-2">
                {qaResults.map((qa, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="
                      text-left
                      bg-white
                      hover:bg-gray-50
                      border border-gray-200
                      rounded-lg
                      px-4 py-2
                      text-sm
                      text-gray-700
                      hover:text-gray-900
                      transition-colors
                      flex items-center gap-2
                      max-w-full
                    "
                    onClick={() => {
                      setChatQuery(qa);
                    }}
                  >
                    <Search className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-2">{qa}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3 p-1 overflow-auto lg:h-[400px]">
            {analysisCards.map((card) => (
              <Card
                key={card.type}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{card.icon}</span>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {loadingCards.has(card.type) ? (
                      <Loader2 className="h-6 w-6 animate-spin m-auto" />
                    ) : (
                      <pre className="whitespace-pre-wrap">{card.content}</pre>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateAnalysisContent(card.type)}
                  >
                    Generate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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

export const SearchPage = () => {
  const [query, setQuery] = useState("God's creation of the world");
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<"verse" | "chapter">("verse");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleSearch = async () => {
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
  };
  //   const handleSearch = async () => {
  //     // TODO: Replace with actual API call
  //     const dummyResults = [
  //       {
  //         id: "Genesis 1:1",
  //         text: "In the beginning God created the heavens and the earth.",
  //         distance: 0.1,
  //       },
  //       {
  //         id: "John 1:1",
  //         text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
  //         distance: 0.2,
  //       },
  //     ];
  //     setResults(dummyResults);
  //   };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Bible Search</h1>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Enter your search query..."
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
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verse">Verse</SelectItem>
              <SelectItem value="chapter">Chapter</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Searching...</span>
          </div>
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
    </div>
  );
};

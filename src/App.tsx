import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchPage } from "./components/SearchPage";
import { ApiDocsPage } from "./components/ApiDocsPage";
import { AboutPage } from "./components/About";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("search");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="text-xl font-bold">LogosAI</div>
            <div className="space-x-4">
              <Button
                variant={currentPage === "search" ? "default" : "outline"}
                onClick={() => setCurrentPage("search")}
              >
                Search
              </Button>
              <Button
                variant={currentPage === "api" ? "default" : "outline"}
                onClick={() => setCurrentPage("api")}
              >
                API Docs
              </Button>
              <Button
                variant={currentPage === "about" ? "default" : "outline"}
                onClick={() => setCurrentPage("about")}
              >
                About
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "search" && <SearchPage />}
      {currentPage === "api" && <ApiDocsPage />}
      {currentPage === "about" && <AboutPage />}
    </div>
  );
}

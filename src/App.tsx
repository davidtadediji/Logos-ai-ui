import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SearchPage } from "./components/SearchPage";
import { ApiDocsPage } from "./components/ApiDocsPage";
import { AboutPage } from "./components/About";
import { Menu, X } from "lucide-react"; // Import icons for the mobile menu
import { createAnonymousSession } from "@/service"; // Import the API service
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("search");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const isInitialized = useRef(false); // Track whether session initialization has run

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeSession = async () => {
      try {
        // Always attempt to create/reuse a session
        const { access_token } = await createAnonymousSession();
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("access_token", access_token);
        console.log("Session initialized and token stored");
      } catch (error) {
        console.error("Session initialization failed:", error);
      }
    };

    initializeSession();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex p-2 items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold">
              {import.meta.env.VITE_APP_NAME}
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex space-x-4">
              <Button
                variant={currentPage === "search" ? "default" : "outline"}
                onClick={() => {
                  setCurrentPage("search");
                  setIsMobileMenuOpen(false); // Close mobile menu on click
                }}
              >
                Search
              </Button>
              <Button
                variant={currentPage === "api" ? "default" : "outline"}
                onClick={() => {
                  setCurrentPage("api");
                  setIsMobileMenuOpen(false); // Close mobile menu on click
                }}
              >
                API Docs
              </Button>
              <Button
                variant={currentPage === "about" ? "default" : "outline"}
                onClick={() => {
                  setCurrentPage("about");
                  setIsMobileMenuOpen(false); // Close mobile menu on click
                }}
              >
                About
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-4">
              <Button
                variant={currentPage === "search" ? "default" : "outline"}
                className="w-full"
                onClick={() => {
                  setCurrentPage("search");
                  setIsMobileMenuOpen(false); // Close mobile menu on click
                }}
              >
                Search
              </Button>
              <Button
                variant={currentPage === "api" ? "default" : "outline"}
                className="w-full"
                onClick={() => {
                  setCurrentPage("api");
                  setIsMobileMenuOpen(false); // Close mobile menu on click
                }}
              >
                API Docs
              </Button>
              <Button
                variant={currentPage === "about" ? "default" : "outline"}
                className="w-full"
                onClick={() => {
                  setCurrentPage("about");
                  setIsMobileMenuOpen(false); // Close mobile menu on click
                }}
              >
                About
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {currentPage === "search" && <SearchPage />}
        {currentPage === "api" && <ApiDocsPage />}
        {currentPage === "about" && <AboutPage />}
      </div>
    </div>
  );
}

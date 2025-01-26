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
        // Check if a valid token already exists in localStorage
        const existingToken = localStorage.getItem("access_token");

        if (existingToken) {
          // Validate the existing token (e.g., check expiration)
          const isTokenValid = validateToken(existingToken); // Implement this function
          if (isTokenValid) {
            console.log("Reusing existing session");
            return; // Reuse the existing token
          } else {
            console.log("Existing token is invalid, creating a new session");
            localStorage.removeItem("access_token"); // Clear the invalid token
          }
        }

        // If no valid token exists, create a new session
        const { access_token } = await createAnonymousSession();
        localStorage.setItem("access_token", access_token);
        console.log("New session initialized and token stored");
      } catch (error) {
        console.error("Session initialization failed:", error);
      }
    };

    initializeSession();
  }, []);

  const validateToken = (token: string) => {
    try {
      // Decode the token (without verifying the signature)
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check if the token is expired
      const isExpired = payload.exp * 1000 < Date.now(); // Convert exp to milliseconds
      return !isExpired; // Return true if the token is valid
    } catch (error) {
      console.error("Token validation failed:", error);
      return false; // Invalid token
    }
  };

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

import { useState, useCallback } from "react";
import { StockFundamental } from "../types/stock";

export interface UseStockSearchReturn {
  searchQuery: string;
  searchResults: StockFundamental[];
  isSearching: boolean;
  handleSearchChange: (query: string) => void;
  clearSearch: () => void;
}

export function useStockSearch(stocks: StockFundamental[]): UseStockSearchReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StockFundamental[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = useCallback(
    (q: string) => {
      setSearchQuery(q);
      if (q.trim().length > 0) {
        const query = q.toLowerCase();
        const matched = stocks.filter(
          (s) =>
            s.ticker.toLowerCase().includes(query) ||
            s.name.toLowerCase().includes(query) ||
            s.sector.toLowerCase().includes(query)
        );
        setSearchResults(matched);
        setIsSearching(true);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    },
    [stocks]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    searchResults,
    isSearching,
    handleSearchChange,
    clearSearch,
  };
}

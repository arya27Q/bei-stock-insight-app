import { useState, useEffect, useCallback } from "react";
import { StockFundamental } from "../types/stock";
import { fetchStocks, INITIAL_STOCKS } from "../services/stock-service";

export interface UseStocksReturn {
  stocks: StockFundamental[];
  isLoading: boolean;
  error: string | null;
  refreshStocks: () => Promise<void>;
}

export function useStocks(): UseStocksReturn {
  const [stocks, setStocks] = useState<StockFundamental[]>(INITIAL_STOCKS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshStocks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStocks();
      if (data && data.length > 0) {
        setStocks(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data emiten");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    fetchStocks()
      .then((data) => {
        if (!isCancelled && data && data.length > 0) {
          setStocks(data);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat data emiten");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    stocks,
    isLoading,
    error,
    refreshStocks,
  };
}

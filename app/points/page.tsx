"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Transaction {
  id: string;
  amount: number;
  type: "EARNED" | "DEDUCTED" | "TRANSFERRED";
  description: string | null;
  createdAt: string;
}

export default function PointsPage() {
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoints();
    fetchTransactions();
  }, []);

  const fetchPoints = async () => {
    try {
      const response = await fetch("/api/points");
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/points/transactions");
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p>Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Оноо</CardTitle>
            <CardDescription>Таны одоогийн оноо</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{points}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Онооны түүх</CardTitle>
            <CardDescription>Оноо олж авсан, хасагдсан түүх</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Одоогоор түүх байхгүй байна
              </p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {transaction.type === "EARNED" && "➕ Олсон"}
                        {transaction.type === "DEDUCTED" && "➖ Хасагдсан"}
                        {transaction.type === "TRANSFERRED" && "🔄 Шилжүүлсэн"}
                      </p>
                      {transaction.description && (
                        <p className="text-sm text-gray-600">
                          {transaction.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.createdAt).toLocaleString(
                          "mn-MN"
                        )}
                      </p>
                    </div>
                    <div
                      className={`text-lg font-semibold ${
                        transaction.type === "EARNED"
                          ? "text-green-600"
                          : transaction.type === "DEDUCTED"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {transaction.type === "EARNED" ? "+" : "-"}
                      {Math.abs(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

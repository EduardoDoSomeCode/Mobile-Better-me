import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { QuoteRequest } from "@/interfaces/Quotes";

  
export function QuoteComponent() {
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://zenquotes.io/api/today");
        setQuote(response.data[0]); // Assuming the response is structured as shown in your example
      } catch (err) {
        setError("Error fetching the quote.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>&ldquo;{quote?.q}&rdquo;</Text>
      <Text style={styles.authorText}>— {quote?.a}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  quoteText: {
    fontSize: 24,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
  authorText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});


import { useState, useEffect } from "react";

interface ClientDetails {
  name: string;
  email: string;
  since: string;
  sessions: number;
  goals: string[];
  lastActivity: string;
  upcomingSessions: string[];
  weight: string;
  height: string;
  bodyFat: string;
  notes: string;
}

interface UseTabSearchResultsProps {
  searchQuery: string;
  clientDetails: ClientDetails;
  activeTab: string;
}

interface SearchResults {
  matchCounts: Record<string, number>;
  firstMatchTab: string | null;
}

export function useTabSearchResults({ 
  searchQuery, 
  clientDetails, 
  activeTab 
}: UseTabSearchResultsProps): SearchResults {
  const [matchCounts, setMatchCounts] = useState<Record<string, number>>({
    overview: 0,
    goals: 0,
    metrics: 0,
    programs: 0,
    notes: 0
  });
  
  const [firstMatchTab, setFirstMatchTab] = useState<string | null>(null);

  // Calculate search matches in each tab
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setMatchCounts({
        overview: 0,
        goals: 0,
        metrics: 0,
        programs: 0,
        notes: 0
      });
      setFirstMatchTab(null);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const counts: Record<string, number> = {
      overview: 0,
      goals: 0,
      metrics: 0,
      programs: 0,
      notes: 0
    };
    
    // Overview tab matches
    if (
      clientDetails.lastActivity.toLowerCase().includes(query) || 
      clientDetails.upcomingSessions.some(s => s.toLowerCase().includes(query)) ||
      clientDetails.weight.toLowerCase().includes(query) ||
      clientDetails.height.toLowerCase().includes(query) ||
      clientDetails.bodyFat.toLowerCase().includes(query)
    ) {
      counts.overview++;
    }
    
    // Goals tab matches
    const goalMatches = clientDetails.goals.filter(g => 
      g.toLowerCase().includes(query)
    ).length;
    counts.goals = goalMatches;
    
    // Metrics tab matches (check weight, height, bodyFat)
    if (
      clientDetails.weight.toLowerCase().includes(query) || 
      clientDetails.height.toLowerCase().includes(query) ||
      clientDetails.bodyFat.toLowerCase().includes(query)
    ) {
      counts.metrics++;
    }
    
    // Programs tab has mock content, but we'll search for basic terms
    if (
      "strength conditioning flexibility recovery".includes(query)
    ) {
      counts.programs++;
    }
    
    // Notes tab matches
    if (clientDetails.notes.toLowerCase().includes(query)) {
      counts.notes++;
    }
    
    setMatchCounts(counts);
    
    // Find the first tab with matches if current tab has no matches
    const totalMatches = Object.values(counts).reduce((acc, val) => acc + val, 0);
    if (totalMatches > 0 && counts[activeTab] === 0) {
      const firstTab = Object.entries(counts)
        .find(([_, count]) => count > 0)?.[0] || null;
      setFirstMatchTab(firstTab);
    } else {
      setFirstMatchTab(null);
    }
  }, [searchQuery, clientDetails, activeTab]);

  return { matchCounts, firstMatchTab };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type { MktPersona, MktBrandDoc, MktBrandAsset, MktConnector } from "../types";

export function usePersonas() {
  return useQuery({
    queryKey: ["mkt_personas"],
    queryFn: async () => {
      const { data, error } = await sb.from("mkt_personas").select("*").order("name");
      if (error) throw error;
      return (data ?? []) as MktPersona[];
    },
  });
}

export function useBrandDocs() {
  return useQuery({
    queryKey: ["mkt_brand_docs"],
    queryFn: async () => {
      const { data, error } = await sb.from("mkt_brand_docs").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MktBrandDoc[];
    },
  });
}

export function useUpsertBrandDoc() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (doc: Partial<MktBrandDoc>) => {
      const { data, error } = doc.id
        ? await sb.from("mkt_brand_docs").update(doc).eq("id", doc.id).select().single()
        : await sb.from("mkt_brand_docs").insert(doc).select().single();
      if (error) throw error;
      return data as MktBrandDoc;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_brand_docs"] }),
  });
}

export function useDeleteBrandDoc() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_brand_docs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_brand_docs"] }),
  });
}

export function useBrandAssets() {
  return useQuery({
    queryKey: ["mkt_brand_assets"],
    queryFn: async () => {
      const { data, error } = await sb.from("mkt_brand_assets").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MktBrandAsset[];
    },
  });
}

export function useUpsertBrandAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (a: Partial<MktBrandAsset>) => {
      const { data, error } = a.id
        ? await sb.from("mkt_brand_assets").update(a).eq("id", a.id).select().single()
        : await sb.from("mkt_brand_assets").insert(a).select().single();
      if (error) throw error;
      return data as MktBrandAsset;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_brand_assets"] }),
  });
}

export function useDeleteBrandAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_brand_assets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_brand_assets"] }),
  });
}

export function useConnectors() {
  return useQuery({
    queryKey: ["mkt_connectors"],
    queryFn: async () => {
      const { data, error } = await sb.from("mkt_connectors").select("*").order("connector_name");
      if (error) throw error;
      return (data ?? []) as MktConnector[];
    },
  });
}


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterState {
  rating: string;
  status: string;
  search: string;
}

interface ReviewsFilterProps {
  filter: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
}

export function ReviewsFilter({ filter, onFilterChange }: ReviewsFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by client name or review content..."
          value={filter.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="pl-10"
        />
      </div>
      
      <Select
        value={filter.rating}
        onValueChange={(value) => onFilterChange({ rating: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All ratings</SelectItem>
          <SelectItem value="5">5 stars</SelectItem>
          <SelectItem value="4">4 stars</SelectItem>
          <SelectItem value="3">3 stars</SelectItem>
          <SelectItem value="2">2 stars</SelectItem>
          <SelectItem value="1">1 star</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.status}
        onValueChange={(value) => onFilterChange({ status: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending_modification">Modification Requested</SelectItem>
          <SelectItem value="hidden">Hidden</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

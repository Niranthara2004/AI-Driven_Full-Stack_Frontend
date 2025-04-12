// hotels.page.tsx
import { useGetHotelsQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "../components/HotelCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HotelsPage() {
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsQuery({ location: locationFilter, sortBy });

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value);
  };

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">All Hotels</h1>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">All Hotels</h1>
          <p className="text-red-500">{error?.toString()}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Hotels</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={handleLocationFilter}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Select onValueChange={setSortBy} value={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotels?.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} confidence={1} />
          ))}
        </div>

        {hotels?.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No hotels found matching your criteria
          </p>
        )}
      </div>
    </section>
  );
}
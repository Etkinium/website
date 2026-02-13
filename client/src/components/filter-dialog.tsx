import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { turkeyProvinces, getDistrictsByProvince } from "@/data/turkey-locations";
import { MapPin, TrendingUp, TrendingDown, Filter, X, Check, Calendar, Star, Clock, Users, Music, Theater, Mic2, Trophy, Palette, UtensilsCrossed, Flame, Wine, Fish, Beef, Coffee } from "lucide-react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "event" | "restaurant";
}

const eventCategories = [
  { id: "konser", label: "Konser", icon: Music },
  { id: "tiyatro", label: "Tiyatro", icon: Theater },
  { id: "standup", label: "Stand-up", icon: Mic2 },
  { id: "spor", label: "Spor", icon: Trophy },
  { id: "festival", label: "Festival", icon: Flame },
  { id: "sanat", label: "Sanat", icon: Palette },
];

const restaurantCategories = [
  { id: "turk", label: "Türk Mutfağı", icon: UtensilsCrossed },
  { id: "italyan", label: "İtalyan", icon: UtensilsCrossed },
  { id: "fine-dining", label: "Fine Dining", icon: Wine },
  { id: "deniz", label: "Deniz Ürünleri", icon: Fish },
  { id: "steakhouse", label: "Steakhouse", icon: Beef },
  { id: "cafe", label: "Cafe & Brunch", icon: Coffee },
];

const timeSlots = [
  { id: "morning", label: "Sabah (09:00-12:00)" },
  { id: "afternoon", label: "Öğleden Sonra (12:00-17:00)" },
  { id: "evening", label: "Akşam (17:00-21:00)" },
  { id: "night", label: "Gece (21:00+)" },
];

const ratingOptions = [
  { value: 4.5, label: "4.5+" },
  { value: 4.0, label: "4.0+" },
  { value: 3.5, label: "3.5+" },
  { value: 3.0, label: "3.0+" },
];

export default function FilterDialog({ isOpen, onClose, type }: FilterDialogProps) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [priceSort, setPriceSort] = useState<"" | "low-high" | "high-low">("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "">("");

  const districts = selectedProvince ? getDistrictsByProvince(selectedProvince) : [];
  const categories = type === "event" ? eventCategories : restaurantCategories;

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleTimeSlot = (id: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleApplyFilters = () => {
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setPriceSort("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
    setSelectedTimeSlots([]);
    setMinRating(null);
    setDateRange("");
  };

  const activeFilterCount = [
    selectedProvince,
    priceSort,
    minPrice,
    maxPrice,
    selectedCategories.length > 0 ? "cat" : "",
    selectedTimeSlots.length > 0 ? "time" : "",
    minRating ? "rating" : "",
    dateRange,
  ].filter(Boolean).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-neutral-800 max-w-lg mx-auto max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-white flex items-center justify-center gap-2">
            <Filter className="w-5 h-5 text-accent-amber" />
            <span>{type === "event" ? "Etkinlik" : "Restoran"} Filtreleri</span>
            {activeFilterCount > 0 && (
              <span className="ml-2 w-6 h-6 rounded-full bg-accent-amber text-black text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-white flex items-center gap-2 text-sm font-semibold">
              {type === "event" ? <Music className="w-4 h-4 text-accent-amber" /> : <UtensilsCrossed className="w-4 h-4 text-accent-amber" />}
              {type === "event" ? "Etkinlik Türü" : "Mutfak Türü"}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center ${
                      isSelected
                        ? "bg-accent-amber/15 border-accent-amber/50 text-accent-amber"
                        : "bg-neutral-900/50 border-neutral-800 text-white/60 hover:border-neutral-700"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span className="text-[10px] font-medium">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range (Events) / Time Slots */}
          {type === "event" ? (
            <div className="space-y-3 border-t border-neutral-800 pt-4">
              <Label className="text-white flex items-center gap-2 text-sm font-semibold">
                <Calendar className="w-4 h-4 text-accent-amber" />
                Tarih Aralığı
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "today" as const, label: "Bugün" },
                  { id: "week" as const, label: "Bu Hafta" },
                  { id: "month" as const, label: "Bu Ay" },
                  { id: "" as const, label: "Tümü" },
                ].map((opt) => (
                  <button
                    key={opt.id || "all"}
                    onClick={() => setDateRange(opt.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                      dateRange === opt.id
                        ? "bg-accent-amber text-black border-accent-amber"
                        : "bg-neutral-900/50 text-white/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Time Slots */}
          <div className="space-y-3 border-t border-neutral-800 pt-4">
            <Label className="text-white flex items-center gap-2 text-sm font-semibold">
              <Clock className="w-4 h-4 text-accent-amber" />
              {type === "event" ? "Saat Aralığı" : "Rezervasyon Saati"}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlots.includes(slot.id);
                return (
                  <button
                    key={slot.id}
                    onClick={() => toggleTimeSlot(slot.id)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                      isSelected
                        ? "bg-accent-amber/15 border-accent-amber/50 text-accent-amber"
                        : "bg-neutral-900/50 text-white/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3 border-t border-neutral-800 pt-4">
            <Label className="text-white flex items-center gap-2 text-sm font-semibold">
              <MapPin className="w-4 h-4 text-accent-amber" />
              Konum
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/40 text-xs">İl</Label>
                <Select value={selectedProvince} onValueChange={(val) => { setSelectedProvince(val); setSelectedDistrict(""); }}>
                  <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white mt-1 h-9 text-xs" data-testid="select-province">
                    <SelectValue placeholder="İl seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 max-h-60">
                    {turkeyProvinces.map((province) => (
                      <SelectItem key={province.id} value={province.id} className="text-white hover:bg-neutral-800 text-xs">
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/40 text-xs">İlçe</Label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedProvince}>
                  <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white mt-1 h-9 text-xs" data-testid="select-district">
                    <SelectValue placeholder={selectedProvince ? "İlçe seçin" : "Önce il seçin"} />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800 max-h-60">
                    {districts.map((district) => (
                      <SelectItem key={district} value={district} className="text-white hover:bg-neutral-800 text-xs">
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3 border-t border-neutral-800 pt-4">
            <Label className="text-white flex items-center gap-2 text-sm font-semibold">
              <Star className="w-4 h-4 text-accent-amber" />
              Minimum Puan
            </Label>
            <div className="flex gap-2">
              {ratingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMinRating(minRating === opt.value ? null : opt.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    minRating === opt.value
                      ? "bg-accent-amber text-black border-accent-amber"
                      : "bg-neutral-900/50 text-white/60 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <Star className={`w-3 h-3 ${minRating === opt.value ? "fill-black" : "fill-accent-amber text-accent-amber"}`} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-3 border-t border-neutral-800 pt-4">
            <Label className="text-white flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="w-4 h-4 text-accent-amber" />
              Fiyat
            </Label>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => setPriceSort(priceSort === "low-high" ? "" : "low-high")}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border transition-all text-xs font-medium ${
                  priceSort === "low-high"
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-neutral-900/50 text-white/60 border-neutral-800 hover:border-neutral-700"
                }`}
                data-testid="sort-low-high"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Düşükten Yükseğe
              </button>
              <button
                onClick={() => setPriceSort(priceSort === "high-low" ? "" : "high-low")}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg border transition-all text-xs font-medium ${
                  priceSort === "high-low"
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-neutral-900/50 text-white/60 border-neutral-800 hover:border-neutral-700"
                }`}
                data-testid="sort-high-low"
              >
                <TrendingDown className="w-3.5 h-3.5" />
                Yüksekten Düşüğe
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/40 text-xs">Min (₺)</Label>
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="bg-neutral-900 border-neutral-800 text-white mt-1 h-9 text-xs"
                  data-testid="input-min-price"
                />
              </div>
              <div>
                <Label className="text-white/40 text-xs">Max (₺)</Label>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="10000"
                  className="bg-neutral-900 border-neutral-800 text-white mt-1 h-9 text-xs"
                  data-testid="input-max-price"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-neutral-800">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1 border-neutral-700 text-white hover:bg-neutral-800 h-11"
              data-testid="button-clear-filters"
            >
              <X className="w-4 h-4 mr-2" />
              Temizle
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-accent-amber text-black hover:bg-yellow-400 font-semibold h-11"
              data-testid="button-apply-filters"
            >
              <Check className="w-4 h-4 mr-2" />
              {activeFilterCount > 0 ? `Uygula (${activeFilterCount})` : "Uygula"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

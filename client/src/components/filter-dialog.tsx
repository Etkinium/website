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
import { MapPin, TrendingUp, TrendingDown, Filter, X, Check } from "lucide-react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "event" | "restaurant";
}

export default function FilterDialog({ isOpen, onClose, type }: FilterDialogProps) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [priceSort, setPriceSort] = useState<"" | "low-high" | "high-low">("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const districts = selectedProvince ? getDistrictsByProvince(selectedProvince) : [];

  const handleApplyFilters = () => {
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setPriceSort("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/40 max-w-md mx-auto overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Filter className="w-6 h-6 text-accent-amber" />
            <span>Filtrele</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label className="text-white flex items-center gap-2 text-base font-semibold">
              <MapPin className="w-5 h-5 text-accent-amber" />
              Konum
            </Label>
            
            <div className="space-y-3">
              <div>
                <Label className="text-gray-400 text-sm">İl</Label>
                <Select value={selectedProvince} onValueChange={(val) => { setSelectedProvince(val); setSelectedDistrict(""); }}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-1" data-testid="select-province">
                    <SelectValue placeholder="İl seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
                    {turkeyProvinces.map((province) => (
                      <SelectItem key={province.id} value={province.id} className="text-white hover:bg-gray-700">
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">İlçe</Label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedProvince}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-1" data-testid="select-district">
                    <SelectValue placeholder={selectedProvince ? "İlçe seçin" : "Önce il seçin"} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
                    {districts.map((district) => (
                      <SelectItem key={district} value={district} className="text-white hover:bg-gray-700">
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 space-y-4">
            <Label className="text-white flex items-center gap-2 text-base font-semibold">
              <TrendingUp className="w-5 h-5 text-accent-amber" />
              Fiyat Sıralaması
            </Label>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPriceSort("low-high")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  priceSort === "low-high"
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-gray-800 text-white border-gray-600 hover:border-accent-amber/50"
                }`}
                data-testid="sort-low-high"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Düşükten Yükseğe</span>
              </button>
              
              <button
                onClick={() => setPriceSort("high-low")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  priceSort === "high-low"
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-gray-800 text-white border-gray-600 hover:border-accent-amber/50"
                }`}
                data-testid="sort-high-low"
              >
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Yüksekten Düşüğe</span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 space-y-4">
            <Label className="text-white text-base font-semibold">Fiyat Aralığı</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-gray-400 text-sm">Min (₺)</Label>
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="bg-gray-800 border-gray-600 text-white mt-1"
                  data-testid="input-min-price"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Max (₺)</Label>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="10000"
                  className="bg-gray-800 border-gray-600 text-white mt-1"
                  data-testid="input-max-price"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1 border-gray-600 text-white hover:bg-gray-800"
              data-testid="button-clear-filters"
            >
              <X className="w-4 h-4 mr-2" />
              Temizle
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-accent-amber text-black hover:bg-yellow-400 font-semibold"
              data-testid="button-apply-filters"
            >
              <Check className="w-4 h-4 mr-2" />
              Uygula
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

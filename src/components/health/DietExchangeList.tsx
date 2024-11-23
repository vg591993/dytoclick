// src/components/health/DietExchangeList.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Circle, Apple, Cookie, Leaf, CircleDot, Egg, 
  Carrot, Loader2 , LayoutGrid, Table as TableIcon, Plus, 
  Minus, Edit2, Save, SaveAll 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { fetchExchangeList, saveExchangeList, type ExchangeListResponse } from '@/app/api/services/exchangeListApi';
import { FOOD_GROUP_FACTORS, FOOD_GROUP_ICONS, type FoodGroup } from '@/constants/exchangeList';
import { useToast } from '@/hooks/use-toast';

type DietExchangeListProps = {
  sidebarOpen: boolean;
  clientId: string;
  token: string;
} 

interface ExchangeItem extends ExchangeListResponse {
  icon: any;
}

const iconComponents = {
  Circle,
  Apple,
  Cookie,
  Leaf,
  CircleDot,
  Egg,
  Carrot,
};

const iconMap = Object.fromEntries(
  Object.entries(FOOD_GROUP_ICONS).map(([key, value]) => [
    key,
    iconComponents[value as keyof typeof iconComponents]
  ])
) as Record<FoodGroup, any>;

export const DietExchangeList: React.FC<DietExchangeListProps> = ({ sidebarOpen, clientId, token }) => {
  const [data, setData] = useState<ExchangeItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Add this if you have shadcn/ui toast


  useEffect(() => {
    const loadExchangeList = async () => {
      try {
        setLoading(true);
        const apiData = await fetchExchangeList(clientId, token);
        
        const transformedData = apiData.map(item => ({
          ...item,
          icon: iconMap[item.id] || Circle
        }));
        
        setData(transformedData);
      } catch (err) {
        setError('Failed to load exchange list data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadExchangeList();
  }, [clientId, token]);

  const handleSaveTable = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Validate data before sending
      if (!data || data.length === 0) {
        throw new Error('No data available to save');
      }
      
      // Remove the icon property from the data before sending
      const dataForSaving = data.map(({ icon, ...rest }) => rest);
      
      const updatedData = await saveExchangeList(clientId, token, dataForSaving);
      
      // Validate the response data
      if (!updatedData || !Array.isArray(updatedData)) {
        throw new Error('Invalid response from server');
      }
  
      // Transform the response data to include icons
      const transformedData = updatedData.map(item => ({
        ...item,
        icon: iconMap[item.id] || Circle
      }));
      
      setData(transformedData);
      
      // Show success toast
      toast({
        title: "Changes saved successfully",
        variant: "default",
      });
  
    } catch (err) {
      console.error('Error saving exchange list:', err);
      setError(err instanceof Error ? err.message : 'Failed to save changes. Please try again.');
      
      toast({
        title: "Error saving changes",
        description: err instanceof Error ? err.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const renderSaveButton = () => (
    <Button
      onClick={handleSaveTable}
      className="bg-[#2a5b52] text-white hover:bg-[#1e453e] transition-colors flex items-center gap-2"
      size="sm"
      disabled={saving}
    >
      {saving ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <SaveAll size={16} />
      )}
      {saving ? 'Saving...' : 'Save'}
    </Button>
  );

  const totals = data.reduce((acc, item) => ({
    carb: +(acc.carb + item.carb).toFixed(1),
    prot: +(acc.prot + item.prot).toFixed(1),
    fat: +(acc.fat + item.fat).toFixed(1),
    energy: +(acc.energy + item.energy).toFixed(1),
  }), { carb: 0, prot: 0, fat: 0, energy: 0 });

  const handleNeChange = (id: FoodGroup, newNe: number) => {
    setData(data.map(item => {
      if (item.id === id) {
        const factors = FOOD_GROUP_FACTORS[id];
        return {
          ...item,
          ne: newNe,
          amount: Number((factors.amount * newNe).toFixed(1)),
          carb: Number((factors.carb * newNe).toFixed(1)),
          prot: Number((factors.prot * newNe).toFixed(1)),
          fat: Number((factors.fat * newNe).toFixed(1)),
          energy: Number((factors.energy * newNe).toFixed(1))
        };
      }
      return item;
    }));
  };

  const handleIncrement = (id: FoodGroup) => {
    const item = data.find(i => i.id === id);
    if (item) {
      handleNeChange(id, +(item.ne + 0.1).toFixed(2));
    }
  };

  const handleDecrement = (id: FoodGroup) => {
    const item = data.find(i => i.id === id);
    if (item && item.ne > 0.1) {
      handleNeChange(id, +(item.ne - 0.1).toFixed(2));
    }
  };

  const renderControls = (id: FoodGroup, ne: number) => (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleDecrement(id)}
        className="p-1 rounded-full hover:bg-[#1e453e]/20 transition-colors"
      >
        <Minus size={14} className={viewMode === 'table' ? 'text-[#2a5b52]' : 'text-white'} />
      </button>
      {editMode[id] ? (
        <input
          type="number"
          value={ne}
          onChange={(e) => handleNeChange(id, +e.target.value)}
          className="w-16 px-2 py-1 rounded bg-white text-[#2a5b52] text-center text-sm"
          step="0.1"
        />
      ) : (
        <span className={`${viewMode === 'table' ? 'bg-[#f4f8f6]' : 'bg-white text-[#2a5b52]'} 
                       px-2 py-1 rounded text-sm font-medium min-w-[3rem] text-center`}>
          {ne}
        </span>
      )}
      <button
        onClick={() => handleIncrement(id)}
        className="p-1 rounded-full hover:bg-[#1e453e]/20 transition-colors"
      >
        <Plus size={14} className={viewMode === 'table' ? 'text-[#2a5b52]' : 'text-white'} />
      </button>
      <button
        onClick={() => setEditMode({ ...editMode, [id]: !editMode[id] })}
        className="p-1 rounded-full hover:bg-[#1e453e]/20 transition-colors ml-1"
      >
        {editMode[id] ? 
          <Save size={14} className={viewMode === 'table' ? 'text-[#2a5b52]' : 'text-white'} /> : 
          <Edit2 size={14} className={viewMode === 'table' ? 'text-[#2a5b52]' : 'text-white'} />
        }
      </button>
    </div>
  );

  const renderTotalsCard = () => (
    <Card className="base-card overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-[#2a5b52] to-[#1e453e]">
      <CardHeader className="text-white p-4">
        <CardTitle className="text-lg">Daily Totals</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-4 text-sm">
          <div className="p-3 bg-white/10">
            <span className="text-white/70">Total Carbs</span>
            <div className="font-medium text-white mt-1">{totals.carb}g</div>
          </div>
          <div className="p-3 bg-white/5">
            <span className="text-white/70">Total Protein</span>
            <div className="font-medium text-white mt-1">{totals.prot}g</div>
          </div>
          <div className="p-3 bg-white/10">
            <span className="text-white/70">Total Fat</span>
            <div className="font-medium text-white mt-1">{totals.fat}g</div>
          </div>
          <div className="p-3 bg-white/5">
            <span className="text-white/70">Total Energy</span>
            <div className="font-medium text-white mt-1">{totals.energy} kcal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGridView = () => (
    <>
      <div className={`grid gap-4 ${
        sidebarOpen 
          ? 'grid-cols-1 xl:grid-cols-2' 
          : 'md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {data.map(({ id, icon: ItemIcon, ne, amount, carb, prot, fat, energy }) => (
          <Card key={id} className="base-card overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#2a5b52] to-[#1e453e] text-white p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ItemIcon size={20} />
                  {id.replace(/_/g, ' ')}
                </CardTitle>
                {renderControls(id, ne)}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#e9f0e6]">
                <div className="grid grid-cols-2 text-sm">
                  <div className="p-3 mint-warm-gradient">
                    <span className="text-[#2a5b52]/70">Amount</span>
                    <div className="font-medium text-[#2a5b52] mt-1">{amount}g</div>
                  </div>
                  <div className="p-3">
                    <span className="text-[#2a5b52]/70">Energy</span>
                    <div className="font-medium text-[#2a5b52] mt-1">{energy} kcal</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <div className="p-3 warm-gradient">
                    <span className="text-[#2a5b52]/70">Carbs</span>
                    <div className="font-medium text-[#2a5b52] mt-1">{carb}g</div>
                  </div>
                  <div className="p-3 mint-warm-gradient">
                    <span className="text-[#2a5b52]/70">Protein</span>
                    <div className="font-medium text-[#2a5b52] mt-1">{prot}g</div>
                  </div>
                  <div className="p-3 warm-gradient">
                    <span className="text-[#2a5b52]/70">Fat</span>
                    <div className="font-medium text-[#2a5b52] mt-1">{fat}g</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        {renderTotalsCard()}
      </div>
    </>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <Table className="w-full border-collapse bg-gradient-to-br from-[#fff]/95 to-[#f8f8f6]/90 rounded-lg shadow-md">
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="bg-gradient-to-r from-[#2a5b52] to-[#1e453e]">
            <TableHead className="text-white font-semibold">Food Group</TableHead>
            <TableHead className="text-white text-center font-semibold">No. of Exchange</TableHead>
            <TableHead className="text-white text-right font-semibold">Amount (g)</TableHead>
            <TableHead className="text-white text-right font-semibold">Carbs (g)</TableHead>
            <TableHead className="text-white text-right font-semibold">Protein (g)</TableHead>
            <TableHead className="text-white text-right font-semibold">Fat (g)</TableHead>
            <TableHead className="text-white text-right font-semibold">Energy (kcal)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id, icon: ItemIcon, ne, amount, carb, prot, fat, energy }) => (
            <TableRow 
              key={id} 
              className="border-b border-[#e9f0e6] hover:bg-[#f4f8f6] transition-colors"
              style={{ contain: 'content' }} 
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <ItemIcon size={20} className="text-[#2a5b52]" />
                  {id.replace(/_/g, ' ')}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  {renderControls(id, ne)}
                </div>
              </TableCell>
              <TableCell className="text-right tabular-nums">{amount}</TableCell>
              <TableCell className="text-right tabular-nums">{carb}</TableCell>
              <TableCell className="text-right tabular-nums">{prot}</TableCell>
              <TableCell className="text-right tabular-nums">{fat}</TableCell>
              <TableCell className="text-right tabular-nums">{energy}</TableCell>
            </TableRow>
          ))}
          {/* Totals Row */}
          <TableRow className="border-t-2 border-[#2a5b52] bg-gradient-to-r from-[#2a5b52] to-[#1e453e] text-white font-medium">
            <TableCell className="font-bold" colSpan={3}>TOTAL</TableCell>
            <TableCell className="text-right tabular-nums">{totals.carb}</TableCell>
            <TableCell className="text-right tabular-nums">{totals.prot}</TableCell>
            <TableCell className="text-right tabular-nums">{totals.fat}</TableCell>
            <TableCell className="text-right tabular-nums">{totals.energy}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center text-[#2a5b52]">Loading exchange list data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold gradient-text">Diet Exchange List</h1>
        <div className="flex items-center gap-2">
        {renderSaveButton()}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            className="p-2 rounded-full bg-[#f4f8f6] hover:bg-[#e9f0e6] text-[#2a5b52] transition-colors"
            title={viewMode === 'grid' ? 'Switch to Table View' : 'Switch to Grid View'}
          >
            {viewMode === 'grid' ? <TableIcon size={20} /> : <LayoutGrid size={20} />}
          </button>
        </div>
      </div>

      {/* Add error message display if needed */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="transform transition-transform duration-300">
        {viewMode === 'table' ? renderTableView() : renderGridView()}
      </div>
    </div>
  );
};

export default DietExchangeList;
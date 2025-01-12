import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Database } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, X } from "lucide-react";
import { useState } from "react";

type OrderStatus = Database["public"]["Enums"]["order_status"];

interface OrderFiltersProps {
  onSearch: (searchTerm: string) => void;
  onStatusFilter: (status: OrderStatus | null) => void;
  onDateFilter: (dates: { from: Date | null; to: Date | null }) => void;
  onClearFilters: () => void;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending_payment", label: "待付款" },
  { value: "paid", label: "已付款" },
  { value: "processing", label: "处理中" },
  { value: "shipped", label: "已发货" },
  { value: "delivered", label: "已送达" },
  { value: "refund_requested", label: "申请退款" },
  { value: "refunded", label: "已退款" },
];

export const OrderFilters = ({
  onSearch,
  onStatusFilter,
  onDateFilter,
  onClearFilters,
}: OrderFiltersProps) => {
  const [date, setDate] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  const handleDateSelect = (dates: { from: Date | null; to: Date | null }) => {
    setDate(dates);
    onDateFilter(dates);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <Input
        placeholder="搜索订单号或收件人"
        className="max-w-sm"
        onChange={(e) => onSearch(e.target.value)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            状态筛选
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onStatusFilter(null)}>
            全部状态
          </DropdownMenuItem>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onStatusFilter(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              "选择日期范围"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setDate({ from: null, to: null });
          onClearFilters();
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
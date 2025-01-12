import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

type FilterState = {
  search: string;
  status: OrderStatus | "all";
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
};

interface OrderFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const statusOptions: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "全部状态" },
  { value: "pending_payment", label: "待付款" },
  { value: "paid", label: "已付款" },
  { value: "processing", label: "处理中" },
  { value: "shipped", label: "已发货" },
  { value: "delivered", label: "已送达" },
  { value: "refund_requested", label: "申请退款" },
  { value: "refunded", label: "已退款" },
  { value: "payment_timeout", label: "支付超时" },
];

export const OrderFilters = ({ filters, onFiltersChange }: OrderFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value as OrderStatus | "all",
    });
  };

  const handleDateChange = (field: "from" | "to", value: Date | undefined) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row items-end">
      <div className="flex-1 w-full sm:w-auto">
        <Input
          placeholder="搜索订单号或收件人"
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      <Select
        value={filters.status}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="订单状态" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[130px] justify-start text-left font-normal",
                !filters.dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                format(filters.dateRange.from, "yyyy-MM-dd")
              ) : (
                <span>开始日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateRange.from}
              onSelect={(date) => handleDateChange("from", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[130px] justify-start text-left font-normal",
                !filters.dateRange.to && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.to ? (
                format(filters.dateRange.to, "yyyy-MM-dd")
              ) : (
                <span>结束日期</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.dateRange.to}
              onSelect={(date) => handleDateChange("to", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={clearFilters}
        className="h-10 w-10"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
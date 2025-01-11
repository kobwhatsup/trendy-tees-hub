import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

interface DesignTimestampProps {
  createdAt: string;
}

export const DesignTimestamp = ({ createdAt }: DesignTimestampProps) => {
  return (
    <p className="text-sm text-muted-foreground">
      创建于 {formatDistanceToNow(new Date(createdAt), { locale: zhCN, addSuffix: true })}
    </p>
  );
};
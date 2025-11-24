import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TabConfig<T extends string> = {
  value: T;
  label: string;
  showCount?: boolean;
};

type ReusableTabsProps<T extends string> = {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  tabs: TabConfig<T>[];
  data?: any[];
  countKey?: string; // Key to count by (e.g., "status")
  className?: string;
};

const ReusableTabs = <T extends string>({
  activeTab,
  setActiveTab,
  tabs,
  data = [],
  countKey,
  className,
}: ReusableTabsProps<T>) => {
  const getCount = (value: T) => {
    if (!countKey || !data.length) return 0;
    if (value === "all") return data.length;
    return data.filter((item) => item[countKey] === value).length;
  };

  const tabTriggerClasses = cn(
    "data-[state=active]:text-megagreen",
    "data-[state=active]:bg-transparent",
    "data-[state=active]:shadow-none",
    "data-[state=active]:border-b-megagreen",
    "data-[state=active]:dark:border-b-megagreen",
    "rounded-none border-b-2 flex items-center gap-1 relative"
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val) => setActiveTab(val as T)}
      className={cn(
        "flex sm:gap-8 bg-transparent border-b rounded-none pb-0 overflow-x-auto scrollbar-hide",
        className
      )}
    >
      <TabsList className="bg-transparent gap-10 border-b-0">
        {tabs.map((tab) => {
          const count = tab.showCount ? getCount(tab.value) : 0;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={tabTriggerClasses}
            >
              {tab.label}
              {tab.showCount && count > 0 && (
                <span className="absolute top-0 -right-4 bg-[#FD9A06] text-white text-[8px] px-[8px] py-1 rounded-full">
                  {count}
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default ReusableTabs;
import clsx from 'clsx';
import { ChevronDown, PlusIcon } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import InputText from '../ui/input-text';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DataSelectorProps<T> {
  id?: string;
  dataType?: string;
  dataId?: string;

  selectedEntry?: T;
  recentList?: T[];
  filteredList?: T[];
  loadNextPage?: () => void;
  onSelect?: (item?: T) => void;
  onAddItem?: () => void;

  children: React.ReactNode;
}
export default function DataSelector<T>({
  id,
  dataId,
  dataType = 'item',
  selectedEntry,
  recentList,
  filteredList,
  loadNextPage,
  onSelect,
  onAddItem,
  children,
}: DataSelectorProps<T>) {
  const itemComponent = React.Children.toArray(children).find((child: any) => child.type === DataSelector.Item);
  let selectedItemComponent = React.Children.toArray(children).find(
    (child: any) => child.type === DataSelector.SelectedItem
  );

  if (!selectedItemComponent) {
    selectedItemComponent = itemComponent;
  }

  const [showList, setShowList] = useState<boolean>(false);
  const entries = useMemo(() => {
    const clients = filteredList ? filteredList : recentList;
    return {
      data: clients,
      label: !filteredList ? 'Recent' : null,
    };
  }, [recentList, filteredList]);

  const handleItemClick = useCallback(
    (item?: T) => {
      if (onSelect) {
        onSelect(item);
      }

      setShowList(false);
    },
    [selectedEntry, onSelect]
  );

  useEffect(() => {
    setShowList(false);
  }, [selectedEntry]);

  return (
    <div id={id} className="relative flex flex-col gap-1">
      <Popover open={showList} onOpenChange={setShowList} modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto w-full justify-between border border-surface-border-500">
            {selectedEntry ? (
              selectedItemComponent ? (
                React.cloneElement(selectedItemComponent as React.ReactElement<any>, {
                  item: selectedEntry,
                })
              ) : null
            ) : (
              <div>Find or add {dataType}...</div>
            )}
            <ChevronDown className={clsx({ '-rotate-180': showList })} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={clsx('PopoverContent', { hidden: !showList })}
          container={document.getElementById('clientSelector')}
        >
          <div className="w-full">
            <div className="rounded-md">
              <div className="flex flex-col gap-2">
                <div>
                  <InputText placeholder={`Search for ${dataType}...`} className="text-sm" />
                </div>

                <div>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className="h-auto w-full border border-surface-border-300 bg-surface-300 py-1"
                      type="button"
                      onClick={onAddItem}
                    >
                      <PlusIcon />
                      Add new {dataType}
                    </Button>

                    <div className="my-1">
                      <hr className="border-surface-border-300" />
                    </div>

                    {entries.label && <div className="text-sm font-bold">{entries.label}</div>}
                    {entries.data?.map((entry: any) =>
                      itemComponent ? (
                        <Button
                          key={dataId ? entry[dataId] : undefined}
                          variant="ghost"
                          className="h-auto w-full justify-start rounded-sm px-2 py-1 hover:bg-primary-400 hover:text-background"
                          onClick={() => handleItemClick(entry)}
                        >
                          {React.cloneElement(itemComponent as React.ReactElement<any>, {
                            item: entry,
                          })}
                        </Button>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

DataSelector.SelectedItem = ({ item, children }: { item?: any; children: (item: any) => React.ReactNode }) => {
  if (!item) throw new Error('DataSelector.SelectedItem must be used inside DataSelector');
  return <>{children(item)}</>;
};

DataSelector.Item = ({ item, children }: { item?: any; children: (item: any) => React.ReactNode }) => {
  if (!item) throw new Error('DataSelector.Item must be used inside DataSelector');
  return <>{children(item)}</>;
};

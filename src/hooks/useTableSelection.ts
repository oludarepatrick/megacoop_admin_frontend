import { useState } from "react"


type UseTableSelectionReturn<T> ={
    selectedIds: T[]
    isAllSelected: boolean
    isIndeterminate: boolean
    handleToggleOne: (id: T) => void
    handleToggleAll: () => void
    clearSelection: () => void
}

/**
 * Reusable hook for table row selection with select-all support.
 * 
 * @param items  - The full list of table rows
 * @param getId  - A function that extracts the unique ID from each row
 * 
 * @example
 * const { selectedIds, isAllSelected, handleToggleOne, handleToggleAll } =
 *     useTableSelection(users, (user) => user.id)
 */

export function useTableSelection<Item, Id>(
    items: Item[],
    getId: (item: Item) => Id,
): UseTableSelectionReturn<Id>{
    const [selectedIds, setSelectedIds] = useState<Id[]>([]);

    const isAllSelected = items.length > 0 && selectedIds.length === items.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

    const handleToggleOne = (id: Id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        if(isAllSelected) {
            setSelectedIds([])
        } else {
            setSelectedIds(items.map(getId))
        };
    };

    // clear selection after action is completed

    const clearSelection = () => setSelectedIds([]);

    return {
        selectedIds,
        isAllSelected,
        isIndeterminate,
        handleToggleAll,
        handleToggleOne,
        clearSelection,
    }

}
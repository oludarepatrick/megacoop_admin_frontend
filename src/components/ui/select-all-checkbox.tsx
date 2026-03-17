import { useEffect, useRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"

type SelectAllCheckboxProps = {
    isAllSelected: boolean
    isIndeterminate: boolean
    onToggle: () => void
}


export function SelectAllCheckbox({ isAllSelected, isIndeterminate, onToggle }: SelectAllCheckboxProps) {
    const ref = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.dataset.state = isIndeterminate
                ? "indeterminate"
                : isAllSelected
                ? "checked"
                : "unchecked"
        }
    }, [isAllSelected, isIndeterminate])

    return (
        <Checkbox
            ref={ref}
            checked={isAllSelected}
            onCheckedChange={onToggle}
            aria-label="Select all"
        />
    )
}
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { IconRefresh } from '@tabler/icons-react'
import { Search } from 'lucide-react'

interface FilterProps {
    params: any
    setParams: (value: any) => void
    resetParams: () => void
    total: number // ⬅️ TAMBAHKAN INI
}

export default function Filter({
    params,
    setParams,
    resetParams,
    total,
}: FilterProps) {

    const showLoad = total > 10 // ⬅️ VALIDASI UTAMA

    return (
        <div className="flex w-full flex-wrap items-end gap-4">
            {/* Search */}
            <div className="relative w-[280px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    className="pl-9"
                    placeholder="Search..."
                    value={params?.search}
                    onChange={(e) =>
                        setParams((prev: any) => ({
                            ...prev,
                            search: e.target.value,
                            page: 1,
                        }))
                    }
                />
            </div>

            {/* From */}
            <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">From</span>
                <Input
                    type="date"
                    className="w-[160px]"
                    value={params?.created_from}
                    onChange={(e) =>
                        setParams((prev: any) => ({
                            ...prev,
                            created_from: e.target.value,
                            page: 1,
                        }))
                    }
                />
            </div>

            {/* To */}
            <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">To</span>
                <Input
                    type="date"
                    className="w-[160px]"
                    value={params?.created_to}
                    onChange={(e) =>
                        setParams((prev: any) => ({
                            ...prev,
                            created_to: e.target.value,
                            page: 1,
                        }))
                    }
                />
            </div>

            {/* Load - CONDITIONAL */}
            {showLoad && (
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Load</span>
                    <Select
                        value={params?.load}
                        onValueChange={(e: any) =>
                            setParams({ ...params, load: e, page: 1 })
                        }
                    >
                        <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Load" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 25, 50].map((number) => (
                                <SelectItem
                                    key={number}
                                    value={number.toString()}
                                >
                                    {number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Reset */}
            <Button
                variant='outline'
                size="icon"
                onClick={resetParams}
                className='cursor-pointer'
            >
                <IconRefresh className="size-4" />
            </Button>
        </div>
    )
}
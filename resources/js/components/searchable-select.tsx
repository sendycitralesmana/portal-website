// import { Check, ChevronsUpDown } from 'lucide-react';
// import * as React from 'react';

// import { Button } from '@/components/ui/button';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
// import { cn } from '@/lib/utils';

// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// type Option = {
//     label: string;
//     value: string;
// };

// type Props = {
//     options: Option[];
//     value?: string;
//     placeholder?: string;
//     searchPlaceholder?: string;
//     onChange: (value: string) => void;
// };

// export default function SearchableSelect({ options, value, placeholder = 'Pilih...', searchPlaceholder = 'Cari...', onChange }: Props) {
//     const [open, setOpen] = React.useState(false);

//     const selected = options.find((opt) => opt.value === value);

//     return (
//         <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//                 <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
//                     {selected ? selected.label : placeholder}

//                     <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
//                 </Button>
//             </PopoverTrigger>

//             <PopoverContent align="start" className="w-[--radix-popover-trigger-width] p-0">
//                 <Command>
//                     <CommandInput placeholder={searchPlaceholder} />

//                     <CommandList>
//                         <CommandEmpty>Tidak ditemukan.</CommandEmpty>

//                         <CommandGroup>
//                             {options.map((option) => (
//                                 <CommandItem
//                                     key={option.value}
//                                     value={option.label}
//                                     onSelect={() => {
//                                         onChange(option.value);
//                                         setOpen(false);
//                                     }}
//                                 >
//                                     <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />

//                                     {option.label}
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </CommandList>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     );
// }


import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    value?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    onChange: (value: string) => void;

    label?: string;
    required?: boolean;
    error?: string;
    className?: string;
};

export default function SearchableSelect({
    options,
    value,
    placeholder = 'Pilih...',
    searchPlaceholder = 'Cari...',
    onChange,
    label,
    required = false,
    error,
    className,
}: Props) {
    const [open, setOpen] = React.useState(false);

    const selected = options.find((opt) => opt.value === value);

    return (
        <div className="grid gap-1.5">

            {label && (
                <Label>
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            'w-full justify-between',
                            error && 'border-red-500',
                            className
                        )}
                    >
                        {selected ? selected.label : placeholder}

                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-[--radix-popover-trigger-width] p-0"
                >
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />

                        <CommandList className="max-h-64 overflow-y-auto">

                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>

                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() => {
                                            onChange(option.value);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                value === option.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />

                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && <InputError message={error} />}
        </div>
    );
}
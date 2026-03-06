import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function ModeToggleTabs({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: '' },
        { value: 'dark', icon: Moon, label: '' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'inline-flex justify-center gap-2 rounded-lg bg-blue-50 p-1 dark:bg-blue-900/30',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
                        appearance === value
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md dark:from-blue-500 dark:to-blue-700 dark:text-white'
                            : 'text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-600/50',
                    )}
                >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}

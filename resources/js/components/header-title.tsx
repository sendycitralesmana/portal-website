import { LucideIcon } from 'lucide-react';

type HeaderTitleProps = {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
};

const HeaderTitle = ({ title, subtitle, icon: Icon }: HeaderTitleProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-x-2">
                {Icon && <Icon className="size-6" />}
                <h1 className="text-lg font-bold lg:text-2xl">
                    {title}
                </h1>
            </div>

            {subtitle && (
                <p className="text-sm font-medium text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default HeaderTitle;

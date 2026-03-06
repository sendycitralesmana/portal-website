import { router } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import pickBy from "lodash/pickBy";

interface UseFilterProps<T extends Record<string, any>> {
    route: string;
    values: T;
    only?: string[];
    wait?: number;
    onLoading?: (loading: boolean) => void;
}

export function useFilter<T extends Record<string, any>>({
    route,
    values,
    only,
    wait = 300,
    onLoading,
}: UseFilterProps<T>) {

    const debouncedRef = useRef(
        debounce((query: T) => {
            onLoading?.(true);

            router.get(route, pickBy(query), {
                only,
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    onLoading?.(false);
                },
            });
        }, wait)
    );

    useEffect(() => {
        debouncedRef.current(values);

        return () => {
            debouncedRef.current.cancel();
        };
    }, [values]);
}
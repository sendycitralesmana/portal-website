import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type LinksType = {
  url: string;
  label: string;
  active: boolean;
};

type HighlightsType = {
  links: LinksType[];
  from: number;
  to: number;
  total: number;
};

const HighlightPagination = ({ highlights }: { highlights: HighlightsType }) => {
  const createLimitedPagination = (links: LinksType[]) => {
    const filtered: (LinksType | "dots")[] = [];
    const pages = links.filter(link => !isNaN(Number(link.label)));
    const currentIndex = pages.findIndex(link => link.active);

    const firstPage = 0;
    const lastPage = pages.length - 1;
    const start = Math.max(currentIndex - 2, firstPage);
    const end = Math.min(currentIndex + 2, lastPage);

    if (start > firstPage) {
      filtered.push(pages[firstPage]);
      if (start > firstPage + 1) filtered.push("dots");
    }

    for (let i = start; i <= end; i++) {
      filtered.push(pages[i]);
    }

    if (end < lastPage) {
      if (end < lastPage - 1) filtered.push("dots");
      filtered.push(pages[lastPage]);
    }

    const prev = links.find(link => link.label.toLowerCase().includes("prev"));
    const next = links.find(link => link.label.toLowerCase().includes("next"));

    return { prev, next, pages: filtered };
  };

  const { prev, next, pages } = createLimitedPagination(highlights.links);

  return (
    <div className="flex flex-col items-center justify-between w-full py-2 lg:flex-row">
      <div>
        {highlights.from} - {highlights.to} of {highlights.total}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {prev?.url && (
          <Button asChild variant="outline" size="sm">
            <Link href={prev.url} className="flex items-center gap-1">
              <ChevronLeft size={14} /> Prev
            </Link>
          </Button>
        )}
        {pages.map((item, idx) =>
          item === "dots" ? (
            <Button key={idx} variant="outline" size="sm" disabled className="pointer-events-none opacity-50">
              ...
            </Button>
          ) : (
            <Button
              key={idx}
              asChild
              variant={item.active ? "primary" : "outline"}
              size="sm"
            >
              <Link href={item.url} dangerouslySetInnerHTML={{ __html: item.label }} />
            </Button>
          )
        )}
        {next?.url && (
          <Button asChild variant="outline" size="sm">
            <Link href={next.url} className="flex items-center gap-1">
              Next <ChevronRight size={14} />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HighlightPagination;


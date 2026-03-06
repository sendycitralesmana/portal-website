type NewsItem = {
  id: number;
  title: string;
  date: string;
};

type ApplicationItem = {
  id: number;
  title: string;
  url: string;
  image: string;
  cover_url: string;
};

type PublicationItem = {
  id: number;
  title: string;
  cover: string | null;
  link: string;
  content: string;
  slug: string; // agar cocok dengan PublicationPreview
  cover_url: string | null;
};

type HighlightItem = {
  id: number;
  title: string;
  cover: string;
  date: string;
  slug: string;
  highlight_category: {
    slug: string;
  };
  news: {
    title: string;
    slug: string;
    created_at: string;
    cover_url: string;
    news_category: {
      slug: string;
    }
  }
};

type AffiliateItem = {
  id: number;
  title: string;
  url: string;
  image: string;
  cover_url: string;
};

type PageProps = {
  artikel: NewsItem[];
  informasi: NewsItem[];
  application: ApplicationItem[];
  applicationExternal: ApplicationItem[];
  affiliates: AffiliateItem[];
  publication: {
    buku: PublicationItem[];
    laporan: PublicationItem[];
    jurnal: PublicationItem[];
    buletin: PublicationItem[];
  };
  highlights: HighlightItem[];
  modals : HighlightItem[];
};

type HeroProps = {
  highlights: HighlightItem[];
};

type Publications = {
  buku: PublicationItem[];
  laporan: PublicationItem[];
  jurnal: PublicationItem[];
  buletin: PublicationItem[];
};
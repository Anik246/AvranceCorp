import { Suspense } from "react";
import { NewsClient } from "./NewsClient";
import posts from "@/data/news.json";

export const metadata = {
  title: "News | AvranceCorp Developments",
  description: "Latest news, press releases, and updates from AvranceCorp Developments.",
};

export default function NewsPage() {
  return (
    <Suspense>
      <NewsClient posts={posts} />
    </Suspense>
  );
}

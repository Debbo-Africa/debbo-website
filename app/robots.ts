import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITEURL}`,
      lastModified: new Date(), 
      changeFrequency: "always", 
      priority: 1,
    },
  ];
}


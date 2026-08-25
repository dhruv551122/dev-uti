import { HomePageQueryResult } from "@/sanity.types"
import { sanityFetch } from "@/sanity/lib/live"
import { homePageQuery } from "@/sanity/lib/query"
import { notFound } from "next/navigation"

export const generateMetadata = async () => {
    const {data} = await sanityFetch<NonNullable<HomePageQueryResult>>({query: homePageQuery})
    if(!data){
        return notFound()
    }

    return {
        title: data.seo.seoTitle,
        description: data.seo.seoDescription,
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
        },
        openGraph: {
          title: data.seo.seoTitle,
          description: data.seo.seoDescription,
          images: [data.seo.seoImage.asset?.url],
        },
        keywords: data.seo.seoKeywords,
      };
}

const HomePage = async () => {
    const {data} = await sanityFetch<NonNullable<HomePageQueryResult>>({query: homePageQuery})
    return (
        <>
            Home Page
        </>
    )
}

export default HomePage
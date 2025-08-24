import { getCollectionByHandle, listCollections } from "@/lib/data/collections"
import { listRegions } from "@/lib/data/regions"
import CollectionTemplate from "@/modules/collections/templates"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamicParams = true

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  // Temporarily disable static generation during development
  // to avoid build-time dependency on the backend
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | Medusa Store`,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}

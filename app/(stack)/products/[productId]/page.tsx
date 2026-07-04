import { ProductScreen } from "@/components/buyhive/screens/product-screen"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  return <ProductScreen productId={productId} />
}

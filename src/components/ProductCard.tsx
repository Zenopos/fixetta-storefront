import { Link } from "react-router"
import type { StoreProduct, BrandKey } from "@/lib/catalog"
import { formatMoney } from "@/lib/catalog"
import { BRANDS } from "@/lib/catalog"
import { useCart } from "@/store/CartContext"

export default function ProductCard({
  product,
  index,
  brand,
}: {
  product: StoreProduct
  index: number
  brand: BrandKey
}) {
  const { addItem } = useCart()
  const brandPath = BRANDS[brand].path
  return (
    <div className="group border hairline bg-[#0d0d0d] flex flex-col hover:border-gold transition-colors duration-300">
      <Link
        to={`${brandPath}/product/${product.handle}`}
        className="aspect-square flex items-center justify-center overflow-hidden relative bg-[#111]"
      >
        <img
          src={product.images[0]}
          alt={product.imageAlts[0] ?? product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 font-mono2 text-[10px] tracking-[0.25em] text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`${brandPath}/product/${product.handle}`}
            className="font-display text-2xl text-white leading-none hover:text-gold transition-colors"
          >
            {product.shortName}
          </Link>
          <span className="font-mono2 text-sm text-gold whitespace-nowrap">
            {formatMoney(product.price)}
          </span>
        </div>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed flex-1">
          {product.tagline}
        </p>
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => addItem(product.handle)}
            className="flex-1 bg-white text-black font-mono2 text-[11px] tracking-[0.25em] py-3 hover:bg-gold transition-colors"
          >
            ADD TO CART
          </button>
          <Link
            to={`${brandPath}/product/${product.handle}`}
            className="px-4 border hairline-strong font-mono2 text-[11px] text-neutral-300 flex items-center hover:border-gold hover:text-gold transition-colors"
            aria-label={`View ${product.shortName}`}
          >
            →
          </Link>
        </div>
      </div>
    </div>
  )
}
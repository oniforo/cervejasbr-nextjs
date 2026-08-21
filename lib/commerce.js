import CommerceSDK from '@chec/commerce.js'

const client = new CommerceSDK(process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY)

export default client

const EMPTY_STOREFRONT = { merchant: {}, categories: [], products: [] }

export async function getStorefrontData() {
    try {
        const [ merchant, { data: categories }, { data: products } ] = await Promise.all([
            client.merchants.about(),
            client.categories.list(),
            client.products.list()
        ])
        return { merchant, categories, products }
    } catch (err) {
        console.error('Failed to reach Chec, falling back to empty storefront data:', err.message)
        return EMPTY_STOREFRONT
    }
}
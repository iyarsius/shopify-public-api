import { ISearchParams, IShopifyOptions } from "../types/Client";
import { Product } from "./Product";

export class Shopify {
    baseUrl: string;

    constructor(options: IShopifyOptions) {
        this.baseUrl = options.baseUrl;
    };

    async search(query: string, params?: ISearchParams): Promise<Product[]> {
        const response = await fetch(`${this.baseUrl}/search/suggest.json?q=${query}`, {
            signal: params?.abortSignal
        });

        const data = await response.json() as any;

        return data.resources.results.products.map(p => new Product(this, p));
    };

    async get(handle: string): Promise<Product> {
        const response = await fetch(`${this.baseUrl}/products/${handle}.json`);

        const data = await response.json() as any;

        data.product.body = data.product.body_html;
        delete data.product.body_html;
        data.product.image = data.product.image?.src;
        delete data.product.featured_image
        data.product.price = data.product.variants[0].price;
        data.product.price_max = data.product.variants.sort((v1, v2) => Number(v2.price) - Number(v1.price))[0].price;
        data.product.price_min = data.product.variants.sort((v1, v2) => Number(v1.price) - Number(v2.price))[0].price;
        data.product.url = `${this.baseUrl}/products/${handle}`;

        const product = new Product(this, data.product);
        product["fetched"] = true;

        return product;
    }
}
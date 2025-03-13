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
}
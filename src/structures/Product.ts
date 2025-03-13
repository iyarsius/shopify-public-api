import { IFeaturedImage, IImage, IOption, IProduct } from "../types/Product";
import { Shopify } from "./Client";

export class Product implements IProduct {
    id: number;
    title: string;
    available: boolean;
    body: string;
    compare_at_price_max: string;
    compare_at_price_min: string;
    handle: string;
    image: string;
    price: string;
    price_max: string;
    price_min: string;
    tags: string[];
    type: string;
    url: string;
    variants: any[];
    vendor: string;
    featured_image: IFeaturedImage[];

    created_at?: string;
    updated_at?: string;
    published_at?: string;
    template_suffix?: string | null;
    published_scope?: string;
    options?: IOption[];
    images?: IImage[];

    protected fetched: boolean = false;

    constructor(protected client: Shopify, data: IProduct) {
        Object.assign(this, data);
    };

    async fetchDetails() {
        const response = await fetch(`${this.client.baseUrl}/products/${this.handle}.json`);
        const data = await response.json();

        // avoid conflicts with the existing data
        delete data.product.image
        delete data.product.featured_image
        delete data.product.body_html

        Object.assign(this, data.product);
    }
}
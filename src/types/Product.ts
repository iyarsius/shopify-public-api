export interface IProduct {
    available: boolean;
    body: string;
    compare_at_price_max: string;
    compare_at_price_min: string;
    handle: string;
    id: number;
    image: string;
    price: string;
    price_max: string;
    price_min: string;
    tags: string[];
    title: string;
    type: string;
    url: string;
    variants: IVariant[];
    vendor: string;
    featured_image: IFeaturedImage[];
};

export interface IFeaturedImage {
    alt: string,
    aspect_ratio: number,
    height: number,
    url: string,
    width: number
}

export interface IProductDetails {
    created_at: string;
    updated_at: string;
    published_at: string;
    template_suffix: string | null;
    published_scope: string;
    options: IOption[];
    images: IImage[];
    image: IImage
};

export interface IImage {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: string | null;
    width: number;
    height: number;
    src: string;
    variant_ids: number[];
}

export interface IVariant {
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    compare_at_price: string;
    fulfillment_service: string;
    inventory_management: string;
    option1: string | null;
    option2: string | null;
    option3: string | null;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string | null;
    grams: number;
    image_id: number | null;
    weight: number;
    weight_unit: string;
    requires_shipping: boolean;
    price_currency: string;
    compare_at_price_currency: string;
};

export interface IOption {
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: string[];
  };
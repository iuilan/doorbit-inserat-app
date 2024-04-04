export interface IInserat {
    id: number;
    steet: string;
    city: string;
    postcode: number;
    price_EUR: number;
    size_m2: number;
    baths_amount: number;
    rooms_amount: number;
    kitchens_amount: number;
    energy_efficiency: string;
    title: string;
    description: string;
    local_description: string;
    title_image: string;
    images?: string[] | null;
    created_timestamp: number;
  }
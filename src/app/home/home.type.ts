export interface Flower {
    id: number;
    name: string;
    imageUrl: string;
    type: string;
    description: string;
    scientificName: string;
    color: string;
    bloomSeason: string;
    nativeRegion: string;
    sunlightRequirement: string;
    waterRequirement: string;
    price: number;
    stockQuantity: number;
    addedDate: string; 
    updatedDate: string | null;
  };
  
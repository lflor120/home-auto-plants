export interface PlantCreate {
    plantName: string;
    plantType: string;
    interval: number | null;
    frequency: string;
    description: string;
}

export interface Plant {
    id: number;
    plantName: string;
    plantType: string;
    interval: number;
    frequency: string;
    description: string;
}
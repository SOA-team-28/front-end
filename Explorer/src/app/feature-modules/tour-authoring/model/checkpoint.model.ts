import { CheckpointSecret } from "./checkpointSecret.model";

export interface Checkpoint{
    id?: number,
    tourId: number,
    authorId: number,
    longitude: number,
    latitude: number,
    name: string,
    description: string,
    pictures: string[],
    requiredTimeInSeconds: number,
    checkpointSecret?:CheckpointSecret,
    currentPicture:number,
    currentPointPicture:number,
    showedPointPicture:string,
    visibleSecret:Boolean,
    showedPicture:string,
    viewSecretMessage:string
}
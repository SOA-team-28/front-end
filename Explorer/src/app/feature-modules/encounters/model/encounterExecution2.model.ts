import { Encounter } from "./encounter.model";

export interface EncounterExecution2 {
    id: number,
    encounterId: number,
    encounter: Encounter,
    touristId: number,
    status: string,
    startTime: Date
}
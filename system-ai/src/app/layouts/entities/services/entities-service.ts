import { Injectable } from "@angular/core";
import { CommonService } from "../../../core/services/common-service";
import { Observable } from "rxjs";

// chat.service.ts
@Injectable({
    providedIn: 'root'
})
export class EntitiesService {
    private readonly apiUrl = '/ai-entity/generate-from-excel';

    constructor(private readonly commonService: CommonService) { }

    // ==========================
    // SEND FILE - GỌI COMMON UPLOAD
    // ==========================
    sendFile(file: File): Observable<EntityGenerationResponse> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.commonService.upload<EntityGenerationResponse>(this.apiUrl, formData);
    }
}

// Response interface
export interface EntityGenerationResponse {
    status: string;
    fileName: string;
    fileSize: string;
    tableInfo: string;
    entityCode: string;
}
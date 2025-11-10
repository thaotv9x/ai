import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    // Base URL cho API
    private readonly BASE_URL = environment.apiUrl + '/api';

    private readonly username = 'user';
    private readonly password = 'f5f257f3-e9cf-4460-aa62-4ebcb9a300e3'; 

    constructor(private readonly http: HttpClient) { }

    // ==========================
    // GET (truy vấn dữ liệu)
    // ==========================
    get<T>(endpoint: string, params?: any): Observable<T> {
        const options = params ? { params: new HttpParams({ fromObject: params }) } : {};
        return this.http
            .get<T>(`${this.BASE_URL}/${endpoint}`, options);
    }

    // ==========================
    // POST (gửi dữ liệu)
    // ==========================
    post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http
            .post<T>(`${this.BASE_URL}/${endpoint}`, body, { headers });
    }

    // ==========================
    // PUT (cập nhật dữ liệu)
    // ==========================
    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http
            .put<T>(`${this.BASE_URL}/${endpoint}`, body);
    }

    // ==========================
    // DELETE (xóa dữ liệu)
    // ==========================
    delete<T>(endpoint: string, params?: any): Observable<T> {
        const options = params ? { params: new HttpParams({ fromObject: params }) } : {};
        return this.http
            .delete<T>(`${this.BASE_URL}/${endpoint}`, options);
    }

    // ==========================
    // UPLOAD FILE (FormData)
    // ==========================
    upload<T>(url: string, formData: FormData): Observable<T> {
        const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
        });
        return this.http.post<T>(this.BASE_URL + url, formData, { headers });
    }

    // ==========================
    // UPLOAD FILE PROCESS (FormData)
    // ==========================
    uploadProcess<T>(url: string, formData: FormData): Observable<HttpEvent<T>> {
        return this.http.post<T>(url, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }

    // ==========================
    // NEW: DOWNLOAD ENTITY FILE
    // ==========================
    downloadEntityFile(entityCode: string, fileName: string): void {
        try {
            const blob = new Blob([entityCode], {
                type: 'text/x-java-source; charset=utf-8'
            });

            const url = globalThis.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.sanitizeFileName(fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();

            // Clean up URL sau 1 phút để tránh memory leak
            setTimeout(() => {
                if (url) {
                    globalThis.URL.revokeObjectURL(url);
                }
            }, 60000);
        } catch (error) {
            console.error('Download failed:', error);
            throw error;
        }
    }

    // ==========================
    // NEW: COPY TO CLIPBOARD
    // ==========================
    async copyToClipboard(text: string): Promise<boolean> {
        // ✅ Check browser environment
        if (globalThis.navigator === undefined || globalThis.document === undefined) {
            console.warn('Clipboard API not available');
            return false; // ✅ Return false khi không available
        }

        try {
            // Thử dùng Clipboard API hiện đại trước
            if (globalThis.navigator.clipboard?.writeText) {
                await globalThis.navigator.clipboard.writeText(text);
                return true; // ✅ Thành công với Clipboard API
            }

            // Fallback: dùng method cũ
            return this.fallbackCopyToClipboard(text);

        } catch (error) {
            console.error('Modern clipboard API failed, trying fallback:', error);
            // Thử fallback method
            return this.fallbackCopyToClipboard(text);
        }
    }

    private fallbackCopyToClipboard(text: string): boolean {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';

            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices

            const successful = document.execCommand('copy');
            textArea.remove(); // ✅ Sử dụng remove() thay vì removeChild()

            return successful; // ✅ Return kết quả thực tế từ execCommand

        } catch (error) {
            console.error('Fallback copy method also failed:', error);
            return false; // ✅ Return false khi cả 2 method đều fail
        }
    }

    // ==========================
    // NEW: SANITIZE FILENAME
    // ==========================
    private sanitizeFileName(name: string): string {
        // Đảm bảo filename có extension .java
        if (!name.endsWith('.java')) {
            name += '.java';
        }

        // Remove invalid characters
        return name.replaceAll(/[^a-zA-Z0-9_.-]/g, '_');
    }

}

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * Cấu hình cơ bản cho Axios
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_OVIRO_BASE_URL || '',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor cho Request: Tự động đính kèm Token và Tenant ID
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 1. Đính kèm SiteTenantId từ environment variable
        const tenantId = process.env.NEXT_PUBLIC_OVIRO_TENANT_ID;
        if (tenantId) {
            config.headers['SiteTenantId'] = tenantId;
        }

        // 2. Đính kèm Token (Lấy từ localStorage nếu đang ở Client Side)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                // SiteAuthorization: Token khách hàng để áp dụng chính sách giá riêng
                config.headers['SiteAuthorization'] = token;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor cho Response: Xử lý lỗi tập trung và trả về data trực tiếp
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Trả về dữ liệu từ response
        return response.data;
    },
    (error: AxiosError) => {
        // Xử lý lỗi tập trung
        if (error.response) {
            const { status, data }: { status: number; data: any } = error.response;
            const message = data?.message || error.message;

            console.error(`[API Error] Status: ${status} - Message: ${message}`);

            // Xử lý các mã lỗi phổ biến
            switch (status) {
                case 401:
                    // Token hết hạn hoặc không hợp lệ
                    console.warn('Unauthorized! Redirecting to login...');
                    if (typeof window !== 'undefined') {
                        // localStorage.removeItem('token');
                        // window.location.href = '/login';
                    }
                    break;
                case 403:
                    console.error('Forbidden! You don\'t have permission.');
                    break;
                case 404:
                    console.error('Resource not found!');
                    break;
                case 500:
                    console.error('Internal Server Error!');
                    break;
            }
        } else if (error.request) {
            // Không nhận được phản hồi từ server
            console.error('[API Error] No response received from server.');
        } else {
            // Lỗi khi thiết lập request
            console.error('[API Error]', error.message);
        }

        return Promise.reject(error);
    }
);

/**
 * API Service Wrapper với Generic Types
 * Đảm bảo các method trả về đúng kiểu dữ liệu T nhờ interceptor đã bóc tách response.data
 */
export const http = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.get(url, config) as unknown as Promise<T>,

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.post(url, data, config) as unknown as Promise<T>,

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.put(url, data, config) as unknown as Promise<T>,

    del: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.delete(url, config) as unknown as Promise<T>,

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.patch(url, data, config) as unknown as Promise<T>,
};

export default apiClient;

import type { SortOrder } from "mongoose";
type IOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};
type IReturn = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: SortOrder;
};
export declare const paginationHelper: {
    calculatePagination: (options: IOptions) => IReturn;
};
export {};
//# sourceMappingURL=paginationHelper.d.ts.map
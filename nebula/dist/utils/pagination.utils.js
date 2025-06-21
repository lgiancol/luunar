"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPaginatedEntities = mapPaginatedEntities;
function mapPaginatedEntities(mapper) {
    return (dto) => {
        return {
            data: dto.data.map(mapper),
            meta: {
                page: dto.meta.page,
                pageSize: dto.meta.pageSize,
                total: dto.meta.total,
                totalPages: dto.meta.totalPages,
            },
        };
    };
}

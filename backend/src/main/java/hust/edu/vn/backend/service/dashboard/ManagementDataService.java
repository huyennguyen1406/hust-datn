package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.admin.request.BrandCreateRequest;
import hust.edu.vn.backend.dto.admin.request.BrandUpdateRequest;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.dto.admin.response.BrandResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.BrandRepository;
import hust.edu.vn.backend.repository.specification.BrandSpecification;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@SuppressWarnings("DuplicatedCode")
@Service
@RequiredArgsConstructor
public class ManagementDataService {
    private final BrandRepository brandRepository;
    private final BrandSpecification brandSpecification;
    private final ImageUploadService imageUploadService;

    private List<FilterRequest> buildFilters(List<String> fields, List<String> operations, List<String> values) {
        List<FilterRequest> filters = new ArrayList<>();

        if (fields != null && operations != null && values != null) {
            if (fields.size() != operations.size() || fields.size() != values.size()) {
                throw ApiStatusException.badRequest("Filter parameters size mismatch", "ERR_FILTER_SIZE_MISMATCH");
            }

            for (int i = 0; i < fields.size(); i++) {
                filters.add(new FilterRequest()
                        .setField(fields.get(i))
                        .setOperation(operations.get(i))
                        .setValue(values.get(i))
                );
            }
        }

        return filters;
    }


    public PaginationResponse<BrandResponse> getAllBrands(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<Brand> specification = filters.isEmpty() ? null : brandSpecification.buildSpecification(filters, combination);

        Page<Brand> brandPage = specification == null ?
                brandRepository.findAll(pageable) :
                brandRepository.findAll(specification, pageable);


        // 5️⃣ Map entity → response DTO
        List<BrandResponse> data = brandPage
                .getContent()
                .stream()
                .map(BrandResponse::fromEntity)
                .toList();


        // 6️⃣ Build pagination response
        return new PaginationResponse<BrandResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());

    }

    public BrandResponse createBrand(@Valid BrandCreateRequest request, MultipartFile logo) {
        if (brandRepository.existsByBrandNameIgnoreCase(request.getBrandName())) {
            throw ApiStatusException.conflict("Brand name already exists", "ERR_BRAND_NAME_EXISTS");
        }

        Brand brand = new Brand();
        brand.setBrandName(request.getBrandName());
        brand.setDescription(request.getDescription());

        if (!logo.isEmpty()){
            String imageUrl = imageUploadService.upload(logo);
            brand.setBrandLogo(imageUrl);
        }

        Brand saved = brandRepository.save(brand);
        return BrandResponse.fromEntity(saved);
    }

    public BrandResponse updateBrand(String id, @Valid BrandUpdateRequest request, MultipartFile logo) {
        UUID brandId = UUID.fromString(id);
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND));

        brand.setBrandName(request.getBrandName());
        brand.setDescription(request.getDescription());

        if (!logo.isEmpty()){
            String imageUrl = imageUploadService.upload(logo);
            brand.setBrandLogo(imageUrl);
        }


        Brand updated = brandRepository.save(brand);
        return BrandResponse.fromEntity(updated);
    }

    public void deleteBrand(String id) {
        UUID brandId = UUID.fromString(id);
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND));

        brandRepository.delete(brand);
    }

    public BrandResponse getBrandById(String id) {
        UUID brandId = UUID.fromString(id);
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND));
        return BrandResponse.fromEntity(brand);
    }
}

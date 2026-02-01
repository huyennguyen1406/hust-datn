package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.admin.request.BrandCreateRequest;
import hust.edu.vn.backend.dto.admin.request.BrandUpdateRequest;
import hust.edu.vn.backend.dto.admin.request.CategoryBannerRequest;
import hust.edu.vn.backend.dto.admin.request.CategoryCreateRequest;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.dto.admin.request.VoucherCreateRequest;
import hust.edu.vn.backend.dto.admin.response.BrandMinimizedResponse;
import hust.edu.vn.backend.dto.admin.response.BrandResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryBannerResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryDetailResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryMinimizedResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryResponse;
import hust.edu.vn.backend.dto.admin.response.VoucherResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.entity.Category;
import hust.edu.vn.backend.entity.CategoryBanner;
import hust.edu.vn.backend.entity.Voucher;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.BrandRepository;
import hust.edu.vn.backend.repository.CategoryRepository;
import hust.edu.vn.backend.repository.VoucherRepository;
import hust.edu.vn.backend.repository.specification.BrandSpecification;
import hust.edu.vn.backend.repository.specification.CategorySpecification;
import hust.edu.vn.backend.repository.specification.VoucherSpecification;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@SuppressWarnings("DuplicatedCode")
@Service
@RequiredArgsConstructor
public class ManagementDataService {
    private final BrandRepository brandRepository;
    private final BrandSpecification brandSpecification;
    private final ImageUploadService imageUploadService;

    private final CategoryRepository categoryRepository;
    private final CategorySpecification categorySpecification;

    private final VoucherRepository voucherRepository;
    private final VoucherSpecification voucherSpecification;

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

    public PaginationResponse<CategoryResponse> getAllCategory(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<Category> specification = filters.isEmpty() ? null : categorySpecification.buildSpecification(filters, combination);

        Page<Category> brandPage = specification == null ?
                categoryRepository.findAll(pageable) :
                categoryRepository.findAll(specification, pageable);


        // 5️⃣ Map entity → response DTO
        List<CategoryResponse> data = brandPage
                .getContent()
                .stream()
                .map(CategoryResponse::fromEntity)
                .toList();


        // 6️⃣ Build pagination response
        return new PaginationResponse<CategoryResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());

    }

    public CategoryDetailResponse getCategoryById(String id) {
        UUID brandId = UUID.fromString(id);
        Category category = categoryRepository.findCategoryByIdWithBanners(brandId)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND));

        List<CategoryBannerResponse> banners =
                category.getBanners().stream()
                        .map(b -> {
                            CategoryBannerResponse bannerResponse = new CategoryBannerResponse();
                            BeanUtils.copyProperties(b, bannerResponse);
                            bannerResponse.setId(b.getId().toString());
                            return bannerResponse;
                        })
                        .toList();

        return new CategoryDetailResponse()
                .setId(category.getId().toString())
                .setNameEn(category.getNameEn())
                .setNameVi(category.getNameVi())
                .setKeyword(category.getKeyword())
                .setModifiedAt(category.getModifiedAt())
                .setBanners(banners);

    }

    @Transactional
    public CategoryDetailResponse createCategory(CategoryCreateRequest request, List<MultipartFile> bannerImages) {
        Category category = new Category();
        category.setNameEn(request.getNameEn());
        category.setNameVi(request.getNameVi());
        category.setCreatedAt(Instant.now());

        Set<CategoryBanner> banners = new HashSet<>();

        for (CategoryBannerRequest br : request.getBanners()) {
            CategoryBanner banner = new CategoryBanner();
            banner.setTitleEn(br.getTitleEn());
            banner.setTitleVi(br.getTitleVi());
            banner.setDescriptionEn(br.getDescriptionEn());
            banner.setDescriptionVi(br.getDescriptionVi());
            banner.setCreatedAt(Instant.now());
            banner.setCategory(category);

            // Map image
            if (bannerImages != null && br.getImageIndex() != null) {
                MultipartFile image = bannerImages.get(br.getImageIndex());
                String imageUrl = imageUploadService.upload(image);
                banner.setImageLink(imageUrl);
            }

            banners.add(banner);
        }

        category.setBanners(banners);
        Category savedCategory = categoryRepository.save(category);

        List<CategoryBannerResponse> savedBanners =
                savedCategory.getBanners().stream()
                        .map(b -> {
                            CategoryBannerResponse bannerResponse = new CategoryBannerResponse();
                            BeanUtils.copyProperties(b, bannerResponse);
                            bannerResponse.setId(b.getId().toString());
                            return bannerResponse;
                        })
                        .toList();

        return new CategoryDetailResponse()
                .setId(savedCategory.getId().toString())
                .setNameEn(savedCategory.getNameEn())
                .setNameVi(savedCategory.getNameVi())
                .setModifiedAt(savedCategory.getModifiedAt())
                .setBanners(savedBanners);

    }

    @Transactional
    public CategoryDetailResponse updateCategory(String id, CategoryCreateRequest request, List<MultipartFile> bannerImages) {
        UUID brandId = UUID.fromString(id);
        Category category = categoryRepository.findCategoryByIdWithBanners(brandId)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND));

        category.setNameEn(request.getNameEn());
        category.setNameVi(request.getNameVi());
        category.setKeyword(request.getKeyword());
        category.setModifiedAt(Instant.now());

        Map<String, CategoryBanner> existingBannerMap =
                category.getBanners().stream()
                        .collect(Collectors.toMap(
                                b -> b.getId().toString(),
                                Function.identity()
                        ));

        Set<CategoryBanner> updatedBanners = new HashSet<>();

        for (CategoryBannerRequest br : request.getBanners()) {
            CategoryBanner banner;

            if (br.getId() != null) {
                banner = existingBannerMap.get(br.getId());
                if (banner == null) {
                    throw ApiStatusException.badRequest(
                            "Banner not found: " + br.getId(),
                            "BANNER_NOT_FOUND"
                    );
                }
            } else {
                banner = new CategoryBanner();
                banner.setCreatedAt(Instant.now());
                banner.setCategory(category);
            }

            banner.setTitleEn(br.getTitleEn());
            banner.setTitleVi(br.getTitleVi());
            banner.setDescriptionEn(br.getDescriptionEn());
            banner.setDescriptionVi(br.getDescriptionVi());

            if (br.getImageIndex() != null && bannerImages != null) {
                MultipartFile image = bannerImages.get(br.getImageIndex());
                String imageUrl = imageUploadService.upload(image);
                banner.setImageLink(imageUrl);
            }

            updatedBanners.add(banner);
        }

        category.getBanners().clear();
        category.getBanners().addAll(updatedBanners);

        Category savedCategory = categoryRepository.save(category);

        List<CategoryBannerResponse> savedBanners =
                savedCategory.getBanners().stream()
                        .map(b -> {
                            CategoryBannerResponse bannerResponse = new CategoryBannerResponse();
                            BeanUtils.copyProperties(b, bannerResponse);
                            bannerResponse.setId(b.getId().toString());
                            return bannerResponse;
                        })
                        .toList();

        return new CategoryDetailResponse()
                .setId(savedCategory.getId().toString())
                .setNameEn(savedCategory.getNameEn())
                .setNameVi(savedCategory.getNameVi())
                .setModifiedAt(savedCategory.getModifiedAt())
                .setBanners(savedBanners);
    }

    @Transactional
    public void deleteCategory(String id) {
        UUID categoryId = UUID.fromString(id);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> ApiStatusException.notFound(
                        ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND,
                        ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND
                ));

        categoryRepository.delete(category);

    }

    public List<BrandMinimizedResponse> getAllBrandsMinimized() {
        List<Brand> brands = brandRepository.findAll();

        return brands.stream()
                .map(b -> new BrandMinimizedResponse()
                        .setId(b.getId().toString())
                        .setBrandName(b.getBrandName())
                )
                .toList();
    }

    public List<CategoryMinimizedResponse> getAllCategoriesMinimized() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(c -> new CategoryMinimizedResponse()
                        .setId(c.getId().toString())
                        .setNameEn(c.getNameEn())
                        .setNameVi(c.getNameVi())
                )
                .toList();
    }

    public PaginationResponse<VoucherResponse> getAllVouchers(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<Voucher> specification = filters.isEmpty() ? null : voucherSpecification.buildSpecification(filters, combination);

        Page<Voucher> brandPage = specification == null ?
                voucherRepository.findAll(pageable) :
                voucherRepository.findAll(specification, pageable);


        // 5️⃣ Map entity → response DTO
        List<VoucherResponse> data = brandPage
                .getContent()
                .stream()
                .map(VoucherResponse::fromEntity)
                .toList();


        // 6️⃣ Build pagination response
        return new PaginationResponse<VoucherResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());

    }

    public VoucherResponse getVoucherById(String id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_VOUCHER_NOT_FOUND, ErrorConstant.ERROR_CODE_VOUCHER_NOT_FOUND));
        return VoucherResponse.fromEntity(voucher);
    }

    public VoucherResponse createOrUpdateVoucher(VoucherCreateRequest request) {
        Voucher voucher = voucherRepository
                .findById(request.getCode())
                .orElseGet(Voucher::new);

        voucher.setCode(request.getCode());
        voucher.setStartTime(request.getStartTime());
        voucher.setEndTime(request.getEndTime());
        voucher.setDiscountAmount(request.getDiscountAmount());
        voucher.setVoucherAmount(request.getVoucherAmount());

        Voucher saved = voucherRepository.save(voucher);
        return VoucherResponse.fromEntity(saved);
    }

    public void deleteVoucher(String id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_VOUCHER_NOT_FOUND, ErrorConstant.ERROR_CODE_VOUCHER_NOT_FOUND));

        voucherRepository.delete(voucher);
    }
}

package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.dto.admin.request.ProductCreateRequest;
import hust.edu.vn.backend.dto.admin.request.ProductInfoDetailUpdateRequest;
import hust.edu.vn.backend.dto.admin.request.ProductUpdateRequest;
import hust.edu.vn.backend.dto.admin.response.ProductColorResponse;
import hust.edu.vn.backend.dto.admin.response.ProductDetailResponse;
import hust.edu.vn.backend.dto.admin.response.ProductInfoDetailResponse;
import hust.edu.vn.backend.dto.admin.response.ProductResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.entity.Category;
import hust.edu.vn.backend.entity.Product;
import hust.edu.vn.backend.entity.ProductColor;
import hust.edu.vn.backend.entity.ProductDetail;
import hust.edu.vn.backend.entity.ProductImage;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.BrandRepository;
import hust.edu.vn.backend.repository.CategoryRepository;
import hust.edu.vn.backend.repository.ProductColorRepository;
import hust.edu.vn.backend.repository.ProductDetailRepository;
import hust.edu.vn.backend.repository.ProductRepository;
import hust.edu.vn.backend.repository.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@SuppressWarnings("DuplicatedCode")
@Service
@RequiredArgsConstructor
public class ManagementProductService {
    private final ImageUploadService imageUploadService;
    private final ProductSpecification productSpecification;
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductColorRepository productColorRepository;
    private final ProductDetailRepository productDetailRepository;

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


    public PaginationResponse<ProductResponse> getAllProducts(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<Product> specification = filters.isEmpty() ? null : productSpecification.buildSpecification(filters, combination);

        Page<Product> brandPage = specification == null ?
                productRepository.findAll(pageable) :
                productRepository.findAll(specification, pageable);

        List<ProductResponse> data = brandPage
                .getContent()
                .stream()
                .map(ProductResponse::fromEntity)
                .toList();

        return new PaginationResponse<ProductResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());
    }

    public ProductDetailResponse getProductById(String id) {
        UUID productId = UUID.fromString(id);
        Product product = productRepository.findByIdWithAllRelations(productId).orElseThrow(() ->
                ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_PRODUCT_NOT_FOUND, ErrorConstant.ERROR_CODE_PRODUCT_NOT_FOUND)
        );

        ProductDetailResponse.BrandDto brandDto = new ProductDetailResponse.BrandDto()
                .setBrandId(product.getBrand().getId().toString())
                .setBrandName(product.getBrand().getBrandName());

        List<ProductDetailResponse.CategoryDto> categoryList = product.getCategories().stream()
                .map(category -> new  ProductDetailResponse.CategoryDto()
                        .setCategoryId(category.getId().toString())
                        .setCategoryNameEn(category.getNameEn())
                        .setCategoryNameVi(category.getNameVi())).toList();

        List<ProductDetailResponse.ProductImageDto> imageList = product.getImages().stream()
                .map(image -> new ProductDetailResponse.ProductImageDto()
                        .setImageId(image.getId().toString())
                        .setImageUrl(image.getImageLink())).toList();

        ProductDetailResponse response = new ProductDetailResponse();
        response.setId(id)
                .setProductNameEn(product.getNameEn())
                .setProductNameVi(product.getNameVi())
                .setModifiedAt(product.getModifiedAt())
                .setPrice(product.getPrice())
                .setBrand(brandDto)
                .setCategoryList(categoryList)
                .setImageList(imageList);
        return response;
    }

    public ProductDetailResponse createProduct(ProductCreateRequest request, List<MultipartFile> productImages) {
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() ->
                ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND)
        );

        List<UUID> categoryIds = request.getCategoryList().stream()
                .map(UUID::fromString)
                .toList();
        Set<Category> categoryList = new HashSet<>(categoryRepository.findAllById(categoryIds));

        List<ProductImage> imageList = new ArrayList<>(productImages.size());

        for (MultipartFile image : productImages) {
            String imageLink = imageUploadService.upload(image);
            ProductImage productImage = new ProductImage().setImageLink(imageLink);
            imageList.add(productImage);
        }

        Product product = new Product()
                .setNameEn(request.getNameEn())
                .setNameVi(request.getNameVi())
                .setPrice(request.getPrice())
                .setBrand(brand)
                .setCategories(categoryList)
                .setImages(imageList);

        productRepository.save(product);

        ProductDetailResponse.BrandDto brandDto = new ProductDetailResponse.BrandDto()
                .setBrandId(product.getBrand().getId().toString())
                .setBrandName(product.getBrand().getBrandName());

        List<ProductDetailResponse.CategoryDto> savedCategoryList = product.getCategories().stream()
                .map(category -> new  ProductDetailResponse.CategoryDto()
                        .setCategoryId(product.getId().toString())
                        .setCategoryNameEn(product.getNameEn())
                        .setCategoryNameVi(product.getNameVi())).toList();

        List<ProductDetailResponse.ProductImageDto> savedImageList = product.getImages().stream()
                .map(image -> new ProductDetailResponse.ProductImageDto()
                        .setImageId(image.getId().toString())
                        .setImageUrl(image.getImageLink())).toList();

        ProductDetailResponse response = new ProductDetailResponse();
        response.setProductNameEn(product.getNameEn())
                .setProductNameVi(product.getNameVi())
                .setModifiedAt(product.getModifiedAt())
                .setPrice(product.getPrice())
                .setBrand(brandDto)
                .setCategoryList(savedCategoryList)
                .setImageList(savedImageList);
        return response;
    }

    public ProductDetailResponse updateProduct(String id, ProductUpdateRequest request, List<MultipartFile> productImages) {
        Product existedProduct = productRepository.findById(UUID.fromString(id))
                .orElseThrow(() ->
                        ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_PRODUCT_NOT_FOUND, ErrorConstant.ERROR_CODE_PRODUCT_NOT_FOUND)
                );

        existedProduct.setNameEn(request.getNameEn());
        existedProduct.setNameVi(request.getNameVi());
        existedProduct.setPrice(request.getPrice());

        if (!existedProduct.getBrand().getId().equals(request.getBrandId())) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() ->
                            ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_BRAND_NOT_FOUND, ErrorConstant.ERROR_CODE_BRAND_NOT_FOUND)
                    );
            existedProduct.setBrand(brand);
        }

        if (CollectionUtils.isEmpty(request.getCategoryList())){
            existedProduct.getCategories().clear();
        } else {
            List<UUID> categoryIds = request.getCategoryList().stream()
                    .map(UUID::fromString)
                    .toList();
            Set<Category> categories =
                    new HashSet<>(categoryRepository.findAllById(categoryIds));
            existedProduct.getCategories().clear();
            existedProduct.getCategories().addAll(categories);
        }

        if (CollectionUtils.isEmpty(request.getImageList())){
            existedProduct.getImages().clear();
        } else {
            Set<UUID> imageIds = request.getImageList().stream()
                    .map(UUID::fromString)
                    .collect(Collectors.toSet());
            // Remove images whose IDs are not in imageList
            existedProduct.getImages().removeIf(
                    image -> !imageIds.contains(image.getId())
            );
        }

        if (!CollectionUtils.isEmpty(productImages)) {
            for (MultipartFile image : productImages) {
                String imageLink = imageUploadService.upload(image);
                ProductImage productImage = new ProductImage()
                        .setImageLink(imageLink);
                existedProduct.getImages().add(productImage);
            }
        }

        productRepository.save(existedProduct);

        ProductDetailResponse.BrandDto brandDto =
                new ProductDetailResponse.BrandDto()
                        .setBrandId(existedProduct.getBrand().getId().toString())
                        .setBrandName(existedProduct.getBrand().getBrandName());

        List<ProductDetailResponse.CategoryDto> categoryDtos =
                existedProduct.getCategories().stream()
                        .map(category -> new ProductDetailResponse.CategoryDto()
                                .setCategoryId(category.getId().toString())
                                .setCategoryNameEn(category.getNameEn())
                                .setCategoryNameVi(category.getNameVi()))
                        .toList();

        List<ProductDetailResponse.ProductImageDto> imageDtos =
                existedProduct.getImages().stream()
                        .map(image -> new ProductDetailResponse.ProductImageDto()
                                .setImageId(image.getId().toString())
                                .setImageUrl(image.getImageLink()))
                        .toList();

        return new ProductDetailResponse()
                .setProductNameEn(existedProduct.getNameEn())
                .setProductNameVi(existedProduct.getNameVi())
                .setModifiedAt(existedProduct.getModifiedAt())
                .setPrice(existedProduct.getPrice())
                .setBrand(brandDto)
                .setCategoryList(categoryDtos)
                .setImageList(imageDtos);

    }

    @Transactional
    public void deleteProduct(String id) {
        UUID productId = UUID.fromString(id);
        Product existedProduct = productRepository.findById(productId)
                .orElseThrow(() ->
                        ApiStatusException.notFound(ErrorConstant.ERROR_MESSAGE_PRODUCT_NOT_FOUND, ErrorConstant.ERROR_CODE_PRODUCT_NOT_FOUND)
                );

        productDetailRepository.deleteByProductId(productId);

        productRepository.delete(existedProduct);
    }

    public List<ProductColorResponse> getAllProductColors() {
        return productColorRepository.findAll().stream().map(entity -> new ProductColorResponse()
                .setColorId(entity.getId().toString())
                .setHexCode(entity.getHexCode())
        ).toList();
    }

    public List<ProductInfoDetailResponse> getProductInfoDetails(String id) {
        List<ProductDetail> productDetailList = productDetailRepository.findByProductIdWithColor(UUID.fromString(id));
        return productDetailList.stream().map(entity -> new ProductInfoDetailResponse()
                .setProductDetailId(entity.getId().toString())
                .setSize(entity.getSize())
                .setColorId(entity.getColor().getId().toString())
                .setColorCode(entity.getColor().getHexCode())
                .setQuantity(entity.getQuantity())
        ).toList();
    }

    @Transactional
    public List<ProductInfoDetailResponse> updateProductInfoDetail(String id, ProductInfoDetailUpdateRequest request) {
        UUID productId = UUID.fromString(id);

        Product product = productRepository.findById(productId).orElseThrow(() ->
                ApiStatusException.notFound(
                            ErrorConstant.ERROR_MESSAGE_PRODUCT_NOT_FOUND,
                            ErrorConstant.ERROR_CODE_PRODUCT_NOT_FOUND)
        );


        List<ProductDetail> existingList =
                productDetailRepository.findByProductIdWithColor(productId);

        List<ProductColor> allColors = productColorRepository.findAll();
        Map<UUID, ProductColor> colorMap = allColors.stream()
                .collect(Collectors.toMap(ProductColor::getId, Function.identity()));

        // Map existing by ID
        Map<UUID, ProductDetail> existingMap = existingList.stream()
                .collect(Collectors.toMap(ProductDetail::getId, Function.identity()));

        List<ProductDetail> toSave = new ArrayList<>();
        Set<UUID> incomingIds = new HashSet<>();

        for (ProductInfoDetailUpdateRequest.Dto dto : request.getDataList()) {
            ProductDetail detail;

            // UPDATE
            if (dto.getProductDetailId() != null) {
                UUID detailId = UUID.fromString(dto.getProductDetailId());
                incomingIds.add(detailId);

                detail = existingMap.get(detailId);
                if (detail == null) {
                    throw ApiStatusException.badRequest("Product detail not found", "ERR_PRODUCT_DETAIL_NOT_FOUND");
                }
            }
            // INSERT
            else {
                detail = new ProductDetail();
                detail.setProduct(product);
                ProductColor color = colorMap.get(UUID.fromString(dto.getColorId()));
                if (Objects.isNull(color)){
                    throw ApiStatusException.badRequest("Product color not found", "ERR_COLOR_NOT_FOUND");
                }
                detail.setColor(color);
            }

            detail.setSize(dto.getSize());
            detail.setQuantity(dto.getQuantity());

            toSave.add(detail);
        }

        // DELETE removed rows
        List<ProductDetail> toDelete = existingList.stream()
                .filter(d -> !incomingIds.contains(d.getId()))
                .toList();

        productDetailRepository.deleteAll(toDelete);
        productDetailRepository.saveAll(toSave);

        return toSave.stream().map(entity -> new ProductInfoDetailResponse()
                .setProductDetailId(entity.getId().toString())
                .setSize(entity.getSize())
                .setColorId(entity.getColor().getId().toString())
                .setColorCode(entity.getColor().getHexCode())
                .setQuantity(entity.getQuantity())
        ).toList();

    }
}

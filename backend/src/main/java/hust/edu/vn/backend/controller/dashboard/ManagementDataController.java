package hust.edu.vn.backend.controller.dashboard;

import hust.edu.vn.backend.dto.admin.request.BrandCreateRequest;
import hust.edu.vn.backend.dto.admin.request.BrandUpdateRequest;
import hust.edu.vn.backend.dto.admin.request.CategoryCreateRequest;
import hust.edu.vn.backend.dto.admin.request.ProductCreateRequest;
import hust.edu.vn.backend.dto.admin.request.ProductInfoDetailUpdateRequest;
import hust.edu.vn.backend.dto.admin.request.ProductUpdateRequest;
import hust.edu.vn.backend.dto.admin.response.BrandMinimizedResponse;
import hust.edu.vn.backend.dto.admin.response.BrandResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryDetailResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryMinimizedResponse;
import hust.edu.vn.backend.dto.admin.response.CategoryResponse;
import hust.edu.vn.backend.dto.admin.response.ProductColorResponse;
import hust.edu.vn.backend.dto.admin.response.ProductDetailResponse;
import hust.edu.vn.backend.dto.admin.response.ProductInfoDetailResponse;
import hust.edu.vn.backend.dto.admin.response.ProductResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.service.dashboard.ManagementDataService;
import hust.edu.vn.backend.service.dashboard.ManagementProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard/management-data")
@RequiredArgsConstructor
public class ManagementDataController {
    private final ManagementDataService managementDataService;
    private final ManagementProductService managementProductService;

    @GetMapping("/brands")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<PaginationResponse<BrandResponse>> getAllBrands(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "fields", required = false) List<String> fields,
            @RequestParam(value = "operations", required = false) List<String> operations,
            @RequestParam(value = "values", required = false) List<String> values,
            @RequestParam(value = "combination", defaultValue = "AND") String combination
    ) {
        PaginationResponse<BrandResponse> response = managementDataService.getAllBrands(page, pageSize, fields, operations, values, combination);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/brands/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<BrandResponse> getBrandById(
            @PathVariable String id) {
        BrandResponse response = managementDataService.getBrandById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/brands", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<BrandResponse> createBrand(
            @RequestPart(value = "brandName") String brandName,
            @RequestPart(value = "description", required = false) String description,
            @RequestPart(value = "logo", required = false) MultipartFile logo
    ) {
        BrandCreateRequest request = new BrandCreateRequest()
                .setBrandName(brandName)
                .setDescription(description);

        BrandResponse response = managementDataService.createBrand(request, logo);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping(
            path = "/brands/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<BrandResponse> updateBrand(
            @PathVariable String id,
            @RequestPart(value = "brandName") String brandName,
            @RequestPart(value = "description", required = false) String description,
            @RequestPart(value = "logo", required = false) MultipartFile logo
    ) {
        BrandUpdateRequest request = new BrandUpdateRequest()
                .setBrandName(brandName)
                .setDescription(description);
        BrandResponse response = managementDataService.updateBrand(id, request, logo);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/brands/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBrand(@PathVariable String id) {
        managementDataService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/brands-minimized")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<List<BrandMinimizedResponse>> getAllBrandsMinimized() {
        List<BrandMinimizedResponse> response = managementDataService.getAllBrandsMinimized();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<PaginationResponse<CategoryResponse>> getAllCategories(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "fields", required = false) List<String> fields,
            @RequestParam(value = "operations", required = false) List<String> operations,
            @RequestParam(value = "values", required = false) List<String> values,
            @RequestParam(value = "combination", defaultValue = "AND") String combination
    ) {
        PaginationResponse<CategoryResponse> response = managementDataService.getAllCategory(page, pageSize, fields, operations, values, combination);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<CategoryDetailResponse> getCategoryById(
            @PathVariable String id) {
        CategoryDetailResponse response = managementDataService.getCategoryById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/categories", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<CategoryDetailResponse> createCategory(
            @RequestPart("category") CategoryCreateRequest request,
            @RequestPart(value = "bannerImages", required = false) List<MultipartFile> bannerImages
    ) {
        CategoryDetailResponse response = managementDataService.createCategory(request, bannerImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping(
            path = "/categories/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<CategoryDetailResponse> updateCategory(
            @PathVariable String id,
            @RequestPart("category") CategoryCreateRequest request,
            @RequestPart(value = "bannerImages", required = false) List<MultipartFile> bannerImages
    ) {
        CategoryDetailResponse response = managementDataService.updateCategory(id, request, bannerImages);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        managementDataService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/categories-minimized")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<List<CategoryMinimizedResponse>> getAllCategoriesMinimized() {
        List<CategoryMinimizedResponse> response = managementDataService.getAllCategoriesMinimized();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<PaginationResponse<ProductResponse>> getAllProducts(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "fields", required = false) List<String> fields,
            @RequestParam(value = "operations", required = false) List<String> operations,
            @RequestParam(value = "values", required = false) List<String> values,
            @RequestParam(value = "combination", defaultValue = "AND") String combination
    ) {
        PaginationResponse<ProductResponse> response = managementProductService.getAllProducts(page, pageSize, fields, operations, values, combination);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable String id) {
        ProductDetailResponse response = managementProductService.getProductById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<ProductDetailResponse> createProduct(
            @RequestPart("product") ProductCreateRequest request,
            @RequestPart(value = "productImages", required = false) List<MultipartFile> productImages
    ) {

        ProductDetailResponse response = managementProductService.createProduct(request, productImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping(
            path = "/products/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<ProductDetailResponse> updateProduct(
            @PathVariable String id,
            @RequestPart("product") ProductUpdateRequest product,
            @RequestPart(value = "productImages", required = false) List<MultipartFile> productImages
    ) {
        ProductDetailResponse response = managementProductService.updateProduct(id, product, productImages);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        managementProductService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products-color")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<List<ProductColorResponse>> getAllProductColors() {
        List<ProductColorResponse> response = managementProductService.getAllProductColors();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/{id}/details")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<List<ProductInfoDetailResponse>> getProductInfoDetails(@PathVariable String id) {
        List<ProductInfoDetailResponse> response = managementProductService.getProductInfoDetails(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/products/{id}/details")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<List<ProductInfoDetailResponse>> updateProductInfoDetail(
            @PathVariable String id,
            @RequestBody ProductInfoDetailUpdateRequest request) {
        List<ProductInfoDetailResponse> response = managementProductService.updateProductInfoDetail(id, request);
        return ResponseEntity.ok(response);
    }
}

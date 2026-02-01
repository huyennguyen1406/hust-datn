package hust.edu.vn.backend.controller.store;

import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.dto.store.response.StoreBannerResponse;
import hust.edu.vn.backend.dto.store.response.StoreBrandResponse;
import hust.edu.vn.backend.dto.store.response.StoreCategoryResponse;
import hust.edu.vn.backend.dto.store.response.StoreColorResponse;
import hust.edu.vn.backend.dto.store.response.StoreProductDetailResponse;
import hust.edu.vn.backend.dto.store.response.StoreSearchProductResponse;
import hust.edu.vn.backend.service.store.StoreProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/store/products")
public class StoreProductController {
    private final StoreProductService storeProductService;

    @GetMapping("/brands")
    public ResponseEntity<List<StoreBrandResponse>> getBrands() {
        List<StoreBrandResponse> response = storeProductService.getBrands();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<StoreCategoryResponse>> getCategories() {
        List<StoreCategoryResponse> response = storeProductService.getCategories();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/colors")
    public ResponseEntity<List<StoreColorResponse>> getColors() {
        List<StoreColorResponse> response = storeProductService.getColors();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/banners")
    public ResponseEntity<List<StoreBannerResponse>> getBanners(
            @RequestParam(name = "categoryKeyword") String categoryKeyword
    ) {
        List<StoreBannerResponse> response = storeProductService.getBanners(categoryKeyword);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<PaginationResponse<StoreSearchProductResponse>> searchProducts(
            @RequestParam(name = "category", required = false) String categoryKeyword,
            @RequestParam(name = "productName", required = false) String productName,
            @RequestParam(name = "brand", required = false) String brand,
            @RequestParam(name = "size", required = false) Integer shoeSize,
            @RequestParam(name = "color", required = false) String color,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize
    ) {
        PaginationResponse<StoreSearchProductResponse> response = storeProductService.searchProducts(
                categoryKeyword, productName, brand, shoeSize, color, page, pageSize);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<StoreProductDetailResponse> getProductDetail(
            @PathVariable(name = "productId") String productId
    ) {
        StoreProductDetailResponse response = storeProductService.getProductDetail(productId);
        return ResponseEntity.ok(response);
    }


}

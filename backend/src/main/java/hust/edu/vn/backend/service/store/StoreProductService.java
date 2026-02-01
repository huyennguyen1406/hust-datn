package hust.edu.vn.backend.service.store;

import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.dto.store.response.StoreBannerResponse;
import hust.edu.vn.backend.dto.store.response.StoreBrandResponse;
import hust.edu.vn.backend.dto.store.response.StoreCategoryResponse;
import hust.edu.vn.backend.dto.store.response.StoreColorResponse;
import hust.edu.vn.backend.dto.store.response.StoreProductDetailResponse;
import hust.edu.vn.backend.dto.store.response.StoreSearchProductResponse;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.entity.Category;
import hust.edu.vn.backend.entity.CategoryBanner;
import hust.edu.vn.backend.entity.Product;
import hust.edu.vn.backend.entity.ProductColor;
import hust.edu.vn.backend.repository.BrandRepository;
import hust.edu.vn.backend.repository.CategoryBannerRepository;
import hust.edu.vn.backend.repository.CategoryRepository;
import hust.edu.vn.backend.repository.ProductColorRepository;
import hust.edu.vn.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreProductService {
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductColorRepository productColorRepository;
    private final CategoryBannerRepository categoryBannerRepository;
    private final ProductRepository productRepository;

    public List<StoreBrandResponse> getBrands() {
        List<Brand> brands = brandRepository.findAll();
        return brands.stream().map(brand -> new StoreBrandResponse()
                .setBrandId(brand.getId().toString())
                .setName(brand.getBrandName())
                .setValue(brand.getBrandName().toLowerCase())
        ).toList();

    }

    public List<StoreCategoryResponse> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(category -> new StoreCategoryResponse()
                .setCategoryId(category.getId().toString())
                .setNameEn(category.getNameEn())
                .setNameVi(category.getNameVi())
                .setValue(category.getKeyword().toLowerCase())
        ).toList();
    }

    public List<StoreColorResponse> getColors() {
        List<ProductColor> colors = productColorRepository.findAll();
        return colors.stream().map(color -> new StoreColorResponse()
                .setName(color.getNameEn())
                .setHex(color.getHexCode())
                .setValue(color.getNameEn().toLowerCase())
        ).toList();
    }

    public List<StoreBannerResponse> getBanners(String keyword) {
        List<CategoryBanner> categoryBanners = categoryBannerRepository.findAllByKeyword(keyword);
        return categoryBanners.stream().map(banner -> {
            StoreBannerResponse storeBannerResponse = new StoreBannerResponse();
            BeanUtils.copyProperties(banner, storeBannerResponse);
            return storeBannerResponse;
        }).toList();
    }

    public PaginationResponse<StoreSearchProductResponse> searchProducts(String categoryKeyword, String productName, String brandName, Integer shoeSize, String color, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);

        Page<Product> productPage = productRepository.searchProducts(categoryKeyword, productName, brandName, shoeSize, color, pageable);

        List<StoreSearchProductResponse> data = productPage
                .getContent()
                .stream()
                .map(this::mapToStoreSearchResponse)
                .toList();

        return new PaginationResponse<StoreSearchProductResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(productPage.getTotalPages())
                .setTotalItems(productPage.getTotalElements());
    }

    private StoreSearchProductResponse mapToStoreSearchResponse(Product product) {

        String image = product.getImages() != null && !product.getImages().isEmpty()
                ? product.getImages().getFirst().getImageLink()
                : null;

        return new StoreSearchProductResponse()
                .setProductId(product.getId().toString())
                .setBrandName(product.getBrand().getBrandName())
                .setProductNameEn(product.getNameEn())
                .setProductNameVi(product.getNameVi())
                .setImage(image)
                .setNormalPrice(product.getPrice())
                // defaults as requested
                .setSale(false)
                .setSalePrice(null)
                .setRating(0.0)
                .setReviewCount(0);
    }


    public StoreProductDetailResponse getProductDetail(String productId) {
        return null;
    }
}

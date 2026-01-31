package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.admin.request.SimpleOrderRequest;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.OrderProductItem;
import hust.edu.vn.backend.entity.ProductDetail;
import hust.edu.vn.backend.entity.UserOrder;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.repository.OrderProductItemRepository;
import hust.edu.vn.backend.repository.ProductDetailRepository;
import hust.edu.vn.backend.repository.UserOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class PurchaseOrderService {
    private final UserOrderRepository userOrderRepository;
    private final OrderProductItemRepository orderProductItemRepository;
    private final ProductDetailRepository productDetailRepository;
    private final AppUserRepository appUserRepository;

    @Transactional
    public Message simpleOrder(SimpleOrderRequest request) {

        log.info("simpleOrder request={}", request);

        /* ================= 1. Load user ================= */
        AppUser user = appUserRepository
                .findById(UUID.fromString(request.getAppUserId()))
                .orElseThrow(() -> ApiStatusException.badRequest(ErrorConstant.ERROR_MESSAGE_USER_NOT_FOUND, ErrorConstant.ERROR_CODE_USER_NOT_FOUND));

        /* ================= 2. Create UserOrder ================= */
        UserOrder order = new UserOrder();
        order.setUserId(user);
        order.setStatus("PURCHASED");

        userOrderRepository.save(order);

        /* ================= 3. Process items ================= */
        for (SimpleOrderRequest.OrderDto dto : request.getOrders()) {

            ProductDetail productDetail = productDetailRepository
                    .findById(UUID.fromString(dto.getProductDetailId()))
                    .orElseThrow(() -> ApiStatusException.badRequest("Product detail not found", "PRODUCT_DETAIL_NOT_FOUND"));

            /* ===== Validate stock ===== */
            if (dto.getQuantity() > productDetail.getQuantity()) {
                throw ApiStatusException.badRequest("Insufficient stock for product detail ID: " + dto.getProductDetailId(), "ERR_INSUFFICIENT_STOCK");
            }

            /* ===== Reduce stock ===== */
            productDetail.setQuantity(
                    productDetail.getQuantity() - dto.getQuantity()
            );

            productDetailRepository.save(productDetail);

            /* ===== Create OrderProductItem ===== */
            OrderProductItem item = new OrderProductItem();
            item.setUserOrderId(order);
            item.setProductId(productDetail.getProduct());
            item.setColorId(productDetail.getColor());
            item.setSize(productDetail.getSize());
            item.setUnitPrice(productDetail.getProduct().getPrice());
            item.setQuantity(dto.getQuantity());

            orderProductItemRepository.save(item);
        }

        return new Message("Purchase order created successfully", "200");
    }

}

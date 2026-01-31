package hust.edu.vn.backend.controller.dashboard;

import hust.edu.vn.backend.dto.admin.request.SimpleOrderRequest;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.service.dashboard.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard/order")
@RequiredArgsConstructor
public class PurchaseOrderController {
    private final PurchaseOrderService purchaseOrderService;

    @PostMapping("/simple-order")
    public ResponseEntity<Message> createPurchaseOrder(
            @RequestBody SimpleOrderRequest request
            ) {
        Message serviceResponse = purchaseOrderService.simpleOrder(request);
        return ResponseEntity.ok(serviceResponse);
    }

}

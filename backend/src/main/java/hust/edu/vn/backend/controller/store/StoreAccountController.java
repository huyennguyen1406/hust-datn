package hust.edu.vn.backend.controller.store;

import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.store.request.DeliveryInfoRequest;
import hust.edu.vn.backend.dto.store.response.DeliveryInfoWithStatus;
import hust.edu.vn.backend.dto.store.response.StoreAccountInfoResponse;
import hust.edu.vn.backend.dto.store.response.StoreDistrictResponse;
import hust.edu.vn.backend.dto.store.response.StoreProvinceResponse;
import hust.edu.vn.backend.service.store.StoreAccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/store/account")
public class StoreAccountController {
    private final StoreAccountService storeAccountService;
    @GetMapping("/info")
    public ResponseEntity<StoreAccountInfoResponse> getAccountInfo(){
        StoreAccountInfoResponse response = storeAccountService.getAccountInfo();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/info", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<StoreAccountInfoResponse> postAccountInfo(
            @RequestPart(value = "firstName") String firstName,
            @RequestPart(value = "lastName") String lastName,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar
    ){
        StoreAccountInfoResponse response = storeAccountService.postAccountInfo(firstName, lastName, avatar);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/provinces")
    public ResponseEntity<List<StoreProvinceResponse>> getAllProvinces(){
        List<StoreProvinceResponse> response = storeAccountService.getAllProvinces();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/provinces/{provinceId}/districts")
    public ResponseEntity<List<StoreDistrictResponse>> getDistrictsByProvinceId(@PathVariable int provinceId){
        List<StoreDistrictResponse> response = storeAccountService.getDistrictsByProvinceId(provinceId);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/deliver-info")
    public ResponseEntity<DeliveryInfoWithStatus> getDeliveryInfo(){
        DeliveryInfoWithStatus response = storeAccountService.getDeliveryInfo();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/deliver-info")
    public ResponseEntity<Message> upsertDeliveryInfo(
            @Valid @RequestBody DeliveryInfoRequest request
            ) {
        Message response = storeAccountService.upsertDeliveryInfo(request);
        return ResponseEntity.ok(response);
    }
}

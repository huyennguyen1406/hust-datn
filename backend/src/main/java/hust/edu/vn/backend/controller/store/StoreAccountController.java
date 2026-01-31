package hust.edu.vn.backend.controller.store;

import hust.edu.vn.backend.dto.store.response.StoreAccountInfoResponse;
import hust.edu.vn.backend.service.store.StoreAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
}

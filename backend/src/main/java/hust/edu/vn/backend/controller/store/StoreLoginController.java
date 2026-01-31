package hust.edu.vn.backend.controller.store;

import hust.edu.vn.backend.dto.common.request.LoginRequest;
import hust.edu.vn.backend.dto.common.request.RefreshRequest;
import hust.edu.vn.backend.dto.common.request.RegisterRequest;
import hust.edu.vn.backend.dto.common.response.LoginResponse;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.service.store.StoreLoginService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StoreLoginController {
    private final StoreLoginService storeLoginService;

    @PostMapping("/api/v1/store/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request){
        LoginResponse response = storeLoginService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/store/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        LoginResponse response = storeLoginService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/store/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody RefreshRequest request){
        LoginResponse response = storeLoginService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/store/logout")
    public ResponseEntity<Message> logout(){
        Message response = storeLoginService.logout();
        return ResponseEntity.ok(response);
    }
}

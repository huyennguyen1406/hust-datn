package hust.edu.vn.backend.controller.dashboard;

import hust.edu.vn.backend.dto.common.request.LoginRequest;
import hust.edu.vn.backend.dto.common.request.RefreshRequest;
import hust.edu.vn.backend.dto.common.response.LoginResponse;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.common.response.UserInformation;
import hust.edu.vn.backend.service.dashboard.DashboardLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DashboardLoginController {
    private final DashboardLoginService dashboardLoginService;

    @PostMapping("/api/v1/dashboard/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        LoginResponse response = dashboardLoginService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/dashboard/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody RefreshRequest request){
        LoginResponse response = dashboardLoginService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/dashboard/logout")
    public ResponseEntity<Message> logout(){
        Message response = dashboardLoginService.logout();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/dashboard/user-info")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<UserInformation> userInfo(){
        UserInformation userInformation = dashboardLoginService.getUserInfo();
        return ResponseEntity.ok(userInformation);

    }
}

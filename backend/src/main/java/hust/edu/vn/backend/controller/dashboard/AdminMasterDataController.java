package hust.edu.vn.backend.controller.dashboard;

import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.admin.request.CreateAdminRequest;
import hust.edu.vn.backend.service.dashboard.AdminMasterDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard/master-data")
@RequiredArgsConstructor
public class AdminMasterDataController {
    private final AdminMasterDataService adminMasterDataService;

    @PostMapping("/create-admin")
    public ResponseEntity<Message> createAdmin(@RequestBody CreateAdminRequest request) {
        Message response = adminMasterDataService.createAdmin(request);
        return ResponseEntity.ok(response);
    }



}

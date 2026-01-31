package hust.edu.vn.backend.controller.dashboard;

import hust.edu.vn.backend.dto.admin.request.CreateAppUserRequest;
import hust.edu.vn.backend.dto.admin.response.DashboardUserResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.service.dashboard.ManagementUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard/user-data")
@RequiredArgsConstructor
public class UserDataController {
    private final ManagementUserService managementUserService;

    @GetMapping("/user-info")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<PaginationResponse<DashboardUserResponse>> getAllAppUser(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "fields", required = false) List<String> fields,
            @RequestParam(value = "operations", required = false) List<String> operations,
            @RequestParam(value = "values", required = false) List<String> values,
            @RequestParam(value = "combination", defaultValue = "AND") String combination
    ) {
        PaginationResponse<DashboardUserResponse> response = managementUserService.getAllAppUser(page, pageSize, fields, operations, values, combination);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-info/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<DashboardUserResponse> getAppUserById(
            @PathVariable String id) {
        DashboardUserResponse response = managementUserService.getAppUserById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/user-info")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<DashboardUserResponse> createOrUpdateAppUser(
            @RequestBody CreateAppUserRequest request
    ) {
        DashboardUserResponse response = managementUserService.createOrUpdateAppUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/user-info/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeAppUser(@PathVariable String id) {
        managementUserService.removeAppUser(id);
        return ResponseEntity.noContent().build();
    }
}

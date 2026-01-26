package hust.edu.vn.backend.controller.dashboard;

import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.admin.request.CreateAdminRequest;
import hust.edu.vn.backend.service.dashboard.AdminMasterDataService;
import hust.edu.vn.backend.service.dashboard.CsvService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard/master-data")
@RequiredArgsConstructor
public class AdminMasterDataController {
    private final AdminMasterDataService adminMasterDataService;
    private final CsvService csvService;

    @PostMapping("/create-admin")
    public ResponseEntity<Message> createAdmin(@RequestBody CreateAdminRequest request) {
        Message response = adminMasterDataService.createAdmin(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/province-template")
    public void downloadProvinceTemplate(HttpServletResponse response) throws IOException {
        List<String> headers = List.of(
                "Mã TP",
                "Tỉnh / Thành Phố",
                "Province / City"
        );

        String fileName = "province-template.csv";

        byte[] file = csvService.generateCsv(headers, Collections.emptyList());

        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName));
        response.setContentLength(file.length);

        response.getOutputStream().write(file);
        response.getOutputStream().flush();
    }

    @PostMapping("/provinces/import")
    public ResponseEntity<Message> importProvinces(@RequestParam("file") MultipartFile file) {
        Message message = adminMasterDataService.importProvinceCsv(file);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/district-template")
    public void downloadDistrictTemplate(HttpServletResponse response) throws IOException {
        List<String> headers = List.of("Mã", "Tên", "Name", "Mã TP");

        String fileName = "district-template.csv";

        byte[] file = csvService.generateCsv(headers, Collections.emptyList());

        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName));
        response.setContentLength(file.length);

        response.getOutputStream().write(file);
        response.getOutputStream().flush();
    }

    @PostMapping("/districts/import")
    public ResponseEntity<Message> importDistrict(@RequestParam("file") MultipartFile file) {
        Message message = adminMasterDataService.importDistrictCsv(file);
        return ResponseEntity.ok(message);
    }


}

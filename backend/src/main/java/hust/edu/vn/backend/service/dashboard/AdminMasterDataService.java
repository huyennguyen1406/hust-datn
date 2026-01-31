package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.dto.admin.response.BrandResponse;
import hust.edu.vn.backend.dto.admin.response.DistrictResponse;
import hust.edu.vn.backend.dto.admin.response.ProvinceResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.entity.District;
import hust.edu.vn.backend.entity.Province;
import hust.edu.vn.backend.repository.DistrictRepository;
import hust.edu.vn.backend.repository.ProvinceRepository;
import hust.edu.vn.backend.repository.specification.DistrictSpecification;
import hust.edu.vn.backend.repository.specification.ProvinceSpecification;
import hust.edu.vn.backend.security.constant.SecurityConstant;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.admin.request.CreateAdminRequest;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.Role;
import hust.edu.vn.backend.entity.UserAuthentication;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.repository.RoleRepository;
import hust.edu.vn.backend.repository.UserAuthenticationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminMasterDataService {
    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final CsvService csvService;

    private final ProvinceSpecification provinceSpecification;
    private final DistrictSpecification districtSpecification;

    private static final List<String> PROVINCE_HEADERS = List.of(
            "Mã TP",
            "Tỉnh / Thành Phố",
            "Province / City"
    );

    private static final List<String> DISTRICT_HEADERS =
            List.of("Mã", "Tên", "Name", "Mã TP");


    public Message createAdmin(CreateAdminRequest request) {
//        boolean existAdmin = appUserRepository.existsByRoleName("admin");
//        if (existAdmin) {
//            throw ApiStatusException.badRequest("Admin user already exists", "ERR_ADMIN_EXISTS");
//        }

        Role adminRole = roleRepository.findByName("admin")
                .orElseThrow(() -> ApiStatusException.internalServerError("Admin role not found", "ERR_ROLE_NOT_FOUND"));

        AppUser appUser = new AppUser()
                .setEmail(request.getEmail())
                .setFirstName(request.getFirstName())
                .setLastName(request.getLastName())
                .setPhoneNumber(request.getPhoneNumber());

        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        appUser.setRoles(roles);

        UserAuthentication userAuthentication = new UserAuthentication();
        userAuthentication.setProvider(SecurityConstant.LOCAL);
        userAuthentication.setPassword(passwordEncoder.encode(request.getPassword()));
        userAuthentication.setUser(appUser);

        Set<UserAuthentication> userAuthentications = new HashSet<>();
        userAuthentications.add(userAuthentication);

        appUser.setAuthentications(userAuthentications);
        appUserRepository.save(appUser);

        return new Message("Admin created successfully", "ADMIN_CREATED");
    }


    public Message importProvinceCsv(MultipartFile file) {
        if (file.isEmpty()) {
            throw ApiStatusException.badRequest("Uploaded file is empty", "ERR_EMPTY_FILE");
        }

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            // Step 1: Validate header row
            String headerLine = reader.readLine();
            if (headerLine == null) {
                throw ApiStatusException.badRequest(ErrorConstant.ERROR_MESSAGE_CSV_FILE_FORMAT_WRONG, ErrorConstant.ERROR_CODE_CSV_FILE_FORMAT_WRONG);
            }

            List<String> actualHeaders = csvService.parseLine(headerLine);

            if (!csvService.matchHeaders(PROVINCE_HEADERS, actualHeaders)) {
                throw ApiStatusException.badRequest(ErrorConstant.ERROR_MESSAGE_CSV_FILE_FORMAT_WRONG, ErrorConstant.ERROR_CODE_CSV_FILE_FORMAT_WRONG);
            }

            // Step 2: Parse data rows
            List<Province> csvProvinceList = new LinkedList<>();
            String line;
            while ((line = reader.readLine()) != null) {
                List<String> columns = csvService.parseLine(line);
                Province province = new Province();
                Integer provinceId = Integer.parseInt(columns.getFirst());
                province.setId(provinceId);
                province.setNameVi(columns.get(1));
                province.setNameEn(columns.get(2));
                csvProvinceList.add(province);
            }

            Set<Integer> provinceId = csvProvinceList.stream().map(Province::getId).collect(Collectors.toSet());
            List<Province> existingProvinces = provinceRepository.findAllById(provinceId);

            Map<Integer, Province> existingMap =
                    existingProvinces.stream()
                            .collect(Collectors.toMap(Province::getId, p -> p));

            List<Province> toSave = new ArrayList<>(csvProvinceList.size());

            for (Province csvProvince : csvProvinceList) {
                Province province = existingMap.get(csvProvince.getId());
                if (province == null) {
                    province = csvProvince;
                } else {
                    province.setNameVi(csvProvince.getNameVi());
                    province.setNameEn(csvProvince.getNameEn());
                }
                toSave.add(province);
            }
            provinceRepository.saveAll(toSave);
        } catch (ApiStatusException apiStatusException) {
            throw apiStatusException;
        } catch (Exception ex) {
            log.error("Error reading province CSV file", ex);
            throw ApiStatusException.internalServerError(
                    ErrorConstant.ERROR_MESSAGE_CSV_FILE_READING,
                    ErrorConstant.ERROR_CODE_CSV_FILE_READING
            );
        }

        return new Message("Provinces imported successfully", "PROVINCES_IMPORTED");
    }

    public Message importDistrictCsv(MultipartFile file) {
        if (file.isEmpty()) {
            throw ApiStatusException.badRequest("Uploaded file is empty", "ERR_EMPTY_FILE");
        }

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            // Step 1: validate header
            String headerLine = reader.readLine();
            if (headerLine == null) {
                throw ApiStatusException.badRequest(
                        ErrorConstant.ERROR_MESSAGE_CSV_FILE_FORMAT_WRONG,
                        ErrorConstant.ERROR_CODE_CSV_FILE_FORMAT_WRONG
                );
            }

            List<String> actualHeaders = csvService.parseLine(headerLine);
            if (!csvService.matchHeaders(DISTRICT_HEADERS, actualHeaders)) {
                throw ApiStatusException.badRequest(
                        ErrorConstant.ERROR_MESSAGE_CSV_FILE_FORMAT_WRONG,
                        ErrorConstant.ERROR_CODE_CSV_FILE_FORMAT_WRONG
                );
            }

            // Step 2: parse rows
            List<District> csvDistricts = new LinkedList<>();

            String line;
            while ((line = reader.readLine()) != null) {
                List<String> cols = csvService.parseLine(line);

                Integer districtId = Integer.parseInt(cols.get(0)); // Mã
                String nameVi = cols.get(1);                         // Tên
                String nameEn = cols.get(2);                         // Name
                Integer provinceId = Integer.parseInt(cols.get(3));  // Mã TP

                District district = new District();
                district.setId(districtId);
                district.setNameVi(nameVi);
                district.setNameEn(nameEn);

                Province province = provinceRepository.findById(provinceId).orElseThrow(() ->
                        ApiStatusException.badRequest(
                                String.format("Province ID %d does not exist", provinceId),
                                "ERR_PROVINCE_NOT_FOUND"
                        )
                );

                district.setProvince(province);
                csvDistricts.add(district);
            }

            // Step 3: merge insert / update
            Set<Integer> districtIds = csvDistricts.stream()
                    .map(District::getId)
                    .collect(Collectors.toSet());

            Map<Integer, District> existingMap = districtRepository
                    .findAllById(districtIds)
                    .stream()
                    .collect(Collectors.toMap(District::getId, d -> d));

            List<District> toSave = new ArrayList<>(csvDistricts.size());

            for (District csv : csvDistricts) {
                District district = existingMap.get(csv.getId());
                if (district == null) {
                    district = csv;
                } else {
                    district.setNameVi(csv.getNameVi());
                    district.setNameEn(csv.getNameEn());
                    district.setProvince(csv.getProvince());
                }

                toSave.add(district);
            }

            districtRepository.saveAll(toSave);
        } catch (ApiStatusException e) {
            throw e;
        } catch (Exception ex) {
            log.error("Error reading district CSV file", ex);
            throw ApiStatusException.internalServerError(
                    ErrorConstant.ERROR_MESSAGE_CSV_FILE_READING,
                    ErrorConstant.ERROR_CODE_CSV_FILE_READING
            );
        }

        return new Message("Districts imported successfully", "DISTRICTS_IMPORTED");
    }

    @SuppressWarnings("DuplicatedCode")
    public PaginationResponse<ProvinceResponse> getAllProvinces(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<Province> specification = filters.isEmpty() ? null : provinceSpecification.buildSpecification(filters, combination);

        Page<Province> brandPage = specification == null ?
                provinceRepository.findAll(pageable) :
                provinceRepository.findAll(specification, pageable);

        List<ProvinceResponse> data = brandPage
                .getContent()
                .stream()
                .map(ProvinceResponse::fromEntity)
                .toList();

        return new PaginationResponse<ProvinceResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());

    }

    @SuppressWarnings("DuplicatedCode")
    public PaginationResponse<DistrictResponse> getAllDistrict(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<District> specification = filters.isEmpty() ? null : districtSpecification.buildSpecification(filters, combination);

        Page<District> brandPage = specification == null ?
                districtRepository.findAll(pageable) :
                districtRepository.findAll(specification, pageable);


        List<DistrictResponse> data = brandPage
                .getContent()
                .stream()
                .map(DistrictResponse::fromEntity)
                .toList();


        // 6️⃣ Build pagination response
        return new PaginationResponse<DistrictResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());

    }

    @SuppressWarnings("DuplicatedCode")
    private List<FilterRequest> buildFilters(List<String> fields, List<String> operations, List<String> values) {
        List<FilterRequest> filters = new ArrayList<>();

        if (fields != null && operations != null && values != null) {
            if (fields.size() != operations.size() || fields.size() != values.size()) {
                throw ApiStatusException.badRequest("Filter parameters size mismatch", "ERR_FILTER_SIZE_MISMATCH");
            }

            for (int i = 0; i < fields.size(); i++) {
                filters.add(new FilterRequest()
                        .setField(fields.get(i))
                        .setOperation(operations.get(i))
                        .setValue(values.get(i))
                );
            }
        }

        return filters;
    }

}

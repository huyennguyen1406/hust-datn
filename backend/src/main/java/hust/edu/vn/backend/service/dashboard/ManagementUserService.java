package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.admin.request.CreateAppUserRequest;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.dto.admin.response.DashboardUserResponse;
import hust.edu.vn.backend.dto.common.response.PaginationResponse;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.Role;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.repository.RoleRepository;
import hust.edu.vn.backend.repository.UserAuthenticationRepository;
import hust.edu.vn.backend.repository.specification.AppUserSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@SuppressWarnings("DuplicatedCode")
@Service
@RequiredArgsConstructor
public class ManagementUserService {
    private final AppUserRepository appUserRepository;
    private final UserAuthenticationRepository userAuthenticationRepository;
    private final AppUserSpecification appUserSpecification;
    private final RoleRepository roleRepository;

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


    public PaginationResponse<DashboardUserResponse> getAllAppUser(int page, int pageSize, List<String> fields, List<String> operations, List<String> values, String combination) {
        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, pageSize);

        List<FilterRequest> filters = buildFilters(fields, operations, values);
        Specification<AppUser> specification = filters.isEmpty() ? null : appUserSpecification.buildSpecification(filters, combination);

        Page<AppUser> brandPage = specification == null ?
                appUserRepository.findAllByRole("user", pageable) :
                appUserRepository.findAll(specification, pageable);


        // 5️⃣ Map entity → response DTO
        List<DashboardUserResponse> data = brandPage
                .getContent()
                .stream()
                .map(DashboardUserResponse::fromEntity)
                .toList();


        // 6️⃣ Build pagination response
        return new PaginationResponse<DashboardUserResponse>()
                .setData(data)
                .setPage(page)
                .setPageSize(pageSize)
                .setTotalPages(brandPage.getTotalPages())
                .setTotalItems(brandPage.getTotalElements());


    }

    public DashboardUserResponse getAppUserById(String id) {
        Optional<AppUser> appUserOpt = appUserRepository.findByIdIfRoleUser(UUID.fromString(id));
        AppUser appUser = appUserOpt.orElseThrow(() -> ApiStatusException.notFound(
                "AppUser not found with id: " + id,
                "ERR_APP_USER_NOT_FOUND"
        ));
        return DashboardUserResponse.fromEntity(appUser);
    }

    public DashboardUserResponse createOrUpdateAppUser(CreateAppUserRequest request) {
        AppUser user;

        if (request.getId() != null) {
            user = appUserRepository
                    .findByIdIfRoleUser(UUID.fromString(request.getId()))
                    .orElseThrow(() -> ApiStatusException.notFound(
                            ErrorConstant.ERROR_MESSAGE_USER_NOT_FOUND,
                            ErrorConstant.ERROR_CODE_USER_NOT_FOUND
                    ));
        } else {
            user = new AppUser();
            // assign USER role on creation
            Role userRole = roleRepository.findByName("user")
                    .orElseThrow(() -> ApiStatusException.internalServerError(
                            ErrorConstant.ERROR_MESSAGE_ROLE_NOT_FOUND,
                            ErrorConstant.ERROR_CODE_ROLE_NOT_FOUND
                    ));

            user.setRoles(Set.of(userRole));
        }

        // update fields
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        AppUser saved = appUserRepository.save(user);
        return DashboardUserResponse.fromEntity(saved);
    }

    public void removeAppUser(String id) {
        AppUser user = appUserRepository
                .findByIdIfRoleUser(UUID.fromString(id))
                .orElseThrow(() -> ApiStatusException.notFound(
                        ErrorConstant.ERROR_MESSAGE_USER_NOT_FOUND,
                        ErrorConstant.ERROR_CODE_USER_NOT_FOUND
                ));

        userAuthenticationRepository.deleteByUserId(user.getId());
        appUserRepository.delete(user);
    }
}

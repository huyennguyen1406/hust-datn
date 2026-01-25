package hust.edu.vn.backend.service.dashboard;

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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AdminMasterDataService {
    private final AppUserRepository appUserRepository;
    private final UserAuthenticationRepository userAuthenticationRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public Message createAdmin(CreateAdminRequest request) {
        boolean existAdmin = appUserRepository.existsByRoleName("dashboard");
        if (existAdmin) {
            throw ApiStatusException.badRequest("Admin user already exists", "ERR_ADMIN_EXISTS");
        }

        Role adminRole = roleRepository.findByName("dashboard")
                .orElseThrow(() -> ApiStatusException.internalServerError("Admin role not found", "ERR_ROLE_NOT_FOUND"));

        AppUser appUser = new AppUser()
                .setEmail(request.getEmail())
                .setFirstName(request.getFirstName())
                .setLastName(request.getLastName());

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
}

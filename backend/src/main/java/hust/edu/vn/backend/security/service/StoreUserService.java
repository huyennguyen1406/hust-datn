package hust.edu.vn.backend.security.service;

import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.security.dto.UserPrincipal;
import hust.edu.vn.backend.security.dto.UserToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class StoreUserService {
    private final AppUserRepository appUserRepository;

    public UserToken getUserTokenByUUID(String accessToken, UUID uuid) {
        AppUser appUser = appUserRepository.findByIdAndRoleInWithRoles(uuid, List.of("user"))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserPrincipal userPrincipal = new UserPrincipal().setId(appUser.getId()).setEmail(appUser.getEmail());
        List<SimpleGrantedAuthority> authorities =
                appUser.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()))
                        .toList();

        return new UserToken(accessToken, userPrincipal, authorities);

    }
}

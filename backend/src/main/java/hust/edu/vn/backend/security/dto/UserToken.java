package hust.edu.vn.backend.security.dto;

import lombok.EqualsAndHashCode;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@EqualsAndHashCode(callSuper = false)
public class UserToken extends AbstractAuthenticationToken {
    private final String credential;
    private final transient UserPrincipal principal;

    public UserToken(String credential,
                     UserPrincipal userPrincipal,
                     Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.credential = credential;
        this.principal = userPrincipal;
        setAuthenticated(true);
    }

    public UserToken(String credential) {
        super(Collections.emptyList());
        this.credential = credential;
        this.principal = null;
        setAuthenticated(false);
    }

    @Override
    public Object getCredentials() {
        return this.credential;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}

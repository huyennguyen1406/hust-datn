package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
    @Query("""
        SELECT COUNT(u) > 0
        FROM AppUser u
        JOIN u.roles r
        WHERE r.name = :roleName
    """)
    boolean existsByRoleName(@Param("roleName") String roleName);

    @Query("""
        SELECT u
        FROM AppUser u
        JOIN FETCH u.roles r
        WHERE u.id = :userId AND r.name IN :roleNames
    """)
    Optional<AppUser> findByIdAndRoleInWithRoles(
            @Param("userId") UUID userId,
            @Param("roleNames") Collection<String> roleNames
    );

    @Query("""
        SELECT u
        FROM AppUser u
        JOIN FETCH u.roles r
        WHERE u.id = :userId
    """)
    Optional<AppUser> findByIdWithRole(@Param("userId") UUID userId);

    Optional<AppUser> findByEmailAndRoles_NameIn(
            String email,
            Collection<String> roleNames
    );
}

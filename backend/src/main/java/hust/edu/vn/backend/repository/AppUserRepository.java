package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

}

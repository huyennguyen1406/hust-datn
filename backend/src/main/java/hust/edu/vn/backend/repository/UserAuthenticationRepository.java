package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.UserAuthentication;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserAuthenticationRepository extends JpaRepository<UserAuthentication, UUID> {
    @Modifying
    @Transactional
    @Query("""
        DELETE FROM UserAuthentication ua
        WHERE ua.user.id = :userId
    """)
    int deleteByUserId(@Param("userId") UUID userId);
}

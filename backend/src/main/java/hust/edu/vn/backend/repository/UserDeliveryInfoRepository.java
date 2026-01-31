package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.dto.store.response.DeliveryInfoResponse;
import hust.edu.vn.backend.entity.UserDeliverInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserDeliveryInfoRepository extends JpaRepository<UserDeliverInfo, UUID> {
    @Query("""
    select new hust.edu.vn.backend.dto.store.response.DeliveryInfoResponse(
        u.deliverName,
        u.phoneNumber,
        u.email,
        u.address,
        p.id,
        d.id,
        u.postalCode,
        u.country
    )
    from UserDeliverInfo u
    join u.districtId d
    join d.province p
    where u.userId.id = :userId
    """)
    Optional<DeliveryInfoResponse> findDeliveryInfoByUserId(@Param("userId") UUID userId);

    @Query("""
    select u
    from UserDeliverInfo u
    where u.userId.id = :userId
    """)
    Optional<UserDeliverInfo> findByUserId(@Param("userId") UUID userId);


}

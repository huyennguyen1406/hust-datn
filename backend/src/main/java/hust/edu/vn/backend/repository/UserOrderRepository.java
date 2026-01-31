package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserOrderRepository extends JpaRepository<UserOrder, UUID> {
}

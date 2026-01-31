package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.OrderProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderProductItemRepository extends JpaRepository<OrderProductItem, UUID> {
}

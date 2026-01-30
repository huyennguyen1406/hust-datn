package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, String>, JpaSpecificationExecutor<Voucher> {
}

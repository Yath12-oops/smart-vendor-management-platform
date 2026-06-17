package com.yatharth.vmp.repos;

import com.yatharth.vmp.entity.User;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.VendorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VendorRepo extends JpaRepository<Vendor,Long> {
    long countByStatus(VendorStatus status);
    Optional<Vendor> findByUser(User user);
}

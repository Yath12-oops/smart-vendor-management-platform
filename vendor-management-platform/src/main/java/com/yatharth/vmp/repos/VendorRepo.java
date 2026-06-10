package com.yatharth.vmp.repos;

import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.VendorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepo extends JpaRepository<Vendor,Long> {
    long countByStatus(VendorStatus status);
}

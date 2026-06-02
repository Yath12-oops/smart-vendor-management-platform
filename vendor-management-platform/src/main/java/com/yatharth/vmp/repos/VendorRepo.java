package com.yatharth.vmp.repos;

import com.yatharth.vmp.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepo extends JpaRepository<Vendor,Long> {
}

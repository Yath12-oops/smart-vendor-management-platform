package com.yatharth.vmp.repos;

import com.yatharth.vmp.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepo extends JpaRepository<Document,Long> {
    List<Document> findByVendorId(Long vendorId);
}

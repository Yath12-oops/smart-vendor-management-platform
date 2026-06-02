package com.yatharth.vmp.repos;

import com.yatharth.vmp.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepo extends JpaRepository<Document,Long> {
}

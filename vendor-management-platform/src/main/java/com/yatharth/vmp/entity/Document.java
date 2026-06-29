package com.yatharth.vmp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yatharth.vmp.entity.enums.DocumentStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String documentType;

    private String fileName;

    private String filePath;

    @Enumerated(EnumType.STRING)
    private DocumentStatus status;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    @JsonIgnore
    private Vendor vendor;
}

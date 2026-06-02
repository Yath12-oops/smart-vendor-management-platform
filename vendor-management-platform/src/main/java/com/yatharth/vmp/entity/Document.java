package com.yatharth.vmp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;
}

package com.yatharth.vmp.entity;

import com.yatharth.vmp.entity.enums.VendorStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String gstNumber;

    private String panNumber;

    @Enumerated(EnumType.STRING)
    private VendorStatus status;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "vendor")
    List<Document> documents;
}

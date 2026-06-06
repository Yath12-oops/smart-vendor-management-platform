package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.DocumentRequest;
import com.yatharth.vmp.entity.Document;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.DocumentStatus;
import com.yatharth.vmp.exception.VendorNotFoundException;
import com.yatharth.vmp.repos.DocumentRepo;
import com.yatharth.vmp.repos.VendorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepo documentRepo;
    private final VendorRepo vendorRepo;

    public Document uploadDocument(DocumentRequest request){
        Vendor vendor=vendorRepo.findById(request.getVendorId())
                .orElseThrow(()-> new VendorNotFoundException("Vendor not found"));

        Document document=new Document();
        document.setDocumentType(request.getDocumentType());
        document.setFileName(request.getFileName());
        document.setFilePath(request.getFilePath());
        document.setVendor(vendor);
        document.setStatus(DocumentStatus.PENDING);

        return documentRepo.save(document);
    }

    public List<Document> getDocumentsByVendor(Long vendorId){
        return documentRepo.findByVendorId(vendorId);
    }

    public Document verifyDocument(Long id){
        Document document=documentRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("Document not found"));

        document.setStatus(DocumentStatus.VERIFIED);

        return documentRepo.save(document);
    }

    public Document rejectDocument(Long id){
        Document document=documentRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("Document not found"));

        document.setStatus(DocumentStatus.REJECTED);

        return documentRepo.save(document);
    }
}

package com.yatharth.vmp.service;

import com.yatharth.vmp.dto.DocumentResponse;
import com.yatharth.vmp.entity.Document;
import com.yatharth.vmp.entity.Vendor;
import com.yatharth.vmp.entity.enums.DocumentStatus;
import com.yatharth.vmp.exception.DocumentNotFoundException;
import com.yatharth.vmp.exception.VendorNotFoundException;
import com.yatharth.vmp.repos.DocumentRepo;
import com.yatharth.vmp.repos.VendorRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepo documentRepo;
    private final VendorRepo vendorRepo;

    public Document uploadDocument(MultipartFile file,String documentType,Long vendorId) throws Exception{
       Vendor vendor=vendorRepo.findById(vendorId).orElseThrow(()-> new VendorNotFoundException("Vendor not found"));

        String uploadDir = System.getProperty("user.dir")
                + File.separator
                + "uploads";

       File directory=new File(uploadDir);

       if(!directory.exists()) directory.mkdirs();

       String filename=file.getOriginalFilename();

        String filePath = uploadDir
                + File.separator
                + filename;

        System.out.println(filePath);

       file.transferTo(new File(filePath));

       Document document=new Document();
       document.setDocumentType(documentType);
       document.setFileName(filename);
       document.setFilePath(filePath);
       document.setStatus(DocumentStatus.PENDING);
       document.setVendor(vendor);

       return documentRepo.save(document);
    }

    public List<Document> getDocumentsByVendor(Long vendorId){
        return documentRepo.findByVendorId(vendorId);
    }

    public Document verifyDocument(Long id){
        Document document=documentRepo.findById(id)
                .orElseThrow(()-> new DocumentNotFoundException("Document not found"));

        document.setStatus(DocumentStatus.VERIFIED);

        return documentRepo.save(document);
    }

    public Document rejectDocument(Long id){
        Document document=documentRepo.findById(id)
                .orElseThrow(()-> new DocumentNotFoundException("Document not found"));

        document.setStatus(DocumentStatus.REJECTED);

        return documentRepo.save(document);
    }

    public Resource downloadDocument(Long id) throws MalformedURLException{

        Document document=documentRepo.findById(id).orElseThrow(()->
                new DocumentNotFoundException("Document Not Found"));

        Path path=Paths.get(document.getFilePath());

        return new UrlResource(path.toUri());
    }

    public List<DocumentResponse> getAllDocuments() {

        return documentRepo.findAll()
                .stream()
                .map(document -> new DocumentResponse(

                        document.getId(),

                        document.getVendor().getCompanyName(),

                        document.getDocumentType(),

                        document.getFileName(),

                        document.getStatus().name()

                ))
                .toList();
    }
}

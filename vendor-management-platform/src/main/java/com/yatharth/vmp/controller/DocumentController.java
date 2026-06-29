package com.yatharth.vmp.controller;

import com.yatharth.vmp.entity.Document;
import com.yatharth.vmp.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import java.util.List;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController{

    private final DocumentService documentService;

    @PostMapping("/upload")
    public Document uploadDocument(@RequestParam("file") MultipartFile file,
                                   @RequestParam("documentType") String documentType,
                                   @RequestParam("vendorId") Long vendorId) throws Exception{
        return documentService.uploadDocument(file,documentType,vendorId);
    }

    @GetMapping("/vendor/{vendorId}")
    public List<Document> getDocumentsByVendor(@PathVariable Long vendorId){
        return documentService.getDocumentsByVendor(vendorId);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable long id) throws Exception{

        Resource resource= documentService.downloadDocument(id);

        return ResponseEntity.ok().header(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" +resource.getFilename()+"\"")
                .body(resource);
    }
}

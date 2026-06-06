package com.yatharth.vmp.controller;

import com.yatharth.vmp.dto.DocumentRequest;
import com.yatharth.vmp.entity.Document;
import com.yatharth.vmp.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping
    public Document uploadDocument(@RequestBody DocumentRequest request){
        return documentService.uploadDocument(request);
    }

    @GetMapping("/vendor/{vendorId}")
    public List<Document> getDocumentsByVendor(@PathVariable Long vendorId){
        return documentService.getDocumentsByVendor(vendorId);
    }
}

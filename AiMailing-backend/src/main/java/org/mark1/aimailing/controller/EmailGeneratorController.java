package org.mark1.aimailing.controller;

import org.mark1.aimailing.model.EmailGenerate;
import org.mark1.aimailing.service.EmailGenerateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailGeneratorController {

    private final EmailGenerateService emailGenerateService;

    public EmailGeneratorController(EmailGenerateService emailGenerateService) {
        this.emailGenerateService = emailGenerateService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmailReply(@RequestBody EmailGenerate emailGenerate){
        String output = emailGenerateService.generateEmail(emailGenerate);
        return new ResponseEntity<>(output, HttpStatus.OK);
    }
}

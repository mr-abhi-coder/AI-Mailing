package org.mark1.aimailing.controller;

import org.mark1.aimailing.model.EmailReply;
import org.mark1.aimailing.service.EmailReplyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailReplyController {

    private final EmailReplyService emailReplyService;
    public EmailReplyController(EmailReplyService emailReplyService){
        this.emailReplyService = emailReplyService;
    }

    @PostMapping("/reply")
    public ResponseEntity<String> generateEmailReply(@RequestBody EmailReply emailReply){
        String output = emailReplyService.generateEmailReply(emailReply);
        return new ResponseEntity<>(output, HttpStatus.OK);
    }
}

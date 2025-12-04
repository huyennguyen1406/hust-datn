package hust.edu.vn.authen.controller;

import hust.edu.vn.authen.bean.common.Message;
import hust.edu.vn.authen.bean.email.EmailDetails;
import hust.edu.vn.authen.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<Message> sendMail(@RequestBody EmailDetails details)    {
        Message serviceResponse = emailService.sendSimpleMail(details);
        return ResponseEntity.ok(serviceResponse);
    }

}

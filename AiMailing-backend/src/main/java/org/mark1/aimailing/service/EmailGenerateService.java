package org.mark1.aimailing.service;

import org.mark1.aimailing.configuration.GenerateAiResponseConfig;
import org.mark1.aimailing.model.EmailGenerate;
import org.springframework.stereotype.Service;

@Service
public class EmailGenerateService {

    private final GenerateAiResponseConfig generateAiResponseConfig;

    public EmailGenerateService(GenerateAiResponseConfig generateAiResponseConfig) {
        this.generateAiResponseConfig = generateAiResponseConfig;
    }


    public String generateEmail(EmailGenerate emailGenerate){
        String prompt = emailGenerate.toPrompt();
        return generateAiResponseConfig.generateResponse(prompt);
    }

}

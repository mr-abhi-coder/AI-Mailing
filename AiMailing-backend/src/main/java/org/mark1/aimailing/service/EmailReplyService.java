package org.mark1.aimailing.service;

import org.mark1.aimailing.configuration.GenerateAiResponseConfig;
import org.mark1.aimailing.model.EmailReply;
import org.springframework.stereotype.Service;

@Service
public class EmailReplyService {

    private final GenerateAiResponseConfig generateAiResponseConfig;

    public EmailReplyService(GenerateAiResponseConfig generateAiResponseConfig) {
        this.generateAiResponseConfig = generateAiResponseConfig;
    }


    public String generateEmailReply(EmailReply emailReply) {
        String prompt = buildPrompt(emailReply);

        return generateAiResponseConfig.generateResponse(prompt);
    }
    private String buildPrompt(EmailReply emailReply) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a Professional email reply for the following email content. Please do not add subject line. ");
        if (emailReply.getTone() != null && !emailReply.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailReply.getTone()).append(" tone. ");
        }
        prompt.append("\nOriginal Email:\n").append(emailReply.getEmailContent());
        return prompt.toString();
    }
}

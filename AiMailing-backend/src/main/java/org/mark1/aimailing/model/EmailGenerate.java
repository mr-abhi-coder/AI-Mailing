package org.mark1.aimailing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailGenerate {

    private String recipientName;
    private String recipientRole;
    private String senderName;
    private String senderRole;

    private String emailPurpose;
    private String senderBackground;
    private String urgency;
    private String tone;

    public String toPrompt() {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Write a ").append(tone).append(" email to ")
                .append(recipientName).append(" (").append(recipientRole)
                .append(") regarding ").append(emailPurpose).append(".\n\n");
        prompt.append("Sender: ").append(senderName)
                .append(" (").append(senderRole).append(").\n");
        if (senderBackground != null && !senderBackground.isEmpty()) {
            prompt.append("Background: ").append(senderBackground).append("\n");
        }
        if (urgency != null && !urgency.isEmpty()) {
            prompt.append("Urgency: ").append(urgency).append("\n");
        }
        return prompt.toString();
    }
}

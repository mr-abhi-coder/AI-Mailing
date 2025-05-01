package org.mark1.aimailing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailReply {
    private String emailContent;
    private String tone;
}

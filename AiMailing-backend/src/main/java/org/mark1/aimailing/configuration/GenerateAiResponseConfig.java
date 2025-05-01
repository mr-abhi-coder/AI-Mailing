package org.mark1.aimailing.configuration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Configuration
public class GenerateAiResponseConfig {

    private final WebClient webClient;

    @Value("${GEMINI_URL}")
    private String geminiUrl;

    @Value("${GEMINI_KEY}")
    private String geminiKey;

    private String fullUrl;

    public GenerateAiResponseConfig(WebClient webClient) {
        this.webClient = webClient;
    }

    @PostConstruct
    public void init() {
        fullUrl = geminiUrl + "?key=" + geminiKey;
    }

    public String generateResponse(String prompt){

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", prompt)
                                }
                        )
                }
        );

        String response = webClient.post()
                .uri(fullUrl)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return extractResponse(response);
    }

    private String extractResponse(String response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);

            JsonNode candidates = rootNode.path("candidates");
            if (candidates.isArray() && !candidates.isEmpty()) {
                JsonNode parts = candidates.get(0)
                        .path("content")
                        .path("parts");
                if (parts.isArray() && !parts.isEmpty()) {
                    return parts.get(0).path("text").asText();
                }
            }

            return "No valid reply content found in Gemini API response.";
        } catch (Exception e) {
            return "Error processing request: " + e.getMessage();
        }
    }
}

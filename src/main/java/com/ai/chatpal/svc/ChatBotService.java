package com.ai.chatpal.svc;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class ChatBotService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public ChatBotService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com/v1beta").build();
    }

    public Map<String, Object> getAnswer(String question) {
        String model = "gemini-1.5-flash";

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", question)
                        ))
                )
        );

        String rawResponse = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/" + model + ":generateContent")
                        .queryParam("key", geminiApiKey)
                        .build())
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return extractTextResponse(rawResponse);
    }

    private Map<String, Object> extractTextResponse(String rawResponse) {
        try {
            JsonNode jsonNode = objectMapper.readTree(rawResponse);
            String text = jsonNode
                    .path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();

            return Map.of("response", text);
        } catch (Exception e) {
            return Map.of("error", "Failed to process response", "details", e.getMessage());
        }
    }
}

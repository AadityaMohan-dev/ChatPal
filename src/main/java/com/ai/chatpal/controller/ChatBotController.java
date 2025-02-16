package com.ai.chatpal.controller;

import com.ai.chatpal.svc.ChatBotService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
//@CrossOrigin(origins = "http://localhost:5173")
public class ChatBotController {

    private final ChatBotService chatBotService;

    @PostMapping("/ask")
    public ResponseEntity<Map<String, Object>> askQuestion(@RequestBody Map<String, String> payload) {
        if (!payload.containsKey("text") || payload.get("text") == null || payload.get("text").trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing or empty 'text' field"));
        }

        String question = payload.get("text");

        try {
            Map<String, Object> response = chatBotService.getAnswer(question);
            return ResponseEntity.ok(response); // Sends JSON response
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error", "details", e.getMessage()));
        }
    }
}

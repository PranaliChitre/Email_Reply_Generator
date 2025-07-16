package app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class EmailGenService {

    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private  String geminiApiUrl;

    @Value("${gemini.api.key}")
    private  String geminiApiKey;

    public EmailGenService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }
    @PostConstruct
    public void init() {
        System.out.println("Loaded Gemini URL: " + geminiApiUrl);
        System.out.println("Loaded Gemini KEY: " + geminiApiKey);
    }

    public  String generateEmail(EmailRequest emailRequest) {
        //Build the prompt
        String prompt = builtPrompt(emailRequest);

        //Craft a request
        Map<String, Object> requestBody = Map.of(
                "contents" , new Object[]{
                        Map.of("parts" , new Object[]{
                                Map.of("text" , prompt)
                        })
                }
        ) ;

        //Do request and get response
        String fullUrl = geminiApiUrl + "?key=" + geminiApiKey;

        String response = webClient.post()
                .uri(fullUrl)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();



        //Extract and Return response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "error processing request : " +e.getMessage();
        }
    }

    private String builtPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please do not generate subject content.");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a : ").append(emailRequest.getTone()).append("tone.");
        }
        prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }

    public WebClient getWebClient() {
        return webClient;
    }
}

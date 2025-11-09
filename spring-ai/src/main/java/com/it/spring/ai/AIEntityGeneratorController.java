package com.it.spring.ai;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.it.spring.ai.service.OllamaService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/ai-entity")
@Slf4j
public class AIEntityGeneratorController {

    @Autowired
    private OllamaService ollamaService;

    @PostMapping("/generate-from-excel")
    public ResponseEntity<?> generateEntityFromExcel(@RequestParam("file") MultipartFile file) {
        Map<String, Object> debugInfo = new HashMap<>();
        debugInfo.put("fileName", file.getOriginalFilename());
        debugInfo.put("fileSize", file.getSize());
        debugInfo.put("steps", new ArrayList<String>());
        try {
            log.info("🚀 STARTED: Entity generation from Excel file: {}", file.getOriginalFilename());
            log.info("📊 File size: {} bytes", file.getSize());

            // Bước 1: Đọc file Excel và chuyển thành text format cho AI phân tích
            log.info("📝 STEP 1: Converting Excel to text format...");
            String excelContent = convertExcelToText(file);

            log.info("✅ Excel converted to text, length: {} characters", excelContent.length());
            log.debug("Excel content preview: {}", excelContent.substring(0, Math.min(200, excelContent.length())));

            // Bước 2: Dùng AI để phân tích và extract thông tin bảng
            log.info("🤖 STEP 2: Sending Excel content to AI for analysis...");
            String tableInfo = analyzeExcelWithAI(excelContent, file.getOriginalFilename());
            log.info("✅ AI analysis completed, extracted table info length: {} characters", tableInfo.length());
            log.info("📋 Table info preview: {}", tableInfo.substring(0, Math.min(300, tableInfo.length())));

            // Bước 3: Dùng AI để generate entity code từ thông tin đã extract
            log.info("💻 STEP 3: Generating entity code with AI...");
            String entityCode = generateEntityWithAI(tableInfo);
            log.info("✅ Entity code generated, length: {} characters", entityCode.length());
            log.info("🔧 Entity code preview: {}", entityCode.substring(0, Math.min(200, entityCode.length())));

            // Bước 4: Trả về response
            log.info("📤 STEP 4: Preparing response...");
            Map<String, Object> response = Map.of("status", "success", "fileName", file.getOriginalFilename(),
                    "fileSize", file.getSize(), "tableInfo", tableInfo, "entityCode", entityCode, "debugInfo",
                    debugInfo, "generatedAt", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

            log.info("🎉 COMPLETED: Entity generation successful for file: {}", file.getOriginalFilename());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Failed to generate entity from Excel file: {}", file.getOriginalFilename(), e);
            return ResponseEntity.badRequest()
                    .body(Map.of("status", "error", "message", "Failed to generate entity: " + e.getMessage()));
        }
    }

    private String convertExcelToText(MultipartFile file) throws Exception {
        // Chuyển file Excel thành text format để AI có thể đọc
        // Có thể dùng Apache POI hoặc đơn giản là đọc raw text từ file
        log.debug("🔍 Starting Excel to text conversion...");
        StringBuilder content = new StringBuilder();
        int rowCount = 0;
        int sheetCount = 0;

        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            sheetCount = workbook.getNumberOfSheets();
            for (Sheet sheet : workbook) {
                content.append("Sheet: ").append(sheet.getSheetName()).append("\n");

                for (Row row : sheet) {
                    StringBuilder rowContent = new StringBuilder();
                    for (Cell cell : row) {
                        switch (cell.getCellType()) {
                        case STRING:
                            rowContent.append(cell.getStringCellValue()).append(" | ");
                            break;
                        case NUMERIC:
                            rowContent.append(cell.getNumericCellValue()).append(" | ");
                            break;
                        case BOOLEAN:
                            rowContent.append(cell.getBooleanCellValue()).append(" | ");
                            break;
                        default:
                            rowContent.append("[empty] | ");
                        }
                    }
                    if (rowContent.length() > 0) {
                        content.append("Row ").append(row.getRowNum()).append(": ").append(rowContent.toString().trim())
                                .append("\n");
                        rowCount++;
                    }
                }
                content.append("\n");
            }
        }
        log.info("📊 Excel conversion completed: {} sheets, {} rows processed", sheetCount, rowCount);
        return content.toString();
    }

    private String analyzeExcelWithAI(String excelContent, String fileName) {
        log.debug("🧠 Creating AI analysis prompt...");
        String analysisPrompt = """
                You are a database analyst. Analyze the following Excel file content and extract table structure information.

                FILE: %s

                EXCEL CONTENT:
                %s

                Please extract and return ONLY the following information in structured format:

                TABLE_STRUCTURE:
                - Table Name: [physical table name]
                - Logical Name: [Japanese logical name if available]
                - Description: [brief description]

                FIELDS:
                For each field, provide:
                - Logical Name: [Japanese name]
                - Physical Name: [English/database name]
                - Type: [database type]
                - Length: [if applicable]
                - PK: [yes/no]
                - FK: [yes/no]
                - Nullable: [yes/no]
                - Default: [default value if any]
                - Remarks: [any comments]

                Return the information in a clean, structured text format that can be used for code generation.
                """
                .formatted(fileName, excelContent);
        String result = ollamaService.analyzeContent(analysisPrompt);
        log.debug("✅ AI analysis completed, result length: {} chars", result.length());

        return result;
    }

    private String generateEntityWithAI(String tableInfo) {
        log.debug("⚙️ Creating entity generation prompt...");
        String entityPrompt = """
                You are a Java Spring Boot expert. Generate a complete JPA Entity class based on the following analyzed table information.

                REQUIREMENTS:
                1. Use Jakarta Persistence annotations (@Entity, @Table, @Id, @GeneratedValue, @Column)
                2. Use Lombok @Data annotation
                3. Map database types to appropriate Java types:
                   - serial/integer -> Integer/Long
                   - varchar -> String
                   - boolean -> Boolean
                   - timestamp -> LocalDateTime
                4. Follow Java naming conventions (camelCase for fields)
                5. Include proper imports
                6. Add field comments in English
                7. Handle PK, FK relationships appropriately
                8. Include length for varchar fields
                9. Consider nullable fields

                TABLE INFORMATION:
                %s

                Generate ONLY the Java entity code without any explanations or markdown formatting.
                Make sure the code is compilable and follows Spring Boot best practices.
                """
                .formatted(tableInfo);

        String result = ollamaService.generateEntityCode(entityPrompt);
        log.debug("✅ Entity code generated, length: {} chars", result.length());

        return result;
    }

}

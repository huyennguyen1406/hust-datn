package hust.advertisement.hustdatn.controller;

import hust.advertisement.hustdatn.model.dto.BillboardDto;
import hust.advertisement.hustdatn.service.BillboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/billboards")
public class BillboardController {
	private final BillboardService billboardService;
	
	@Autowired
	public BillboardController(BillboardService billboardService) {
		this.billboardService = billboardService;
	}
	
	@PostMapping
	public ResponseEntity<BillboardDto> createBillboard(@Validated @RequestBody BillboardDto createDto) {
		return ResponseEntity.ok(billboardService.createBillboard(createDto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BillboardDto> getBillboardById(@PathVariable UUID id) {
		return ResponseEntity.ok(billboardService.getBillboardById(id));
	}
	
	@GetMapping("/tenant/{tenantId}")
	public ResponseEntity<List<BillboardDto>> getBillboardsByTenantId(@PathVariable UUID tenantId) {
		return ResponseEntity.ok(billboardService.getBillboardsByTenantId(tenantId));
	}
	
	@GetMapping("/status/{status}")
	public ResponseEntity<List<BillboardDto>> getBillboardsByStatus(@PathVariable Integer status) {
		return ResponseEntity.ok(billboardService.getBillboardsByStatus(status));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<BillboardDto> updateBillboard(@PathVariable UUID id, @Validated @RequestBody BillboardDto updateDto) {
		return ResponseEntity.ok(billboardService.updateBillboard(id, updateDto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBillboard(@PathVariable UUID id) {
		billboardService.deleteBillboard(id);
		return ResponseEntity.noContent().build();
	}
}

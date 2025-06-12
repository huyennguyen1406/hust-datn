package hust.advertisement.hustdatn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/billboard-resources")
public class BillboardResourceController {
	private final BillboardResourceService billboardResourceService;
	
	@Autowired
	public BillboardResourceController(BillboardResourceService billboardResourceService) {
		this.billboardResourceService = billboardResourceService;
	}
	
	@PostMapping
	public ResponseEntity<BillboardResourceResponseDto> createBillboardResource(@Valid @RequestBody BillboardResourceCreateDto createDto) {
		return ResponseEntity.ok(billboardResourceService.createBillboardResource(createDto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BillboardResourceResponseDto> getBillboardResourceById(@PathVariable UUID id) {
		return ResponseEntity.ok(billboardResourceService.getBillboardResourceById(id));
	}
	
	@GetMapping("/billboard/{billboardId}")
	public ResponseEntity<List<BillboardResourceResponseDto>> getBillboardResourcesByBillboardId(@PathVariable UUID billboardId) {
		return ResponseEntity.ok(billboardResourceService.getBillboardResourcesByBillboardId(billboardId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<BillboardResourceResponseDto> updateBillboardResource(@PathVariable UUID id, @Valid @RequestBody BillboardResourceUpdateDto updateDto) {
		return ResponseEntity.ok(billboardResourceService.updateBillboardResource(id, updateDto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBillboardResource(@PathVariable UUID id) {
		billboardResourceService.deleteBillboardResource(id);
		return ResponseEntity.noContent().build();
	}
}

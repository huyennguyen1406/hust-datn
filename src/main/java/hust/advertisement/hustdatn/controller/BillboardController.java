package hust.advertisement.hustdatn.controller;

import hust.advertisement.hustdatn.model.dto.BillboardDto;
import hust.advertisement.hustdatn.model.entities.Billboard;
import hust.advertisement.hustdatn.service.BillboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/billboards")
public class BillboardController {
	private final BillboardService billboardService;
	
	public BillboardController(BillboardService billboardService) {
		this.billboardService = billboardService;
	}
	
	@GetMapping
	public List<Billboard> getAllBillboards() {
		return billboardService.getAllBillboards();
	}
	
	@GetMapping("/{id}")
	public Billboard getBillboardById(@PathVariable UUID id) {
		return billboardService.getBillboardById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Billboard createBillboard(@RequestBody Billboard billboard) {
		return billboardService.createBillboard(billboard);
	}
	
	@PutMapping("/{id}")
	public Billboard updateBillboard(
			@PathVariable UUID id,
			@RequestBody Billboard billboardUpdates
	) {
		return billboardService.updateBillboard(id, billboardUpdates);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteBillboard(@PathVariable UUID id) {
		billboardService.deleteBillboard(id);
	}
}

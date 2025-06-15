package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.entities.Billboard;
import hust.advertisement.hustdatn.repository.BillboardRepository;
import hust.advertisement.hustdatn.repository.BillboardResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillboardService {
	private final BillboardRepository billboardRepository;
	private final BillboardResourceRepository resourceRepository;
	
	public List<Billboard> getAllBillboards() {
		return billboardRepository.findAll();
	}
	
	public Billboard getBillboardById(UUID id) {
		return billboardRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Billboard not found"));
	}
	
	public Billboard createBillboard(Billboard billboard) {
		// Handle resources if provided
		if (billboard.getResources() != null) {
			billboard.getResources().forEach(res -> res.setBillboard(billboard));
		}
		return billboardRepository.save(billboard);
	}
	
	public Billboard updateBillboard(UUID id, Billboard billboardUpdates) {
		Billboard existing = billboardRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Billboard not found"));
		
		// Update fields
		if (billboardUpdates.getName() != null) {
			existing.setName(billboardUpdates.getName());
		}
		if (billboardUpdates.getDescription() != null) {
			existing.setDescription(billboardUpdates.getDescription());
		}
		// Update other fields as needed
		
		// Handle resources
		if (billboardUpdates.getResources() != null) {
			existing.getResources().clear();
			billboardUpdates.getResources().forEach(res -> {
				res.setBillboard(existing);
				existing.getResources().add(res);
			});
		}
		
		return billboardRepository.save(existing);
	}
	
	public void deleteBillboard(UUID id) {
		if (!billboardRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Billboard not found");
		}
		billboardRepository.deleteById(id);
	}
}

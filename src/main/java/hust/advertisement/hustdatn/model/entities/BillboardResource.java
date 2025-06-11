package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "\"BillboardResources\"", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillboardResource {
	@Id
	@Column(name = "\"Id\"")
	private UUID id;
	
	@Column(name = "\"TenantId\"")
	private UUID tenantId;
	
	@Column(name = "\"ObjectId\"", length = 256, nullable = false)
	private String objectId;
	
	@Column(name = "\"MimeType\"", length = 256, nullable = false)
	private String mimeType;
	
	@Column(name = "\"Order\"", nullable = false)
	private Integer order;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "\"BillboardId\"", nullable = false)
	private Billboard billboard;
}

package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
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
@Table(name = "CampaignResources", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignResource {
	@Id
	@GeneratedValue
	private UUID id;
	
	@Column(name = "object_id", nullable = false, length = 256)
	private String objectId;
	
	@Column(name = "mime_type", nullable = false, length = 256)
	private String mimeType;
	
	@Column(name = "display_second", nullable = false)
	private Integer displaySecond;
	
	@Column(name = "\"order\"", nullable = false)
	private Integer order;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "campaign_id", nullable = false)
	private Campaign campaign;
}

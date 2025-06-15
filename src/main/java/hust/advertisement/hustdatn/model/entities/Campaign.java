package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Campaigns", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campaign {
	@Id
	@GeneratedValue
	private UUID id;
	
	@Column(nullable = false, length = 128)
	private String name;
	
	@Column(length = 512)
	private String description;
	
	@Column(nullable = false)
	private Integer status;
	
	@OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CampaignResource> resources = new ArrayList<>();
	
	@OneToMany(mappedBy = "campaign")
	private List<Schedule> schedules = new ArrayList<>();
	
	@Column(name = "creation_time", nullable = false, updatable = false)
	private LocalDateTime creationTime = LocalDateTime.now();
}

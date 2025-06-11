package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	@Column(name = "Id")
	private UUID id;
	
	@Column(name = "TenantId")
	private UUID tenantId;
	
	@Column(name = "Name", length = 128, nullable = false)
	private String name;
	
	@Column(name = "Description", length = 512)
	private String description;
	
	@Column(name = "Status", nullable = false)
	private Integer status;
	
	@Column(name = "ExtraProperties", columnDefinition = "text")
	private String extraProperties;
	
	@Column(name = "ConcurrencyStamp", length = 40)
	private String concurrencyStamp;
	
	@CreationTimestamp
	@Column(name = "CreationTime", nullable = false)
	private LocalDateTime creationTime;
	
	@Column(name = "CreatorId")
	private UUID creatorId;
	
	@UpdateTimestamp
	@Column(name = "LastModificationTime")
	private LocalDateTime lastModificationTime;
	
	@Column(name = "LastModifierId")
	private UUID lastModifierId;
	
	@Column(name = "IsDeleted", columnDefinition = "boolean default false")
	private Boolean isDeleted = false;
	
	@Column(name = "DeleterId")
	private UUID deleterId;
	
	@Column(name = "DeletionTime")
	private LocalDateTime deletionTime;
	
	@OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CampaignResource> resources;
	
	@OneToMany(mappedBy = "campaign")
	private List<Schedule> schedules;
}
